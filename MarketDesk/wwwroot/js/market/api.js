(() => {
  "use strict";
  /**
   * @param {string} path Application route supplied by the calling capability.
   * @param {AbortSignal} [signal] Cancellation propagates as AbortError.
   * @returns {Promise<Record<string, unknown>>} Parsed object or safe error envelope.
   */
  async function get(path, signal) {
    try {
      const response = await fetch(path, {
        signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok)
        return {
          state: "error",
          message:
            response.status === 429
              ? "Request limit reached. Retry in a minute."
              : "This information could not be loaded.",
        };
      try {
        const body = await response.json();
        return body !== null && typeof body === "object" && !Array.isArray(body)
          ? body
          : { state: "error", message: "Invalid server response. Please retry." };
      } catch (error) {
        if (error.name === "AbortError") throw error;
        return { state: "error", message: "Invalid server response. Please retry." };
      }
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return {
        state: "error",
        message: "Connection unavailable. Retry shortly.",
      };
    }
  }
  window.StocklumoMarketApi = Object.freeze({get});
})();
