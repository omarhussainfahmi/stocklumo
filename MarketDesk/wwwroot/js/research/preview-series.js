(() => {
  "use strict";
  const number = (n) => typeof n === "number" && Number.isFinite(n);
  function valid(data) {
    if (
      data?.s !== "ok" ||
      !data.localOnly ||
      !Array.isArray(data.t) ||
      !Array.isArray(data.c) ||
      data.t.length !== data.c.length ||
      data.t.length < 2 ||
      data.t.length > 1000
    )
      return false;
    return data.c.every(
      (p, i) =>
        number(p) &&
        p > 0 &&
        Number.isSafeInteger(data.t[i]) &&
        data.t[i] > 0 &&
        (!i || data.t[i] > data.t[i - 1]),
    );
  }
  function hasOHLC(data) {
    return (
      ["o", "h", "l"].every(
        (k) => Array.isArray(data[k]) && data[k].length === data.c.length,
      ) &&
      data.c.every(
        (c, i) =>
          [data.o[i], data.h[i], data.l[i]].every((n) => number(n) && n > 0) &&
          data.l[i] <= Math.min(data.o[i], c) &&
          data.h[i] >= Math.max(data.o[i], c),
      )
    );
  }
  window.StocklumoPreviewSeries = Object.freeze({number, valid, hasOHLC});
})();
