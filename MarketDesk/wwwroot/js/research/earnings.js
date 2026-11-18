(() => {
  "use strict";
  if (location.pathname !== "/earnings") return;
  const {$, controls, results, status, actions, setBusy, clearValidation, validationError, emptyState, introduction, field, select, button, get, read, symbols, node, fmt, pagedTable, stockLink, reportedEPS, earningsTimeline} = window.StocklumoResearchPage.create();
  async function earnings() {
    const preview = window.StocklumoPreviewReady ? await window.StocklumoPreviewReady : null;
    $("research-title").textContent = "Earnings calendar";
    introduction("Earnings dates, estimates and results. Dates may change.",
      "Actuals appear when reported. Fiscal period ends are not announcement dates. EPS is per share; revenue is in whole units. Finnhub does not specify currency here: do not compare or sum amounts across companies.");
    if (preview?.calendarSymbols?.length) {
      $("research-description").textContent = `Local calendar snapshot · ${preview.calendarSymbols.length} companies · ${preview.calendarFrom} to ${preview.calendarTo}.`;
      $("research-notes").textContent = `Captured calendar covers ${preview.calendarSymbols.join(', ')}. Event dates use America/New_York, not provider grouping labels. Amounts include currency; empty actuals stay missing. Reported-quarter requests still use Finnhub.`;
    }
    const ticker = field("Ticker (optional)");
    ticker.maxLength = 15;
    const mode = select("Display", [
      ["calendar", "Earnings calendar"],
      ["reported", "Last 4 reported quarters"],
    ]);
    const today = new Date(),
      end = new Date(today);
    end.setUTCDate(end.getUTCDate() + 30);
    const from = field(
        "From",
        "date",
        today.toISOString().slice(0, 10),
      ),
      to = field("To", "date", end.toISOString().slice(0, 10));
    const rangeHint = node("p");
    rangeHint.id = "earnings-date-hint";
    rangeHint.className = "field-help";
    controls.insertBefore(rangeHint, actions);
    // DateOnly.AddYears clamps February 29 to February 28, unlike setUTCFullYear.
    function calendarLimits() {
      const now = new Date(), year = now.getUTCFullYear(), month = now.getUTCMonth(), day = now.getUTCDate();
      const bound = offset => {
        const targetYear = year + offset;
        const lastDay = new Date(Date.UTC(targetYear, month + 1, 0)).getUTCDate();
        return new Date(Date.UTC(targetYear, month, Math.min(day, lastDay))).toISOString().slice(0, 10);
      };
      const min = bound(-1), max = bound(1);
      [from, to].forEach(input => {
        input.required = true;
        input.min = min;
        input.max = max;
        const ids = new Set((input.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
        ids.add(rangeHint.id);
        input.setAttribute("aria-describedby", [...ids].join(" "));
      });
      rangeHint.textContent = `Choose dates from ${min} to ${max} (UTC), spanning at most 92 days.`;
      return { min, max };
    }
    calendarLimits();
    function validateCalendarRange() {
      const { min, max } = calendarLimits();
      const dayNumber = value => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
        const time = Date.parse(`${value}T00:00:00Z`);
        return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time / 86400000 : NaN;
      };
      const invalid = [from, to].filter(input => !Number.isFinite(dayNumber(input.value)));
      if (invalid.length) { validationError("Choose a valid date for both From and To.", invalid); return false; }
      const outside = [from, to].filter(input => input.value < min || input.value > max);
      if (outside.length) { validationError(`Choose dates from ${min} to ${max} (UTC).`, outside); return false; }
      if (to.value < from.value) { validationError("Choose a To date on or after the From date.", [to]); return false; }
      if (dayNumber(to.value) - dayNumber(from.value) > 92) {
        validationError("Choose a range spanning at most 92 days.", [to]); return false;
      }
      return true;
    }
    const scope = select("Filter", [
      ["all", "All / selected ticker"],
      ["watch", "My watchlist"],
    ]);
    controls.append(rangeHint);
    mode.onchange = () => {
      from.closest("label").hidden = to.closest("label").hidden =
        mode.value === "reported";
      rangeHint.hidden = mode.value === "reported";
      clearValidation();
    };
    const run = button("Load earnings", async () => {
      let selected = null;
      try {
        if (ticker.value.trim()) [selected] = symbols(ticker.value, 1, 1);
      } catch (e) {
        validationError(e.message, [ticker]);
        return;
      }
      clearValidation();
      const saved = read("stocklumo.watch", []),
        watch = Array.isArray(saved)
          ? saved
              .filter(
                (s) =>
                  typeof s === "string" && /^[A-Z][A-Z0-9.-]{0,14}$/.test(s),
              )
              .slice(0, 20)
          : [];
      if (
        scope.value === "watch" &&
        (!watch.length || (selected && !watch.includes(selected)))
      ) {
        results.replaceChildren(
          node("p", "No matching stocks in your watchlist."),
        );
        status.textContent = "No requests needed.";
        return;
      }
      if (mode.value === "reported" && !selected && scope.value !== "watch") {
        validationError("Enter a ticker or choose My watchlist for reported results.", [ticker]);
        return;
      }
      if (mode.value === "calendar" && !validateCalendarRange()) return;
      setBusy(run, true);
      results.replaceChildren();
      status.textContent = "Loading earnings...";
      let rows = [],
        errors = [];
      if (mode.value === "calendar") {
        const query = new URLSearchParams({ from: from.value, to: to.value });
        if (selected) query.set("symbol", selected);
        const r = await get((preview?.calendarSymbols?.length ? "/api/research-preview/earnings?" : "/api/research/earnings?") + query);
        if (r.state !== "ok") errors.push(r.message || "Earnings unavailable.");
        rows = Array.isArray(r.data?.earningsCalendar)
          ? r.data.earningsCalendar
          : [];
        rows = rows
          .filter(
            (r) =>
              r &&
              typeof r.symbol === "string" &&
              /^[A-Z][A-Z0-9.-]{0,14}$/.test(r.symbol) &&
              (!selected || r.symbol === selected) &&
              (scope.value !== "watch" || watch.includes(r.symbol)),
          )
          .sort((a, b) => String(a.date).localeCompare(String(b.date)));
        earningsTimeline(rows);
        pagedTable(
          [
            "Ticker",
            "Announcement date",
            "Timing",
            "EPS estimate",
            "EPS actual",
            "Revenue estimate",
            "Revenue actual",
          ],
          rows, (r) => [
            stockLink(r.symbol),
            r.date || "Unavailable",
            {
              bmo: "Before market open",
              amc: "After market close",
              dmh: "During market hours",
            }[r.hour] || "Unspecified",
            fmt(r.epsEstimate),
            fmt(r.epsActual),
            fmt(r.revenueEstimate),
            fmt(r.revenueActual),
          ],
          "Earnings calendar: announcement dates, estimates and actual results",
        );
      } else {
        for (const symbol of selected ? [selected] : [...new Set(watch)]) {
          const r = await get(`/api/research/earnings/${symbol}/reported`);
          if (r.state !== "ok")
            errors.push(`${symbol}: ${r.message || "Unavailable"}`);
          if (Array.isArray(r.data))
            rows.push(...r.data.filter((row) => row && row.symbol === symbol));
        }
        reportedEPS(rows);
        pagedTable(
          [
            "Ticker",
            "Fiscal period end",
            "Fiscal year / quarter",
            "EPS estimate",
            "EPS actual",
            "Surprise (%)",
          ],
          rows, (r) => [
            stockLink(r.symbol),
            r.period || "Unavailable",
            `${r.year ?? "-"} / ${r.quarter ?? "-"}`,
            fmt(r.estimate),
            fmt(r.actual),
            fmt(r.surprisePercent),
          ],
          "Reported earnings: fiscal quarters, EPS and surprise",
        );
      }
      if (!rows.length)
        results.append(
          node(
            "p",
            errors.length
              ? "Provider data unavailable. Try again later."
              : "No earnings found for these filters.",
          ),
        );
      status.textContent = errors.length
        ? errors.join(" ")
        : `${rows.length} records. Cached up to 1 hour.`;
      setBusy(run, false);
    });
    run.classList.add("primary");
    emptyState("Plan around earnings", "Choose a date range or ticker, then load the calendar. Reported quarters are available in Display.");
  }
  earnings();
})();
