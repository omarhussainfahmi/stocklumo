/* Pure calculations shared by the research pages and their tests. */
((root) => {
  "use strict";
  /** @typedef {{time: number, value: number, volume?: number|null}} PricePoint */
  /** @typedef {{symbol: string, currency: string, date: string, quantity: number, purchasePrice: number}} Holding */
  /** @typedef {{name: string, points: PricePoint[]}} PriceSeries */
  /** @typedef {{query?:string,industry?:string,price?:string,changePercent?:string,marketCapMillions?:string,averageVolumeMillions?:string,sort?:string,desc?:boolean}} ScreenerPreset */
  /** @typedef {{symbol: string, name?: string, industry?: string|null, price?: number|null, changePercent?: number|null, marketCapMillions?: number|null, averageVolumeMillions?: number|null}} ResearchRow */
  /** @typedef {{currency?:string|null, price?:number|null, timestamp?:number|null, state?:string, message?:string}} QuoteInput Provider quote or unavailable/error response. */
  /**
   * @param {unknown} value
   * @returns {value is number} True only for finite numbers, without coercion. */
  const finite = (value) => typeof value === "number" && Number.isFinite(value);
  /** @param {unknown} value @returns {value is Record<string, unknown>} */
  const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
  // One persisted-preset contract for the editor and browser backup boundary.
  const screenerPreset = Object.freeze({
    maxTextLength: 100,
    fields: Object.freeze(["query", "industry", "price", "changePercent", "marketCapMillions", "averageVolumeMillions", "sort", "desc"]),
    sortFields: Object.freeze(["symbol", "price", "changePercent", "marketCapMillions", "averageVolumeMillions"]),
  });
  /** @param {unknown} value @returns {value is ScreenerPreset} Whether a preset is safe to persist or restore. */
  function validScreenerPreset(value) {
    if (!isRecord(value)) return false;
    for (const [key, field] of Object.entries(value)) {
      if (!screenerPreset.fields.includes(key)) return false;
      if (key === "desc") { if (typeof field !== "boolean") return false; }
      else if (typeof field !== "string" || field.length > screenerPreset.maxTextLength) return false;
    }
    return value.sort === undefined || (typeof value.sort === "string" && screenerPreset.sortFields.includes(value.sort));
  }
  /**
   *
   * @param {number} low Positive lower bound.
   * @param {number} high Positive upper bound.
   *
   * @param {number} value Positive observed quote.
   *
   * @returns {{fraction:number, outside:boolean, flat:boolean}|null} Clamped position, or null for invalid bounds/prices.
   */
  function pricePosition(low, high, value) {
    if (![low, high, value].every(v => finite(v) && v > 0) || high < low) return null;
    return { fraction: high === low ? 0.5 : Math.max(0, Math.min(1, (value - low) / (high - low))),
      outside: value < low || value > high, flat: high === low };
  }
  /**
   * @param {ResearchRow[]} stocks
   * @returns {{up:number, down:number, flat:number, missing:number}} Missing price/change is never counted as unchanged. */
  function breadth(stocks) {
    const counts = { up: 0, down: 0, flat: 0, missing: 0 };
    for (const stock of stocks) {
      if (!finite(stock?.price) || stock.price <= 0 || !finite(stock.changePercent)) counts.missing++;
      else counts[stock.changePercent > 0 ? "up" : stock.changePercent < 0 ? "down" : "flat"]++;
    }
    return counts;
  }
  /**
   *
   * @param {ResearchRow[]} rows
   *
   * @returns {{minCap:number,maxCap:number,minChange:number,maxChange:number,points:{symbol:string,x:number,y:number}[]}|null}
   * Log-cap/linear-change coordinates; excludes missing metrics and returns null when none qualify.
   */
  function distribution(rows) {
    const available = rows.filter(r => finite(r.marketCapMillions) && r.marketCapMillions > 0 && finite(r.changePercent));
    if (!available.length) return null;
    const minCap = Math.min(...available.map(r => r.marketCapMillions)), maxCap = Math.max(...available.map(r => r.marketCapMillions));
    const minChange = Math.min(0, ...available.map(r => r.changePercent)), maxChange = Math.max(0, ...available.map(r => r.changePercent));
    return { minCap, maxCap, minChange, maxChange,
      points: available.map(r => ({ symbol: r.symbol,
        x: minCap === maxCap ? 0.5 : (Math.log10(r.marketCapMillions) - Math.log10(minCap)) / (Math.log10(maxCap) - Math.log10(minCap)),
        y: minChange === maxChange ? 0.5 : (r.changePercent - minChange) / (maxChange - minChange) })) };
  }
  /**
   *
   * @param {ResearchRow[]} rows
   *
   * @param {{query?:string,industry?:string,sort?:string,desc?:boolean,price?:number|string,changePercent?:number|string,marketCapMillions?:number|string,averageVolumeMillions?:number|string}} filters
   *
   * @returns {ResearchRow[]} A new filtered/sorted array; missing metrics fail active numeric filters and sort last.
   */
  function screen(rows, filters) {
    const keys = [
      "price",
      "changePercent",
      "marketCapMillions",
      "averageVolumeMillions",
    ];
    return rows
      .filter(
        (row) =>
          (!filters.query ||
            `${row.symbol} ${row.name}`
              .toLowerCase()
              .includes(filters.query.toLowerCase())) &&
          (!filters.industry || row.industry === filters.industry) &&
          keys.every((key) => {
            const min = filters[key];
            return (
              min === "" ||
              min == null ||
              (finite(row[key]) && row[key] >= Number(min))
            );
          }),
      )
      .sort((a, b) => {
        const key = filters.sort || "symbol",
          x = a[key],
          y = b[key];
        if (x == null) return y == null ? 0 : 1;
        if (y == null) return -1;
        return (
          (typeof x === "string" ? x.localeCompare(y) : x - y) *
          (filters.desc ? -1 : 1)
        );
      });
  }
  /**
   * @param {unknown} data Provider candle payload.
   * @returns {PricePoint[]} Empty for invalid/unordered closes; missing volume remains null. Times become milliseconds. */
  function candles(data) {
    if (
      !isRecord(data) || data.s !== "ok" ||
      !Array.isArray(data.c) ||
      !Array.isArray(data.t) ||
      data.c.length !== data.t.length || data.c.length > 2000
    )
      return [];
    const points = [];
    for (let i = 0; i < data.c.length; i++) {
      if (
        !finite(data.c[i]) ||
        data.c[i] <= 0 ||
        !Number.isSafeInteger(data.t[i]) ||
        data.t[i] <= 0 ||
        data.t[i] > 253402300799 ||
        (i && data.t[i] <= data.t[i - 1])
      )
        return [];
      points.push({
        time: data.t[i] * 1000,
        value: data.c[i],
        volume:
          Array.isArray(data.v) && finite(data.v[i]) && data.v[i] >= 0
            ? data.v[i]
            : null,
      });
    }
    return points;
  }
  /**
   * @param {PriceSeries[]} series Ordered positive closes.
   * @returns {PriceSeries[]} Shared dates rebased to 100, or [] when fewer than two shared observations exist. */
  function normalize(series) {
    if (series.length < 2 || series.some((s) => s.points.length < 2)) return [];
    const maps = series.map(
      (s) => new Map(s.points.map((p) => [p.time, p.value])),
    );
    const dates = series[0].points
      .map((p) => p.time)
      .filter((time) => maps.every((m) => m.has(time)));
    if (dates.length < 2) return [];
    return series.map((s, i) => ({
      name: s.name,
      points: dates.map((time) => ({
        time,
        value: (maps[i].get(time) / maps[i].get(dates[0])) * 100,
      })),
    }));
  }
  /**
   * @param {unknown} h
   * @param {string} [today] UTC ISO date boundary.
   * @returns {h is Holding} Checks supported symbol/currency, positive bounded amounts and a real nonfuture purchase date. */
  function validHolding(h, today = new Date().toISOString().slice(0, 10)) {
    return (
      isRecord(h) &&
      typeof h.symbol === "string" &&
      typeof h.currency === "string" &&
      typeof h.date === "string" &&
      /^[A-Z][A-Z0-9.-]{0,14}$/.test(h.symbol) &&
      /^[A-Z]{3}$/.test(h.currency) &&
      finite(h.quantity) &&
      h.quantity > 0 &&
      h.quantity <= 1000000 &&
      finite(h.purchasePrice) &&
      h.purchasePrice > 0 &&
      h.purchasePrice <= 1000000000 &&
      /^\d{4}-\d{2}-\d{2}$/.test(h.date) &&
      h.date >= "1900-01-01" &&
      h.date <= today &&
      Number.isFinite(Date.parse(h.date)) &&
      new Date(h.date).toISOString().slice(0, 10) === h.date
    );
  }
  /**
   *
   * @param {Holding[]} holdings Validated purchase lots.
   *
   * @param {Object<string,QuoteInput|undefined>} quotes Provider timestamps in seconds; missing/error quotes retain null valuations.
   *
   * @returns {{lots:(Holding & {cost:number,value:number|null,profit:number|null,timestamp:number|null})[],groups:{currency:string,cost:number,value:number|null,profit:number|null}[]}}
   * Values stay separate by currency. An absent/prepurchase quote makes its lot and currency total unavailable.
   */
  function valueHoldings(holdings, quotes) {
    const lots = holdings.map((h) => {
      const q = quotes[h.symbol];
      const usable =
        q?.currency === h.currency &&
        finite(q.price) &&
        q.price > 0 &&
        q.timestamp * 1000 >= Date.parse(h.date);
      const cost = h.quantity * h.purchasePrice,
        value = usable ? h.quantity * q.price : null;
      return {
        ...h,
        cost,
        value,
        profit: value === null ? null : value - cost,
        timestamp: usable ? q.timestamp : null,
      };
    });
    const groups = [...new Set(lots.map((h) => h.currency))].map((currency) => {
      const group = lots.filter((h) => h.currency === currency),
        cost = group.reduce((s, h) => s + h.cost, 0);
      const value = group.every((h) => h.value !== null)
        ? group.reduce((s, h) => s + h.value, 0)
        : null;
      return {
        currency,
        cost,
        value,
        profit: value === null ? null : value - cost,
      };
    });
    return { lots, groups };
  }
  /**
   *
   * @param {Holding[]} holdings Validated lots.
   * @param {Object<string,PricePoint[]>} histories Ordered historical closes.
   *
   * @returns {PriceSeries[]} Unrealized P/L by currency on shared dates after every purchase; [] for missing histories.
   */
  function unrealizedProfitLossHistory(holdings, histories) {
    if (!holdings.length || holdings.some((h) => !histories[h.symbol]?.length))
      return [];
    const pricesBySymbol = new Map();
    const lotsByCurrency = new Map();
    let latestPurchase = -Infinity;
    for (const holding of holdings) {
      latestPurchase = Math.max(latestPurchase, Date.parse(holding.date));
      if (!pricesBySymbol.has(holding.symbol)) {
        const prices = new Map();
        for (const point of histories[holding.symbol]) {
          if (!prices.has(point.time)) prices.set(point.time, point.value);
        }
        pricesBySymbol.set(holding.symbol, prices);
      }
      if (!lotsByCurrency.has(holding.currency)) lotsByCurrency.set(holding.currency, []);
      lotsByCurrency.get(holding.currency).push(holding);
    }
    const priceIndexes = [...pricesBySymbol.values()];
    const dates = histories[holdings[0].symbol]
      .map(point => point.time)
      .filter(time => time >= latestPurchase && priceIndexes.every(prices => prices.has(time)));
    return [...lotsByCurrency].map(([currency, lots]) => ({
      name: `${currency} historical unrealized P/L`,
      points: dates.map(time => ({
        time,
        value: lots.reduce((sum, lot) => sum + lot.quantity *
          (pricesBySymbol.get(lot.symbol).get(time) - lot.purchasePrice), 0)
      }))
    }));
  }

  function period(n) {
    if (!Number.isInteger(n) || n < 2 || n > 200)
      throw new Error("Indicator periods must be whole numbers from 2 to 200.");
  }
  /**
   * @param {number[]} values Finite observations.
   * @param {number} n Integer period 2–200.
   * @returns {(number|null)[]} SMA with null warmup entries.
   * @throws {Error} Invalid period. */
  function sma(values, n) {
    period(n);
    let total = 0;
    return values.map((v, i) => {
      total += v;
      if (i >= n) total -= values[i - n];
      return i >= n - 1 ? total / n : null;
    });
  }
  /**
   * @param {number[]} values Finite observations.
   * @param {number} n Integer period 2–200.
   * @returns {(number|null)[]} SMA-seeded EMA with null warmup entries.
   * @throws {Error} Invalid period. */
  function ema(values, n) {
    period(n);
    let sum = 0,
      previous = null;
    return values.map((v, i) => {
      if (i < n) {
        sum += v;
        if (i === n - 1) previous = sum / n;
      } else previous = (v * 2) / (n + 1) + previous * (1 - 2 / (n + 1));
      return previous;
    });
  }
  /**
   * @param {number[]} values Finite closes.
   * @param {number} n Integer period 2–200.
   * @returns {(number|null)[]} Wilder RSI with null warmup; flat input resolves to 50.
   * @throws {Error} Invalid period. */
  function rsi(values, n) {
    period(n);
    let gain = 0,
      loss = 0;
    return values.map((v, i) => {
      if (i === 0) return null;
      const delta = v - values[i - 1],
        up = Math.max(0, delta),
        down = Math.max(0, -delta);
      if (i <= n) {
        gain += up / n;
        loss += down / n;
      } else {
        gain = (gain * (n - 1) + up) / n;
        loss = (loss * (n - 1) + down) / n;
      }
      return i < n
        ? null
        : loss === 0
          ? gain === 0
            ? 50
            : 100
          : 100 - 100 / (1 + gain / loss);
    });
  }
  /**
   *
   * @param {number[]} values Finite closes.
   * @param {number} fast
   * @param {number} slow
   * @param {number} signal Integer periods 2–200.
   *
   * @returns {{line:(number|null)[],signal:(number|null)[],histogram:(number|null)[]}} Aligned arrays with null warmup entries.
   *
   * @throws {Error} Invalid periods or fast >= slow.
   */
  function macd(values, fast, slow, signal) {
    [fast, slow, signal].forEach(period);
    if (fast >= slow)
      throw new Error("MACD fast period must be shorter than its slow period.");
    const a = ema(values, fast),
      b = ema(values, slow),
      line = values.map((_, i) => (b[i] === null ? null : a[i] - b[i]));
    const compact = ema(
        line.filter((v) => v !== null),
        signal,
      ),
      signalLine = line.map((_, i) =>
        i < slow - 1 ? null : compact[i - slow + 1],
      );
    return {
      line,
      signal: signalLine,
      histogram: line.map((v, i) =>
        signalLine[i] == null ? null : v - signalLine[i],
      ),
    };
  }
  const api = {
    finite,
    screenerPreset,
    validScreenerPreset,
    pricePosition,
    breadth,
    distribution,
    screen,
    candles,
    normalize,
    validHolding,
    valueHoldings,
    unrealizedProfitLossHistory,
    sma,
    ema,
    rsi,
    macd,
  };
  root.StocklumoMath = Object.freeze(api);
  if (typeof module !== "undefined") module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
