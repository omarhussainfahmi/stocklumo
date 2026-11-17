(() => {
  "use strict";
  function create({inlineFieldErrors = true} = {}) {
  const math = window.StocklumoMath;
  const $ = (id) => document.getElementById(id);
  function setBusy(button, busy) {
    button.disabled = busy;
    button.setAttribute("aria-busy", String(busy));
    results.setAttribute("aria-busy", String(busy));
    document
      .querySelectorAll("#research-controls input, #research-controls select")
      .forEach((input) => (input.disabled = busy));
  }
  const controls = $("research-controls"),
    results = $("research-results"),
    status = $("research-status");
  const view = window.StocklumoResearchView.forHost(results);
  const { node } = view;
  $("research").hidden = false;
  // Use the application's native modal pattern for focused data information.
  // A separate reading surface avoids a dropdown obscuring active form fields.
  const dataDialog = $("research-data-dialog"), dataOpener = $("research-data-open");
  dataOpener.addEventListener("click", () => {
    if (!dataDialog.open) dataDialog.showModal();
  });
  $("research-data-close").addEventListener("click", () => dataDialog.close());
  dataDialog.addEventListener("close", () => dataOpener.focus({ preventScroll: true }));
  function outsideDataDialog(event) {
    const bounds = dataDialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }
  // Backdrop events may target the document rather than the dialog (Chromium).
  document.addEventListener("wheel", event => {
    if (dataDialog.open && outsideDataDialog(event)) event.preventDefault();
  }, { passive: false, capture: true });
  document.addEventListener("touchmove", event => {
    if (dataDialog.open && event.touches.length === 1 && outsideDataDialog(event.touches[0])) event.preventDefault();
  }, { passive: false, capture: true });
  const actions = document.createElement("div");
  actions.className = "research-actions";
  controls.append(actions);
  const storageStatus = document.createElement("p");
  storageStatus.setAttribute("role", "status");
  controls.after(storageStatus);
  let fieldSequence = 0;
  const fieldErrors = new Map();
  function clearFieldError(input) {
    input.removeAttribute("aria-invalid");
    const error = fieldErrors.get(input);
    if (error) {
      error.textContent = "";
      error.hidden = true;
      const ids = (input.getAttribute("aria-describedby") || "").split(/\s+/).filter(id => id && id !== error.id);
      input.setAttribute("aria-describedby", ids.join(" "));
    }
  }
  function clearValidation() {
    fieldErrors.forEach((_, input) => clearFieldError(input));
    if (status.classList.contains("validation-error")) status.textContent = "";
    status.classList.remove("validation-error");
    status.setAttribute("role", "status");
  }
  function registerField(input, wrap) {
    input.id = `research-field-${++fieldSequence}`;
    const label = document.createElement("span");
    label.id = `${input.id}-label`;
    label.textContent = wrap.firstChild.textContent;
    wrap.firstChild.replaceWith(label);
    input.setAttribute("aria-labelledby", label.id);
    // Portfolio uses one shared, associated error note below its editor.
    if (!inlineFieldErrors) { fieldErrors.set(input, null); return; }
    const error = document.createElement("span");
    error.id = `${input.id}-error`;
    error.className = "field-error";
    error.hidden = true;
    wrap.append(error);
    fieldErrors.set(input, error);
  }
  controls.addEventListener("input", event => {
    clearFieldError(event.target);
    if (!controls.querySelector('[aria-invalid="true"]')) {
      if (status.classList.contains("validation-error")) status.textContent = "";
      status.classList.remove("validation-error");
      status.setAttribute("role", "status");
    }
  });
  function validationError(message, inputs) {
    clearValidation();
    status.textContent = message;
    status.classList.add("validation-error");
    status.setAttribute("role", "alert");
    inputs.forEach(input => {
      input.setAttribute("aria-invalid", "true");
      const error = fieldErrors.get(input);
      if (error) {
        error.textContent = message;
        error.hidden = false;
        input.setAttribute("aria-describedby", `${input.getAttribute("aria-describedby") || ""} ${error.id}`.trim());
      }
    });
    inputs[0]?.focus();
  }
  function emptyState(title, description, actionText, action) {
    const panel = node("div");
    panel.className = "empty-state";
    panel.append(node("h2", title), node("p", description));
    if (actionText && action) {
      const next = node("button", actionText);
      next.type = "button";
      next.onclick = action;
      panel.append(next);
    }
    results.replaceChildren(panel);
  }
  function introduction(description, notes) {
    $("research-description").textContent = description;
    $("research-notes").textContent = notes;
  }
  function field(label, type = "text", value = "") {
    const wrap = node("label", label),
      input = node("input");
    input.type = type;
    input.value = value;
    input.setAttribute("aria-describedby", "research-status");
    if (type === "date") {
      // iOS date controls add horizontal padding outside their assigned width.
      const frame = node("span");
      frame.className = "date-field";
      frame.append(input);
      wrap.append(frame);
    } else wrap.append(input);
    registerField(input, wrap);
    controls.insertBefore(wrap, actions);
    return input;
  }
  function select(label, options) {
    // Native Select and Date fields intentionally accept operating-system popup geometry.
    const wrap = node("label", label),
      input = node("select");
    options.forEach(([value, text]) => {
      const option = node("option", text);
      option.value = value;
      input.append(option);
    });
    wrap.append(input);
    registerField(input, wrap);
    controls.insertBefore(wrap, actions);
    return input;
  }
  function button(label, action) {
    const b = node("button", label);
    b.type = "button";
    b.onclick = action;
    actions.append(b);
    return b;
  }
  async function get(url) {
    try {
      const r = await fetch(url);
      if (!r.ok) {
        const body = await r.json().catch(() => null);
        return {
          state: "error",
          message:
            r.status === 429
              ? "Request limit reached. Retry in a minute."
              : body?.message || "Unable to load data.",
        };
      }
      try {
        const body = await r.json();
        return body !== null && typeof body === "object" && !Array.isArray(body)
          ? body
          : { state: "error", message: "Invalid server response. Please retry." };
      } catch {
        return { state: "error", message: "Invalid server response. Please retry." };
      }
    } catch {
      return {
        state: "error",
        message: "Connection unavailable. Please retry.",
      };
    }
  }
  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      storageStatus.textContent = "Saved on this device.";
      return true;
    } catch {
      storageStatus.textContent =
        "Storage unavailable. Changes last for this visit.";
      return false;
    }
  }
  function symbols(value, min = 1, max = 5) {
    const items = [
      ...new Set(
        value
          .toUpperCase()
          .split(/[\s,]+/)
          .filter(Boolean),
      ),
    ];
    if (
      items.length < min ||
      items.length > max ||
      items.some((s) => !/^[A-Z][A-Z0-9.-]{0,14}$/.test(s))
    )
      throw new Error(
        min === 1 && max === 1 ? "Enter one valid ticker." : `Enter ${min} to ${max} different stock tickers, separated by commas.`,
      );
    return items;
  }

  return Object.freeze({$, math, controls, results, status, actions, storageStatus, setBusy, clearValidation, validationError, emptyState, introduction, field, select, button, get, read, save, symbols, ...view});
  }
  window.StocklumoResearchPage = Object.freeze({create});
})();
