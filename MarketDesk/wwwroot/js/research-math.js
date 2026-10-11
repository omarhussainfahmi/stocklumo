/* Pure calculations shared by the research pages and their tests. */
((root) => {
  "use strict";
  const finite = (value) => typeof value === "number" && Number.isFinite(value);
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
  function candles(data) {
    if (
      data?.s !== "ok" ||
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
  function validHolding(h, today = new Date().toISOString().slice(0, 10)) {
    return (
      !!h &&
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
  function portfolioHistory(holdings, histories) {
    if (!holdings.length || holdings.some((h) => !histories[h.symbol]?.length))
      return [];
    const dates = histories[holdings[0].symbol]
      .map((p) => p.time)
      .filter((time) =>
        holdings.every(
          (h) =>
            time >= Date.parse(h.date) &&
            histories[h.symbol].some((p) => p.time === time),
        ),
      );
    return [...new Set(holdings.map((h) => h.currency))].map((currency) => ({
      name: `${currency} historical unrealized P/L`,
      points: dates.map((time) => ({
        time,
        value: holdings
          .filter((h) => h.currency === currency)
          .reduce(
            (sum, h) =>
              sum +
              h.quantity *
                (histories[h.symbol].find((p) => p.time === time).value -
                  h.purchasePrice),
            0,
          ),
      })),
    }));
  }
  function period(n) {
    if (!Number.isInteger(n) || n < 2 || n > 200)
      throw new Error("Indicator periods must be whole numbers from 2 to 200.");
  }
  function sma(values, n) {
    period(n);
    let total = 0;
    return values.map((v, i) => {
      total += v;
      if (i >= n) total -= values[i - n];
      return i >= n - 1 ? total / n : null;
    });
  }
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
    screen,
    candles,
    normalize,
    validHolding,
    valueHoldings,
    portfolioHistory,
    sma,
    ema,
    rsi,
    macd,
  };
  root.StocklumoMath = Object.freeze(api);
  if (typeof module !== "undefined") module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
