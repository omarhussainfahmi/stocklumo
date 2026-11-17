const assert = require('node:assert/strict');

// Mock fetch/json callbacks resolve on the microtask queue. Yield an event-loop
// turn rather than guessing how many milliseconds the machine will need.
const flushTasks = () => new Promise(resolve => setImmediate(resolve));

async function waitFor(predicate, message = 'Expected browser state did not arrive') {
  const deadline = Date.now() + 3000;
  while (!predicate()) {
    assert.ok(Date.now() < deadline, message);
    await flushTasks();
  }
}

function controlTimers(window) {
  let clock = 0, sequence = 0;
  const pending = new Map();
  window.setTimeout = (callback, delay = 0) => {
    const id = ++sequence;
    pending.set(id, { callback, at: clock + delay });
    return id;
  };
  window.clearTimeout = id => pending.delete(id);
  return async milliseconds => {
    clock += milliseconds;
    for (const [id, timer] of [...pending]) {
      if (timer.at > clock) continue;
      pending.delete(id);
      timer.callback();
    }
    await flushTasks();
  };
}

module.exports = { flushTasks, waitFor, controlTimers };
