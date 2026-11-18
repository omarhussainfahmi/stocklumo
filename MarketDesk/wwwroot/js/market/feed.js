(() => {
  "use strict";
  // Own the connection, callback lifetime and heartbeat recovery independently
  // of quote rendering, stock selection, charts and persistent watchlists.
  function create(callbacks) {
    let source, active = true, symbols = [], lastEvent = Date.now(), lastRecovery = 0;
    function connect() {
      if (!active) return;
      source?.close();
      source = undefined;
      symbols = callbacks.symbols();
      if (!symbols.length) { callbacks.idle(); return; }
      callbacks.status("connecting", "Connecting. Waiting for fresh trades.");
      lastEvent = Date.now();
      const current = source = new EventSource("/api/market/stream?symbols=" + encodeURIComponent(symbols.join(",")));
      const selected = symbols.slice();
      current.onmessage = event => {
        if (!active || source !== current) return;
        let message;
        try { message = JSON.parse(event.data); } catch { return; }
        if (!message || typeof message.status !== "string" || !Array.isArray(message.stocks)) return;
        lastEvent = Date.now();
        callbacks.status(message.status, message.message || "Provider status unavailable.");
        callbacks.message(message, selected);
      };
      current.onerror = () => {
        if (active && source === current) callbacks.status("disconnected", "Reconnecting. Prices may be stale.");
        // EventSource retries this endpoint; server admission validates missing
        // companies after restarts without a preparatory profile request.
      };
    }
    return Object.freeze({
      connect,
      symbols: () => symbols.slice(),
      hasSource: () => Boolean(source),
      tick() {
        if (!active || !source || Date.now() - lastEvent <= 15000) return;
        callbacks.status("disconnected", "No connection heartbeat. Prices may be stale.");
        if (Date.now() - lastRecovery >= 60000) { lastRecovery = Date.now(); connect(); }
      },
      resume() { if (active && Date.now() - lastEvent > 15000) connect(); },
      close() { active = false; source?.close(); source = undefined; },
    });
  }
  window.StocklumoMarketFeed = Object.freeze({create});
})();
