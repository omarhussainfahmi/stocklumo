(() => {
  "use strict";
  const keys = ["stocklumo.watch", "stocklumo.recent", "stocklumo.portfolio", "stocklumo.screener", "stocklumo.theme"];
  const status = document.getElementById("backup-status"), preview = document.getElementById("backup-preview"), restore = document.getElementById("backup-restore");
  const symbol = value => typeof value === "string" && /^[A-Z][A-Z0-9.-]{0,14}$/.test(value);
  function validate(input) {
    if (!input || input.app !== "Stocklumo" || input.version !== 1 || !input.data || typeof input.data !== "object" || Array.isArray(input.data) ||
        Object.keys(input).some(key => !["app", "version", "createdAt", "data"].includes(key)) ||
        Object.keys(input.data).some(key => !keys.includes(key)) || !Object.keys(input.data).length) throw Error("Choose a valid Stocklumo version 1 backup.");
    const data = {};
    for (const key of Object.keys(input.data)) {
      const value = input.data[key];
      if (value === null) { data[key] = null; continue; }
      if (key === "stocklumo.theme") { if (!["light", "dark"].includes(value)) throw Error("The backup theme is invalid."); }
      else if (key === "stocklumo.watch" || key === "stocklumo.recent") {
        if (!Array.isArray(value) || value.length > (key.endsWith("watch") ? 20 : 8) || value.some(s => !symbol(s)) || new Set(value).size !== value.length) throw Error("The backup stock lists are invalid.");
      } else if (key === "stocklumo.portfolio") {
        if (!Array.isArray(value) || value.length > 20 || value.some(h => !window.StocklumoMath.validHolding(h) || Object.keys(h).some(k => !["symbol", "currency", "quantity", "purchasePrice", "date"].includes(k))) ||
            new Set(value.map(h => h.symbol)).size > 10) throw Error("The backup holdings are invalid or exceed portfolio limits.");
      } else {
        const fields = ["query", "industry", "price", "changePercent", "marketCapMillions", "averageVolumeMillions", "sort", "desc"];
        if (typeof value !== "object" || Array.isArray(value) || Object.keys(value).some(k => !fields.includes(k)) ||
            Object.entries(value).some(([k,v]) => k === "desc" ? typeof v !== "boolean" : typeof v !== "string" || v.length > 100) ||
            (value.sort !== undefined && !["symbol", "price", "changePercent", "marketCapMillions", "averageVolumeMillions"].includes(value.sort))) throw Error("The backup screener preset is invalid.");
      }
      data[key] = value;
    }
    return data;
  }
  if (!status || !restore) return;
  let pending, selection = 0;
  function message(text, error = false) { status.textContent = text; status.classList.toggle("validation-error", error); status.focus(); }
  document.getElementById("backup-export").onclick = () => {
    try {
      const data = Object.fromEntries(keys.map(key => {
        const raw = localStorage.getItem(key);
        return [key, raw === null ? null : key.endsWith("theme") ? raw : JSON.parse(raw)];
      }));
      const file = { app: "Stocklumo", version: 1, createdAt: new Date().toISOString(), data };
      validate(file);
      const url = URL.createObjectURL(new Blob([JSON.stringify(file, null, 2)], { type: "application/json" }));
      const link = document.createElement("a"); link.href = url; link.download = `stocklumo-backup-${file.createdAt.slice(0, 10)}.json`;
      document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      message("Backup download started. Keep the file private.");
    } catch { message("Backup could not be created. Check that browser storage is available and saved records are valid.", true); }
  };
  document.getElementById("backup-file").onchange = async event => {
    const version = ++selection;
    pending = undefined; restore.hidden = true; preview.textContent = "";
    const file = event.target.files?.[0]; if (!file) return;
    try {
      if (file.size > 128 * 1024) throw Error("Backup files must be 128 KB or smaller.");
      const text = await file.text();
      if (version !== selection) return;
      pending = validate(JSON.parse(text));
      preview.textContent = `${pending["stocklumo.watch"]?.length ?? 0} saved stocks, ${pending["stocklumo.recent"]?.length ?? 0} recent stocks, ${pending["stocklumo.portfolio"]?.length ?? 0} practice lots. ${Object.keys(pending).length} saved categories will be replaced. Download your current backup first.`;
      restore.hidden = false; message("Backup checked. Review the preview before restoring.");
    } catch (error) { if (version === selection) message(error instanceof SyntaxError ? "This file is not valid JSON." : error.message, true); }
  };
  restore.onclick = () => {
    if (!pending) return;
    let previous;
    try {
      previous = Object.fromEntries(Object.keys(pending).map(key => [key, localStorage.getItem(key)]));
      for (const [key, value] of Object.entries(pending)) {
        if (value === null) localStorage.removeItem(key);
        else localStorage.setItem(key, key.endsWith("theme") ? value : JSON.stringify(value));
      }
      pending = undefined; restore.hidden = true; preview.textContent = "";
      message("Backup restored. Open the dashboard to use your saved data.");
    } catch {
      let restored = true;
      if (previous) for (const [key, value] of Object.entries(previous)) {
        try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch { restored = false; }
      }
      message(restored ? "Restore failed. Your previous data was retained. Check browser storage." : "Browser storage failed during restore and recovery. Keep both backup files; some data may have changed.", true);
    }
  };
})();
