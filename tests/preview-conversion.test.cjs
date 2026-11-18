const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('tools/build-research-preview.cjs', 'utf8');

function convert(volume, minute = false, financials = {}) {
  const raw = {
    capturedAt: '2020-02-01T00:00:00Z', companies: [],
    histories: minute ? {} : { AAPL: [['2020-01-01T00:00:00Z', 10, 12, 9, 11, volume]] },
    adjusted: {}, intraday: minute ? { AAPL: [['2020-01-01T00:00:00Z', 10, volume]] } : {},
    screener: { rows: [], total: 0 }, financials, calendar: []
  };
  let written;
  vm.runInNewContext(source, {
    require: name => name === 'node:fs' ? {
      readFileSync: () => JSON.stringify(raw), mkdirSync() {},
      writeFileSync: (_, content) => { written = JSON.parse(content); }
    } : require(name),
    process: { argv: ['node', 'converter', 'input.json', 'output.json'] },
    console: { log() {} }
  });
  return written;
}

test('preview conversion rejects missing, coerced and negative volumes in daily and minute bars', () => {
  for (const minute of [false, true]) {
    for (const volume of [null, undefined, '', ' ', 'invalid', true, false, [], [1], {}, -1]) {
      assert.throws(() => convert(volume, minute), /Invalid (minute observation|OHLCV)/);
    }
    for (const volume of [0, 10, '0', '10.5']) {
      const data = convert(volume, minute);
      const row = (minute ? data.intraday : data.histories).AAPL[0];
      assert.equal(row.volume, Number(volume));
    }
  }
});

test('preview financial periods reject impossible, missing and preperiod publication dates', () => {
  const period = (end, published) => ({ fp_end: end, rpt_date: published, report_txt: 'Q1', fields: [] });
  const data = convert(0, false, { AAPL: { currency: 'USD', list: [
    period('2020-02-29', '2020-03-01'), period('2020-02-30', '2020-03-01'),
    period('2020-02-29', 'invalid'), period('2020-02-29', null), period('2020-02-29', '2020-02-28')
  ] } });
  assert.equal(data.financials.AAPL.length, 1);
  assert.equal(data.financials.AAPL[0].periodEnd, '2020-02-29');
  assert.equal(data.financials.AAPL[0].publishedAt, '2020-03-01');
});
