(() => {
  "use strict";
  if (location.pathname !== "/portfolio") return;
  const {$, math, controls, results, status, clearValidation, validationError, emptyState, introduction, field, button, get, read, save, symbols, node, fmt, table, change, stockLink, quoteTime, bars, allocationChart, plot} = window.StocklumoResearchPage.create({inlineFieldErrors:false});
  async function portfolio() {
    $("research-title").textContent = "Virtual portfolio";
    introduction("Practice holdings. No real trades. Saved only in this browser.",
      "Up to 20 lots across 10 stocks. Enter purchase prices in the stock's currency. Totals stay separate by currency; fees, dividends, taxes, splits and FX conversion are excluded. Clearing browser data removes holdings. Values use quote times, not purchase-date market prices.");
    const ticker = field("Ticker"),
      quantity = field("Quantity", "number"),
      purchase = field("Purchase price (per share)", "number"),
      date = field(
        "Purchase date",
        "date",
        new Date().toISOString().slice(0, 10),
      );
    ticker.maxLength = 15;
    quantity.step = "any";
    purchase.step = "any";
    date.max = new Date().toISOString().slice(0, 10);
    let stored = read("stocklumo.portfolio", []),
      holdings = Array.isArray(stored)
        ? stored.filter((h) => math.validHolding(h)).slice(0, 20)
        : [],
      editing = -1,
      busy = false,
      quotes = {};
    const editorSnapshot = () => JSON.stringify([ticker.value, quantity.value, purchase.value, date.value]);
    let cleanEditor = editorSnapshot();
    window.StocklumoUI?.guardUnsaved?.(() => editorSnapshot() !== cleanEditor);
    const submit = button("Save holding", add);
    submit.classList.add("primary");
    function resetEditor() {
      editing = -1;
      ticker.value = "";
      quantity.value = "";
      purchase.value = "";
      date.value = new Date().toISOString().slice(0, 10);
      submit.textContent = "Save holding";
      cleanEditor = editorSnapshot();
      clearValidation();
    }
    button("Cancel edit", () => { if (!busy) resetEditor(); });
    const refresh = button("Refresh valuations", load);
    const historical = button("Historical P/L", history);
    function setPortfolioBusy(pending) {
      busy = pending;
      controls.querySelectorAll("input, select, button").forEach(control => { control.disabled = pending; });
      results.querySelectorAll("[data-holding-action]").forEach(control => { control.disabled = pending; });
      [submit, refresh, historical].forEach(control => control.setAttribute("aria-busy", String(pending)));
      results.setAttribute("aria-busy", String(pending));
    }
    async function add() {
      if (busy) return;
      let symbol;
      try {
        [symbol] = symbols(ticker.value, 1, 1);
      } catch (e) {
        validationError(e.message, [ticker]);
        return;
      }
      const h = {
        symbol,
        quantity: Number(quantity.value),
        purchasePrice: Number(purchase.value),
        date: date.value,
        currency: "USD",
      };
      if (!math.validHolding(h)) {
        const invalidFields = [];
        if (!(h.quantity > 0 && h.quantity <= 1000000)) invalidFields.push(quantity);
        if (!(h.purchasePrice > 0 && h.purchasePrice <= 1000000000)) invalidFields.push(purchase);
        if (!h.date || h.date > date.max) invalidFields.push(date);
        validationError("Quantity and price must be above zero (max. 1m shares and 1bn per share). Use today or an earlier date.", invalidFields);
        return;
      }
      const next = holdings.filter((_, i) => i !== editing);
      if (
        next.length >= 20 ||
        new Set([...next.map((h) => h.symbol), symbol]).size > 10
      ) {
        status.textContent = "Limit reached: 20 lots and 10 stocks.";
        return;
      }
      clearValidation();
      setPortfolioBusy(true);
      try {
        status.textContent = "Verifying company and currency...";
        const response = await get(`/api/data/stock/${symbol}/profile`);
        if (
          response.data?.ticker !== symbol ||
          !/^[A-Z]{3}$/.test(response.data.currency || "")
        ) {
          status.textContent =
            response.message ||
            "Currency unverified. Holding not saved.";
          return;
        }
        h.currency = response.data.currency;
        next.push(h);
        holdings = next;
        save("stocklumo.portfolio", holdings);
        resetEditor();
      } finally {
        setPortfolioBusy(false);
      }
      await load();
    }
    function render() {
      results.replaceChildren();
      const valuation = math.valueHoldings(holdings, quotes);
      if (!holdings.length) {
        emptyState("No practice holdings yet", "Add a stock, quantity and purchase price to start tracking.", "Add your first holding", () => ticker.focus());
        return;
      }
      table(
        [
          "Stock",
          "Quantity",
          "Purchase price",
          "Purchase date",
          "Cost basis",
          "Latest value",
          "Unrealized P/L",
          "Quote time",
          "Manage",
        ],
        valuation.lots.map((h, i) => {
          const actions = node("div"),
            edit = node("button", "Edit"),
            remove = node("button", "Remove");
          edit.type = remove.type = "button";
          edit.dataset.holdingAction = remove.dataset.holdingAction = "true";
          edit.disabled = remove.disabled = busy;
          edit.onclick = () => {
            if (busy) return;
            editing = i;
            ticker.value = h.symbol;
            quantity.value = h.quantity;
            purchase.value = h.purchasePrice;
            date.value = h.date;
            cleanEditor = editorSnapshot();
            clearValidation();
            submit.textContent = "Update holding";
            ticker.focus();
          };
          remove.onclick = () => {
            if (busy) return;
            holdings.splice(i, 1);
            if (editing === i) resetEditor();
            else if (editing > i) editing--;
            save("stocklumo.portfolio", holdings);
            render();
          };
          actions.append(edit, remove);
          return [
            stockLink(h.symbol),
            fmt(h.quantity),
            `${fmt(h.purchasePrice)} ${h.currency}`,
            h.date,
            `${fmt(h.cost)} ${h.currency}`,
            fmt(h.value),
            change(h.profit),
            h.timestamp
              ? new Date(h.timestamp * 1000).toLocaleString()
              : "Unavailable or older than purchase",
            actions,
          ];
        }),
        results,
        "Practice holdings: purchase costs, latest values and unrealized profit or loss",
      );
      valuation.groups.forEach((g) => {
        const metrics = node("dl");
        metrics.className = "portfolio-metrics";
        [["Cost basis", g.cost], ["Value", g.value], ["Unrealized P/L", g.profit], ["Unrealized return", math.finite(g.profit) && g.cost > 0 ? g.profit / g.cost * 100 : null]].forEach(([label, value]) => {
          const group = node("div"), amount = node("dd");
          amount.append(label.startsWith("Unrealized") ? change(value) : node("span", fmt(value)));
          if (label === "Unrealized return" && math.finite(value)) amount.append(document.createTextNode("%"));
          group.append(node("dt", label), amount);
          metrics.append(group);
        });
        results.append(node("h2", `${g.currency} portfolio`), metrics);
        if (g.value === null) {
          results.append(
            node(
              "p",
              "Total and allocation unavailable: each holding needs a quote on or after purchase.",
            ),
          );
          return;
        }
        const group = valuation.lots.filter((h) => h.currency === g.currency);
        const positions = [...new Set(group.map(h => h.symbol))].map(symbol => {
          const lots = group.filter(h => h.symbol === symbol);
          return { symbol, value: lots.reduce((sum, h) => sum + h.value, 0), profit: lots.reduce((sum, h) => sum + h.profit, 0), timestamp: lots[0].timestamp };
        });
        const visuals = node("div");
        visuals.className = "portfolio-visuals";
        results.append(visuals);
        allocationChart(positions, g.currency, visuals);
        bars(positions.map(h => ({ symbol: h.symbol, value: h.profit, detail: `${h.symbol} · Unrealized P/L ${fmt(h.profit)} ${g.currency} · Quote ${quoteTime(h.timestamp)}` })),
          `Unrealized P/L · ${g.currency}`, g.currency, "Practice costs vs latest quotes. Unrealized profit, not historical returns.", visuals);
      });
    }
    async function load() {
      if (busy) return;
      setPortfolioBusy(true);
      try {
        status.textContent = "Refreshing valuations...";
        quotes = {};
        for (const symbol of new Set(holdings.map((h) => h.symbol)))
          quotes[symbol] = await get("/api/research/stock/" + symbol);
        render();
        status.textContent =
          "Latest quote valuations. Refreshes every 60s while visible.";
      } finally {
        setPortfolioBusy(false);
      }
    }
    async function history() {
      if (busy) return;
      setPortfolioBusy(true);
      try {
        const series = {};
        status.textContent = "Loading historical closes...";
        for (const symbol of new Set(holdings.map((h) => h.symbol))) {
          const r = await get(`/api/data/stock/${symbol}/chart?range=1Y`);
          series[symbol] = math.candles(r.data);
        }
        render();
        const data = math.unrealizedProfitLossHistory(holdings, series);
        if (data.length && data.every((s) => s.points.length >= 2)) {
          data.forEach((s) => plot([s], s.name));
          results.append(
            node(
              "p",
              "Closing-price P/L after all purchases, within one year. Assumes continuous holdings; not time-weighted or live.",
            ),
          );
        } else
          results.append(
            node(
              "p",
              "Historical P/L unavailable: missing shared closes after purchase or restricted candle access.",
            ),
          );
        status.textContent = "Historical check complete.";
      } finally {
        setPortfolioBusy(false);
      }
    }
    render();
    await load();
    const timer = setInterval(() => {
      if (!document.hidden && editing < 0) load();
    }, 60000);
    window.addEventListener("pagehide", () => clearInterval(timer), {
      once: true,
    });
  }
  portfolio();
})();
