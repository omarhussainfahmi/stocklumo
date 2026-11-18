// Convert a manually captured, real provider response into a bounded local preview.
// No credentials or provider calls. Never put the output in wwwroot or publish it.
const fs = require('node:fs');
const path = require('node:path');
const input = process.argv[2], output = process.argv[3];
if (!input || !output) throw Error('Usage: node tools/build-research-preview.cjs input.json output.json');
const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
const symbol = value => typeof value === 'string' && /^[A-Z][A-Z0-9.-]{0,14}$/.test(value);
const numeric = value => (typeof value === 'number' || typeof value === 'string' && value.trim() !== '') && Number.isFinite(Number(value)) ? Number(value) : null;
function dateStamp(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : null;
}
const capturedAt = new Date(raw.capturedAt);
if (!Number.isFinite(+capturedAt) || +capturedAt > Date.now() + 60000) throw Error('Invalid capture time');
function bars(items, minute = false) {
  if (!Array.isArray(items) || !items.length || items.length > 1000) throw Error('Missing or oversized history');
  let previous = 0;
  return items.map(row => {
    const time = Date.parse(row[0]) / 1000;
    if (!Number.isSafeInteger(time) || time <= previous || time * 1000 > +capturedAt) throw Error('Invalid history dates');
    previous = time;
    if (minute) {
      const price = numeric(row[1]), volume = numeric(row[2]);
      if (!(price > 0) || !Number.isFinite(volume) || volume < 0) throw Error('Invalid minute observation');
      return { time, price, volume };
    }
    const [open, high, low, close, volume] = row.slice(1).map(numeric);
    if (![open, high, low, close].every(n => n > 0) || !Number.isFinite(volume) || volume < 0 || low > Math.min(open, close) || high < Math.max(open, close) || low > high) throw Error('Invalid OHLCV');
    return { time, open, high, low, close, volume };
  });
}
function series(data, minute = false) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (!symbol(key)) throw Error('Invalid symbol');
    return [key, bars(value, minute)];
  }));
}
const histories = series(raw.histories), adjusted = series(raw.adjusted), intraday = series(raw.intraday, true);
const companies = new Map(raw.companies.map(c => [c.symbol, c]));
const screener = raw.screener.rows.map(([listing, price, cap, pe, change, growth, margin, roe, dividend]) => {
  const company = companies.get(listing), ticker = listing.replace(/\.US$/, '');
  if (!symbol(ticker) || !company || company.currency !== 'USD') return null;
  const amount = numeric(cap), last = numeric(price), shares = numeric(company.total_shares);
  // Verify the raw cap scale against shares × price instead of trusting translated unit labels.
  const capVerified = amount > 0 && shares > 0 && last > 0 && Math.abs(amount / (shares * last) - 1) < .05;
  const recent = histories[ticker]?.slice(-10);
  return { symbol: ticker, name: company.name_en || ticker, currency: company.currency, industry: null,
    price: last, changePercent: numeric(change), marketCapMillions: capVerified ? amount / 1e6 : null,
    averageVolumeMillions: recent?.length === 10 ? recent.reduce((sum, p) => sum + p.volume, 0) / 10 / 1e6 : null,
    peTtm: numeric(pe), dividendYieldTtm: numeric(dividend), timestamp: null,
    state: 'partial', message: 'Dated Longbridge screening snapshot; individual quote time unavailable.',
    revenueGrowthPercent: numeric(growth), netMarginPercent: numeric(margin), roePercent: numeric(roe) };
}).filter(Boolean);
const financials = Object.fromEntries(Object.entries(raw.financials).map(([ticker, data]) => [ticker,
  data.list.map(period => {
    const fields = Object.fromEntries(period.fields.map(f => [f.field, numeric(f.value)]));
    const periodEnd = dateStamp(period.fp_end), publishedAt = dateStamp(period.rpt_date);
    if (periodEnd === null || publishedAt === null || publishedAt < periodEnd) return null;
    return { period: period.report_txt, periodEnd: period.fp_end, publishedAt: period.rpt_date, currency: data.currency,
      revenue: fields.total_rev ?? fields.rev, netIncome: fields.ni, operatingIncome: fields.oper_inc };
  }).filter(Boolean).sort((a,b) => a.periodEnd.localeCompare(b.periodEnd))]));
const eastern = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year:'numeric',month:'2-digit',day:'2-digit' });
const seen = new Set(), earnings = [];
for (const day of raw.calendar) for (const event of day.infos) {
  const ticker = event.symbol.replace(/\.US$/, ''), instant = new Date(event.datetime);
  if (!symbol(ticker) || !Number.isFinite(+instant)) continue;
  const parts = Object.fromEntries(eastern.formatToParts(instant).map(p => [p.type,p.value]));
  const date = `${parts.year}-${parts.month}-${parts.day}`, key = ticker + ':' + date;
  if (seen.has(key)) continue;
  seen.add(key);
  const values = Object.fromEntries(event.data_kv.map(v => [v.type, numeric(v.value_raw)]));
  earnings.push({ symbol:ticker,date,eventTime:event.datetime,currency:event.currency,hour:'',
    epsEstimate:values.estimate_eps ?? null,epsActual:values.actual_eps ?? null,
    revenueEstimate:values.estimate_revenue ?? null,revenueActual:values.actual_revenue ?? null });
}
const bundle = { version:1, source:'Longbridge', capturedAt:capturedAt.toISOString(), histories,adjusted,intraday,financials,
  screener, screenerTotal:raw.screener.total, earnings:earnings.sort((a,b)=>a.date.localeCompare(b.date)),
  calendarFrom:raw.calendarFrom,calendarTo:raw.calendarTo,calendarSymbols:Object.keys(histories) };
fs.mkdirSync(path.dirname(output), {recursive:true});
fs.writeFileSync(output, JSON.stringify(bundle));
console.log(JSON.stringify({symbols:Object.keys(histories),screened:screener.length,capVerified:screener.filter(s=>s.marketCapMillions!==null).length,financials:Object.keys(financials),events:earnings.length,capturedAt:bundle.capturedAt}));
