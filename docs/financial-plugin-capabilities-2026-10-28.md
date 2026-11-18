# Installed financial plugin capability inventory

Captured 28 October 2026. These are declared tools, not proof that every endpoint is enabled on this account. No separate SKILL.md is included in either installed plugin package. Tool instructions and official provider documentation were reviewed instead.

## Financial Datasets — 28 tools

- **get_balance_sheet** — Retrieves a company's balance sheet, which provides a snapshot of its assets, liabilities, and shareholders' equity at a specific point in time. Essential for assessing a company's financial position. Covers US and UK companies: pass market 'UK' or an isin for a UK company.

- **get_beneficial_owners** — Lists beneficial owners (holders of more than 5% of a company's shares, from SEC Schedules 13D/13G) with their filer CIK and reporting-person name. Optionally filter by case-insensitive name prefix. The response's `total` is the full match count; when it exceeds the returned page, narrow the search with `name`. Use this to discover the filer_cik to pass to get_beneficial_ownership.

- **get_beneficial_ownership** — Retrieves beneficial-ownership stakes (holders of more than 5% of a class of shares) from SEC Schedules 13D and 13G. Schedule 13D stakes are ACTIVIST (intent to influence control: proxy fights, board seats, pushing for a sale); Schedule 13G stakes are passive (large asset managers). Query by ticker (who owns this company) OR by filer_cik (what stakes does this owner hold) — exactly one is required. Use type=activist to isolate activist stakes. By default each stake's CURRENT state is returned; set history=true for the full amendment chain. Each row is one reporting person with voting/dispositive powers, percent_of_class, and (for 13D) the stated purpose_of_transaction. Coverage begins January 2025.

- **get_cash_flow_statement** — Provides a company's cash flow statement, showing how cash is generated and used across operating, investing, and financing activities. Key for understanding a company's liquidity and solvency. Covers US and UK companies: pass market 'UK' or an isin for a UK company.

- **get_company_facts** — Get comprehensive company facts data for a stock ticker or CIK from Financial Datasets. Returns real-time information including market cap, number of employees, sector/industry classification, exchange listing, company location, website URL, SIC codes, weighted average shares, and historical events like ticker changes.

- **get_earnings** — Retrieves earnings data from SEC filings. Returns a flat list of `EarningsRecord` entries — same shape in either mode.
  • COMPANY EARNINGS — pass a `ticker` to get the most recent SEC filings (8-K / 10-Q / 10-K / 20-F) for that company. The same `report_period` may appear in two consecutive entries when an 8-K announcement and the matching 10-Q have both been filed; the 8-K comes first because it filed earlier. Sorted `(report_period DESC, filing_date ASC)`.
  • EARNINGS FEED — omit `ticker` to get the real-time feed of the most recently filed earnings across all covered companies, sorted by `filing_date` descending and deduped by `(ticker, report_period)`.
Each entry exposes `ticker`, `report_period`, `fiscal_period`, `currency`, `source_type`, `filing_date`, `filing_url`, `accession_number`, plus `quarterly` and/or `annual` financial blocks (revenue, EPS, surprise vs estimates, etc.).

- **get_filing_items** — Retrieves specific sections (items) from a company's SEC filings (10-K, 10-Q, or 8-K). Useful for extracting detailed information such as 'Business', 'Risk Factors', or 'Financial Statements and Supplementary Data'.

- **get_filings** — Get SEC filings data for a stock ticker or CIK. Returns a list of filings, including the accession number, filing type, report date, and URLs to the filing documents.

- **get_financial_metrics** — Retrieves historical financial metrics for a company, such as P/E ratio, revenue per share, and enterprise value, over a specified period. Useful for trend analysis and historical performance evaluation. Covers US and UK companies: pass market 'UK' or an isin for a UK company.

- **get_financial_metrics_snapshot** — Fetches a snapshot of the most current financial metrics for a company, including key indicators like market capitalization, P/E ratio, and dividend yield. Useful for a quick overview of a company's financial health. Covers US and UK companies: pass market 'UK' or an isin for a UK company.

- **get_income_statement** — Fetches a company's income statement, detailing its revenues, expenses, and net income over a reporting period. Useful for evaluating a company's profitability and operational efficiency. Covers US and UK companies: pass market 'UK' or an isin for a UK company.

- **get_index_fund** — Get an ETF or index fund's holdings and each position's weight (percent of net assets) for a fund ticker (e.g. SPY), sourced from SEC fund-holdings filings. Returns the fund's latest filing by default, or the composition as of a past date. Response includes a fund header (as-of period, total net assets, coverage counts) and the holdings sorted by weight descending.

- **get_insider_ownership** — Retrieves insider ownership statements for a company: what officers, directors, and 10% owners actually HOLD (common shares, options, RSUs), sourced from SEC Form 3 (an insider's initial statement of ownership) and Form 5 (the annual statement). Complements get_insider_trades, which covers the buys and sells in between: trades are the events, ownership statements are the state. Positions are returned as reported per filing, newest first.

- **get_insider_trades** — Retrieves insider trading transactions for a company, including purchases, sales, and other transactions by company officers, directors, and major shareholders. Useful for tracking insider sentiment and ownership changes.

- **get_institutional_holdings** — Retrieves SEC 13F institutional holdings sourced directly from EDGAR. Query by filer_cik (what positions a filer holds) OR by ticker (which institutional filers hold this security) — exactly one is required. When no report_period filter is supplied, returns the latest available quarter for the filer or ticker. Ticker-mode rows include filer_cik and filer_name per position; filer-mode rows omit those (the filer is already implied by the query).

- **get_institutional_investors** — Lists institutional investors (SEC 13F filers) with their CIK and most recent reported name. Optionally filter by case-insensitive name prefix. Use this to discover the filer_cik to pass to get_institutional_holdings.

- **get_interest_rates** — Retrieves the latest policy interest rates from major central banks (e.g., FED, ECB, BOE, BOJ). Returns a snapshot of each bank's current rate — no parameters required. Prefer get_macro_data with dataset='interest_rates', which also serves rate history.

- **get_kpi_guidance** — Retrieves forward-looking KPI guidance items issued by company management in earnings releases and SEC filings. Filter by ticker, period (quarterly/annual), metric name, and date range.

- **get_kpi_metrics** — Retrieves historical KPI taxonomy metrics extracted from SEC filings for a company (e.g., subscriber counts, ARPU, units sold). Filter by ticker, period (quarterly/annual), metric name, and date range.

- **get_kpi_non_gaap** — Retrieves non-GAAP KPIs reported by a company (e.g., Adjusted EBITDA, Free Cash Flow as defined by the company). Filter by ticker, period (quarterly/annual), metric name, and date range.

- **get_macro_data** — Retrieves macroeconomic datasets. dataset='yield_curve' returns the daily US Treasury par yield curve: one object per business day with the keys date, 1_month, 1_5_month, 2_month, 3_month, 4_month, 6_month, 1_year, 2_year, 3_year, 5_year, 7_year, 10_year, 20_year, 30_year, values in percent. A tenor is null when it was not published that day (for example the 30-year from 2002 to 2006); null is not zero. Omit both dates to get the latest curve as a single object. Give start_date and/or end_date to get history as an array, newest first (default window: the trailing year). dataset='interest_rates' returns central bank policy rates as a daily series: omit both dates for every bank's newest published rate as an array (one row per bank with the date it is in effect), or give dates plus a bank code (e.g. bank='FED') for that bank's history, one row per calendar day, newest first, 10 rows per page with next_page_url (default window the trailing five years). Each row has bank, name, date, and rate (percent; for the Federal Reserve the midpoint of the target range). The source publishes the daily series weekly, so the newest day is two to nine days behind. dataset='inflation' returns US CPI and the PCE price index: omit both dates for the latest month of all fourteen series (CPI comes out mid-month, PCE about two weeks later, so the two families can show different months), or give dates plus series (e.g. series='cpi_all_sa' or series='pce_core_sa') for that series' history. Each row has date (the reference month, first day), value (index level: 1982-84=100 for CPI, 2017=100 for PCE), change_1m_pct and change_12m_pct (percent, 1 decimal; null when the comparison month was not published, e.g. October 2025 for CPI). The headline inflation rate is change_12m_pct of cpi_all_nsa; the Fed's preferred measure is change_12m_pct of pce_core_sa. dataset='labor' returns the US labor market, i.e. the jobs report (nonfarm payrolls, unemployment rate, participation, hourly earnings), JOLTS job openings, hires, and quits, and weekly jobless claims: omit both dates for the latest print of all 24 series (monthly series on their latest month, weekly jobless claims on their latest week), or give dates plus series (e.g. series='payrolls_sa') for that series' history. Each row has date (the reference period: the first day of the month for monthly series, the week-ending Saturday for weekly), value (in the series' units: thousands of persons, percent, dollars per hour, persons), change_prior and change_year (value minus the prior period and minus the period one year back, same units), and change_year_pct (percent, 1 decimal; null for rates such as unemployment_rate_sa, whose change is in points; null when the comparison period was not published). dataset='gpu_prices' returns the daily GPU rental price index, the market price of an hour of H100, H200, B200, or B300 compute in US dollars per GPU hour: omit both dates for today's price of all four models (refreshed hourly), or give dates plus series (e.g. series='h100') for that model's daily history (from August 2026; default window the trailing 90 days). Each row has date (UTC day), value (USD per GPU hour), stability_band (the spread across providers, same units), change_1d (dollars), change_1d_pct, change_7d_pct, change_30d_pct (percent, 2 decimals; null when the comparison day has no value), and as_of (when today's value was last refreshed). The response carries an attribution for the source (the Computable GPU Index); keep it when showing the data. Useful for the 10-year yield, the 2s10s spread, policy rates, discount rates, real returns, payrolls, the unemployment rate, wage growth, weekly jobless claims, and the cost of AI compute.

- **get_news** — Fetches recent news articles for a specific company or the broad market. Pass a ticker for company-specific news. Call with no arguments for the latest market-moving news, covering AI, macro, rates, earnings, geopolitics, war, energy, crypto, IPOs, housing, and other market-wide topics. Also useful when trying to explain broad price moves — omit the ticker to check for market-wide catalysts.

- **get_segmented_financials** — Retrieves segment breakdowns from all three financial statement types (income statement, balance sheet, cash flow) in a single call. Returns revenue, operating income, and depreciation by product/segment; assets, goodwill, and long-lived assets by segment; and capital expenditure by segment. Essential for sum-of-the-parts valuation and segment-level analysis.

- **get_stock_price** — Fetches the most recent price snapshot for a specific stock, including the latest price, trading volume, and other open, high, low, and close price data.

- **get_stock_prices** — Retrieves historical price data for a stock over a specified date range, including open, high, low, close prices, and volume.

- **list_filing_item_types** — Provides a list of all available item names that can be extracted from 10-K, 10-Q, and 8-K reports, grouped by filing type.

- **list_stock_screener_filters** — Retrieves all available filter fields and operators for the stock screener, grouped by category (income statement, balance sheet, cash flow statement, financial metrics, and company attributes like sector and industry). Use this to discover which fields and operators you can use with the screen_stocks tool.

- **screen_stocks** — Screens and filters stocks by financial metrics, valuation ratios, and company attributes. Combine multiple filter conditions to find stocks matching your investment criteria (e.g., revenue > $1B and P/E ratio < 20). Use list_stock_screener_filters first to see all available fields and operators.

## Longbridge — 134 tools

- **account_balance** — Get account cash balance and asset summary. Returns a top-level array of {currency, total_cash, net_assets, buy_power, max_finance_amount, remaining_finance_amount, risk_level, margin_call, init_margin, maintenance_margin, cash_infos[]{currency, available_cash, withdraw_cash, frozen_cash, settling_cash}}. Filter by currency (e.g. "USD", "HKD"). US accounts get a US-specific variant: the same array, one entry for the account currency with currency, total_cash, net_assets, buy_power, maintenance_margin and cash_infos[] (settled_cash in place of settling_cash); max_finance_amount, remaining_finance_amount, risk_level, margin_call and init_margin are absent; US buying-power and margin detail is under us{buy_limit_info, margin_status, cash_list[]}.

- **ah_premium** — Get A/H share premium history for a dual-listed HK symbol (e.g. 939.HK). Returns {klines[]{timestamp, aprice, apreclose, hprice, hpreclose, currency_rate, ahpremium_rate}}; ahpremium_rate is a ratio (-0.27 = H trades 27% below A).

- **ah_premium_intraday** — Get today's minute-by-minute A/H share premium for a dual-listed HK symbol (e.g. 939.HK). Returns {klines[]{timestamp, aprice, hprice, ahpremium_rate, currency_rate}, apreclose, hpreclose}; ahpremium_rate is a ratio.

- **alert_add** — Add a price alert. condition: price_rise/price_fall (absolute price) or percent_rise/percent_fall (relative %). frequency: once/daily/every. Returns created alert object.

- **alert_delete** — Delete a price alert by alert_id (numeric string from alert_list). Returns upstream API response on success; errors if alert_id is invalid.

- **alert_disable** — Disable a price alert by alert_id. Returns {alert_id, enabled: false} on success. Use alert_list to find the numeric alert_id.

- **alert_enable** — Enable a price alert by alert_id. Returns {alert_id, enabled: true} on success. Use alert_list to find the numeric alert_id.

- **alert_list** — Get all configured price alerts. Returns {lists[]{symbol, name, market, price, chg, indicators[]{id, indicator_id, text (the condition, e.g. "价格涨到 250"), value_map{price}, frequency, enabled, state}}}.

- **anomaly** — Get market anomaly alerts (unusual price/volume changes). market: HK/US/CN/SG. symbol: optional, filter to a specific stock. count: results per page (default 50, max 100). Returns {changes[]{id, symbol, name, alert_type, alert_name (e.g. rapid rise), alert_time, change_values[] (display strings, e.g. "+2.04%"), emotion (1 bullish, 2 bearish)}, all_off}.

- **broker_holding** — Get top broker holding changes for a symbol (HK stocks only; sourced from HKEX CCASS participant disclosure). The period argument picks the window: last 1 (default), 5, 20 or 60 days. Returns {updated_at (disclosure date, e.g. "2026.01.02"), buy[], sell[]}: the participants with the largest net increase / decrease over the window, each {name, parti_number, chg (net change in shares held, negative for sellers), strong}. Pass parti_number to broker_holding_daily for one participant's daily history. Non-HK symbols return empty arrays.

- **broker_holding_daily** — Get daily holding history for a specific broker (by broker_id) in a symbol (HK stocks only; sourced from HKEX CCASS participant disclosure). Returns {list[]{date (e.g. "2026.10.15"), holding (shares held), chg (change vs the prior day), ratio (fraction of issued shares)}}, newest first.

- **broker_holding_detail** — Get the broker holding list for a symbol, largest holding first (50 brokers by default; set count for more; HK stocks only; sourced from HKEX CCASS participant disclosure). Returns {updated_at (disclosure date, e.g. "2026.01.02"), list[]{name, parti_number, shares{value, chg_1, chg_5, chg_20, chg_60}, ratio{value, chg_1, chg_5, chg_20, chg_60}, strong}}: shares held and the fraction of shares held (ratio, e.g. "0.0108"), each with its change over the last 1/5/20/60 days. Non-HK symbols return an empty list.

- **brokers** — Get broker queue (HK stocks only). Returns {bid_brokers[], ask_brokers[]}, best price first, each level {position (1-based), broker_ids[]}. Arrays can be empty. Map broker IDs to names via participants.

- **business_segments** — Get current-period business segment revenue breakdown for a symbol. Returns {total, currency, report_txt, fp_start, fp_end, rpt_date, business: [{id, name, value, percent, yoy}], regionals: [same shape; may be empty]}.

- **business_segments_history** — Get historical business segment revenue trends (by period and category). Returns historical[].{date, total, currency, business[{name,percent,value}], regionals[{name,percent,value}]}.

- **calc_indexes** — Calculate financial indexes for symbols. Pass symbols, and optionally indexes (e.g. ["PeTtmRatio","PbRatio","LastDone","TurnoverRate"]). When indexes is omitted or empty, defaults to ["LastDone","ChangeValue","ChangeRate","Volume","PeTtmRatio","PbRatio","DividendRatioTtm","TurnoverRate","TotalMarketValue"]. Returns per-symbol index values. When Greek indexes (Delta, Gamma, Theta, Vega, Rho) are requested, they are normalized: theta is the per-day value (one day's time decay), vega is the price change per 1% change in implied volatility, and rho is the price change per 1% change in the risk-free interest rate.

- **candlesticks** — Get candlestick data (OHLCV). Only symbol is required; period defaults to day, count to 100 (max 1000), forward_adjust to false, trade_sessions to all. period: 1m/5m/15m/30m/60m/day/week/month/year. trade_sessions: intraday/all. If the account's entitlement caps out below the requested count, this returns as many candles as allowed instead of erroring — check the returned array length against count if an exact number matters.

- **capital_distribution** — Get capital distribution for a symbol. Returns {timestamp, capital_in{large, medium, small}, capital_out{large, medium, small}, data_available} (decimal strings in settlement currency). data_available is false for symbols with no capital-flow data (e.g. indices) — the other fields are still present but meaningless zeros in that case.

- **capital_flow** — Get capital inflow time series for the symbol (same-day data). Returns a top-level array of {timestamp, inflow}.

- **cash_flow** — Get cash flow records (deposits, withdrawals, dividends). Returns a top-level array of {transaction_flow_name, direction (In/Out), business_type, balance (the amount moved), currency, business_time, symbol, description}. start_at/end_at: RFC3339 or yyyy-mm-dd. direction and business_type are unreliable upstream (always Out / 0); use the sign of balance. US accounts get a US-specific variant: the same array without business_type (see biz_code, biz_code_name); balance is signed (0 when no cash moved, e.g. crypto transfers) and direction comes from its sign, or the quantity's when it is 0 (Unknown when both are 0); plus quantity, quantity_description, ref_no, equity_type; at most 2000 records, so getting 2000 means narrow the range. Newest first.

- **company** — Get company overview. Returns a flat object of strings: name, company_name, ticker, market, sector, category, region, founded, listing_date, employees, chairman, manager, website, address, profile, … US accounts querying a .US symbol get a US-specific variant {intro, market_cap, ccy_symbol, top_rank_tags[], share_list[], detail_url}. The region is detected from the account automatically.

- **consensus** — Get financial consensus estimates for upcoming periods. Returns {currency, current_period, opt_periods, current_index, list: [{fiscal_year, fiscal_period, period_text, details: [{key (revenue/ebit/net_income/normalized_net_income/eps/normalized_eps), estimate, actual, is_released, comp, comp_value, comp_desc}]}], legend: {<key>: {name, description}}}. US accounts querying a .US symbol get a US-specific variant (adds ai_summary, with different per-period fields). The region is detected from the account automatically.

- **constituent** — Get the constituents of an index or the asset allocation of an ETF. For an index (e.g. HSI.HK, .DJI.US) returns {total, rise_num, fall_num, flat_num, stocks[]{symbol, name, last_done, prev_close, chg, inflow, balance, amount, total_shares, circulating_shares, tags[]}}. For an ETF (e.g. QQQ.US, 2800.HK) returns the asset allocation as info[] grouped by asset_type: 1=Holdings (top constituents with code, symbol, holding_detail), 2=Regional (country/region breakdown), 3=AssetClass (stock/bond/cash etc.), 4=Industry (sector breakdown). Each group has report_date and lists[]{name, position_ratio, name_locales_map}; Holdings groups additionally include code, symbol and holding_detail{industry_name, index_name, holding_type_name}.

- **corp_action** — Get corporate events for a symbol: earnings dates, dividends, splits, buybacks, name changes, etc. Returns items[]{id, date (YYYYMMDD), date_type, act_type, act_desc, action (kind code, e.g. ReportDate, DividendExDate), recent, is_delay, delay_content, live}; date_type / act_type / act_desc are localized text, and live is the linked broadcast (e.g. an earnings call: {name, started_at, symbols[]}) or null.

- **create_watchlist_group** — Create a new watchlist group. Returns the created group {id, name}. Optionally pass securities (e.g. ["AAPL.US", "700.HK"]) to pre-populate.

- **delete_watchlist_group** — Delete a watchlist group by id (numeric). Set purge=true to also remove its securities from all other groups. Returns upstream API response.

- **depth** — Get order book depth for a symbol. Returns {bids[]{position, price, volume, order_num}, asks[]{position, price, volume, order_num}}. Up to 10 price levels.

- **dividend** — Get dividend history for the symbol. Returns {total, list: [{id, desc, counter_id, record_date, ex_date, payment_date}]}; the amount is only in the desc text. US accounts querying a .US symbol get a US-specific variant (e.g. dividend_yield_ttm is a percent value: 0.34 means 0.34%). The region is detected from the account automatically.

- **dividend_detail** — Get detailed dividend distribution schemes. Returns list[]{desc, record_date, ex_date, payment_date}, newest first. desc is the localized human-readable scheme (amount and currency in text, may contain a newline); there are no separate cash/stock amount fields.

- **estimate_max_purchase_quantity** — Estimate maximum buy/sell quantity for a symbol. Returns {cash_max_qty, margin_max_qty} (decimal strings). Only symbol is required; side (case-insensitive Buy/Sell) defaults to Buy, order_type (case-insensitive) defaults to LO, and price is optional.

- **exchange_rate** — Get Longbridge's account-conversion exchange rates for all supported currencies (the rates used to value assets in an account's currency). Returns {exchanges[]{base_currency, other_currency, average_rate}}: average_rate is the value of 1 other_currency in base_currency (e.g. base USD, other HKD, 0.12743 = 1 HKD is 0.12743 USD). US accounts get a US-specific variant: the US account's rates in the same shape, one row per pair (the reference rate, else am) with spec_key naming the rate type. For public market reference rates or history, use fx_rate.

- **executive** — Get company executive and board member information. Returns professional_list[] (one entry per symbol) {symbol, total, forward_url, professionals[]{id, name, title, biography, wiki_url}}.

- **filings** — Get regulatory filings (8-K, 10-Q, 10-K, etc.) for the symbol. Returns a top-level array of {id, title, description, file_name, file_urls[], publish_at}.

- **finance_calendar** — Finance calendar by category: report (earnings) / dividend / split / ipo / macrodata (CPI, NFP, rates) / closed (holidays). start and end (YYYY-MM-DD) are optional, default today plus 7 days. Pass market (e.g. US) whenever the user cares about one market: an unfiltered week of earnings across all markets is several hundred KB and gets truncated. Returns {list: [{date, infos: [{symbol, counter_name, market, content, type, date, datetime, date_type, data_kv: [{type, value, value_raw}], star (macrodata), currency, …}]}]}, one entry per day.

- **financial_report** — Get financial reports (income statement, balance sheet, cash flow). kind: IS/BS/CF/ALL. report_type: af (annual), saf (semi-annual), q1/q2/q3, qf (quarterly full). Each line item carries its newest 8 periods by default; set periods for more. Returns {report, list: {i_s|b_s|c_f: {indicators: [{title, currency, has_yoy, accounts: [{name, field, percent, tip, industry_ranking, values: [{year, period, fp_end, value, yoy, ratio}]}]}]}}}. US accounts querying a .US symbol without kind are routed to a US-specific overview endpoint (is_list/bs_list/cf_list); passing kind explicitly always uses the generic path.

- **financial_report_latest** — Get the latest financial report summary for a security. Returns {report (period code, e.g. "2026.H1"), report_txt (period label), currency, indicators[]{field_name, indicator_name, indicator_value, yoy}}, one indicator per key metric (revenue, net profit, total assets, total debts, EPS, BPS, ROE, net profit margin), identified by field_name. Ratio values carry a "%" suffix; yoy is a fraction (0.1627 = +16.27%), empty for ratios.

- **financial_report_snapshot** — Get financial report snapshot: report_desc (text summary), fo_revenue/fo_ebit/fo_eps (actual vs forecast with yoy/cmp), fr_* financial ratios (ROE, margins, assets, cash flow). report: qf/saf/af. Returns a flat object: name, ticker, market, currency, report, fiscal_year, fiscal_period, fp_start, fp_end, opt_reports, report_desc, fo_* as {value, yoy, …}, and fr_* either a plain string (ratios) or {value, yoy} (amounts).

- **financial_statement** — Get financial statements (income statement, balance sheet, or cash flow) for a security. kind: IS/BS/CF/ALL. report: af (annual, default), saf (semi-annual), qf (quarterly full), q1/q2/q3. Returns {report, currency, empty_fields, list[]}: list[] holds the reporting periods, most recent first, each with its fields[] line items; it can be empty when no data is available. US accounts querying a .US symbol are routed to a US-specific statement endpoint (same report vocabulary as the generic path): a single kind returns the same envelope, while kind=ALL/default fans out to IS+BS+CF and returns {income_statement, balance_sheet, cash_flow}, each holding that envelope, since the backend doesn't support a combined request; all other symbol/account combinations use the generic path.

- **forecast_eps** — Get EPS forecast history. Returns items[], one analyst consensus snapshot per forecast window: {forecast_start_date, forecast_end_date, forecast_eps_mean, forecast_eps_median, forecast_eps_lowest, forecast_eps_highest, institution_total, institution_up, institution_down}. Forecasts only, no actual EPS or surprise; use consensus for estimate-vs-actual.

- **fund_holder** — Get funds and ETFs that hold a given symbol. Returns lists[]{symbol (the fund's symbol), name, currency, position_ratio (weight of the queried stock in the fund, in percent), report_date}.

- **fund_positions** — Get current fund positions. Returns list[].fund_info[]{counter_id, symbol_name, currency, holding_units, current_net_asset_value, cost_net_asset_value, net_asset_value_day}. counter_id is the fund id (e.g. UT/FD/HK0000384492); its last /-separated segment is the ISIN.

- **fx_rate** — Public ECB foreign-exchange reference rates (via Frankfurter): one rate per business day, not live or tradable, no bid/ask. Latest by default, or a historical date / daily series. Returns {base, date, rates{CODE: rate}, source}; a series keys rates by yyyy-mm-dd. rate is CODE per 1 base (base USD, HKD 7.8472), the opposite direction to exchange_rate; for a cross rate, set base instead of dividing. Cite date with the rate: it is the publication day, possibly before today.

- **history_candlesticks_by_date** — Get historical candlestick data by date range. Only symbol is required (with no start/end, the most recent 100 bars are returned — pass start/end for a specific range); period defaults to day (1m/5m/15m/30m/60m/day/week/month/year), forward_adjust to false, trade_sessions to all. Returns a top-level array of {timestamp, open, high, low, close, volume, turnover, trade_session}.

- **history_candlesticks_by_offset** — Get historical candlestick data by offset from a reference time. Only symbol is required; period defaults to day (1m/5m/15m/30m/60m/day/week/month/year), count to 100, forward_adjust/forward to false, trade_sessions to all. If the account's entitlement caps out below the requested count, this returns as many candles as allowed instead of erroring — check the returned array length against count if an exact number matters.

- **history_executions** — Get every trade execution (fill) in a date range, auto-paginated to return the complete set (never truncated at the 1000-per-page cap). Returns a top-level array of {order_id, trade_id, symbol, side, quantity, price, trade_done_at}; trade_id is the stable dedupe key; side is "Unknown" when unresolved (US: the order could not be resolved; call order_detail(order_id) for it). start_at/end_at in RFC3339, or a bare yyyy-mm-dd read as a UTC day (US accounts: a New York EST/EDT day, matching history_orders). AP accounts are filtered by execution time (trade_done_at). US accounts read v1 history, which is not filtered by execution time and can lag across days near the range edges: widen the range by a day each side and filter on trade_done_at; side is filled from the account's orders in the range, then from order detail.

- **history_market_temperature** — Get historical market temperature time series for a market and date range (at most 3 years per call). Returns {type, list[]{temperature, valuation, sentiment, timestamp}}.

- **history_orders** — Get historical orders between dates (AP accounts: excludes today). Returns orders[]{order_id, symbol, side, status, quantity, price, submitted_at}. start_at/end_at in RFC3339. US accounts get a US-specific variant: the same array and field names as today_orders' US variant; a bare yyyy-mm-dd start_at/end_at is read as a New York (EST/EDT) day rather than UTC; the range is applied as given, so it includes today's orders when it covers today, and all orders in it (up to 500) are returned unless us_page/us_limit pick one page. today_orders' US window opens at 20:00 ET on the previous day, so orders placed from 20:00 ET yesterday appear in both a range ending yesterday and today_orders; dedupe by order_id when combining them.

- **industry_peers** — Hierarchical sub-sector tree for an industry group. Accepts an industry symbol from industry_rank (e.g. IN00258.US). Returns chain{name, symbol, code, industry_id, sharelist_id, stock_num, chg, ytd_chg, next[{...}]} and top{name, industry_id}. Each node shows stock count, daily change, and YTD change.

- **industry_rank** — Industry ranking list by market (US/HK/CN/SG) and indicator (0=领涨/1=今日走势/2=人气/3=市值/4=营收/5=营收增长率/6=净利润/7=净利润增长率). sort_type: 0=单级 1=多层. Returns items[]{symbol(IN00258.US), name, chg, lists[]}. Pass a row's symbol directly to industry_peers.

- **industry_valuation** — Get industry valuation comparison for peers in the same industry. Returns list[]{symbol, name, market, currency, price_close, market_value, pe, pb, ps, div_yld (dividend yield, %), roe, roa, net_margin, eps, bps, dps, div_payout_ratio, net_income, …, history[]{date, pe, pb, ps}}.

- **industry_valuation_dist** — Get industry PE/PB/PS valuation distribution to see where the stock sits in its sector. Returns {pe, pb, ps}, each {low, median, high, value (the stock's current value), ranking (its percentile within the industry, 0-1), rank_index, rank_total}.

- **institution_rating** — Get institution rating summary. Returns analyst{evaluate{buy, over, hold, under, sell, no_opinion, total}, target{highest_price, lowest_price, prev_close}, industry_name, industry_rank, industry_total} and instratings{recommend (consensus recommendation), target (consensus mean target price), change (upside of target vs. the current price, %), updated_at}. If one of the two upstream calls fails, the other half is still returned with warnings[] naming what is missing.

- **institution_rating_detail** — Get historical rating distribution and consensus target price history. Returns evaluate.list[]{date, strong_buy, buy, hold, under, sell} (rating counts per snapshot), target{updated_at, prediction_accuracy, list[]{date, timestamp, price, avg_target, min_target, max_target, meet}} (consensus target range vs. share price), and ccy_symbol. Aggregated across analysts; no per-firm or per-analyst rows.

- **institution_rating_history** — Get institution rating history. Returns target_history[]{timestamp, close, high_target_price, low_target_price} (analyst target range vs. close) and evaluate_history[]{start_date, end_date, buy, over, hold, under, sell, no_opinion} (rating counts; consecutive identical distributions are merged into one span). Times are unix epoch seconds as strings. Aggregated counts, no per-firm rating or target changes.

- **institution_rating_industry_rank** — Get peers ranked by institution analyst ratings in the same industry. Returns {industry_name, industry_rank (the queried stock's rank), industry_total, industry_mean, industry_median, items[]{rank, symbol, name, buy, over, hold, under, sell, no_opinion, total}}. Paginated.

- **institutional_views** — Get monthly institutional rating distribution timeline. Returns {elist[]{date, buy, over (outperform), hold, under (underperform), sell, no_opinion, total}, tlist[]{date, close, high_price, low_price}}, oldest first, for trend analysis.

- **intraday** — Get intraday minute-by-minute price/volume data. trade_sessions: "intraday" (default, regular hours) or "all" (include pre-market and post-market). Returns a top-level array of {timestamp, price, avg_price, volume, turnover}.

- **invest_relation** — Get investor relations events and announcements.

- **ipo_calendar** — Show the IPO calendar. Returns {sub_num, win_num, preipo_num, ipo_num, timestamp, list[]{symbol, code, name, sub_date, sub_end_date, result_date, ipo_date, mart_date, state, state_stage, tags}} for upcoming and recent IPOs.

- **ipo_detail** — Show IPO detail for a symbol. Returns profile (business overview), timeline[]{event, date}, subscription eligibility, pricing_range, lot_size, allotment_rules.

- **ipo_listed** — List recently listed IPO stocks (HK+US). Returns {hk, us}, each {total, list[]{symbol, code, name, description, ipo_date, listed_day, issue_price, prev_close, last_done, ipo_change, amount, …}}.

- **ipo_subscriptions** — List IPO stocks in subscription/pre-filing stage (HK+US). Returns {hk, us}, each {list[]{symbol, code, name, issue_price, entrance_fee, min_sub_num, sub_end_date, remaining_day, share_planned, state, …}}.

- **macrodata** — Get historical observations for one macro-economic indicator. Use indicator_code from macrodata_indicators; start_date/end_date accept YYYY-MM-DD. Supports offset/limit pagination. Returns {info: {indicator_code, name, country, describe, importance, periodicity}, data: [{period, release_at, actual_value, forecast_value, previous_value, unit}], count}.

- **macrodata_indicators** — List macro-economic indicators. Filter by keyword and country (US/CN/HK/EU/JP/SG). Use the returned indicator_code with macrodata. Supports offset/limit pagination. Returns {list: [{indicator_code, name, country, importance, periodicity}], count}.

- **margin_ratio** — Get margin ratio for a symbol. Returns {im_factor (initial margin), mm_factor (maintenance margin), fm_factor (forced liquidation)} as decimal strings.

- **market_status** — Get current market trading status for all markets. Returns market_time[]{market, trade_status (Trading/Closed/Mid-Day Break/Pre-Market/Post-Market/Overnight), timestamp}.

- **market_temperature** — Get current market sentiment temperature. Returns {temperature (0-100), description, valuation (0-100), sentiment (0-100), timestamp}. market: HK/US/CN/SG.

- **news** — Get latest news articles for a symbol, newest first (20 by default; set count for more). Returns a top-level array (no wrapper object) of {id, title, description, url, published_at, comments_count, likes_count, shares_count}.

- **news_detail** — Get one news article's full detail by id (from news/news_search). Returns {id, title, description, body (Markdown), url, author{member_id, name}, images[], comments_count, likes_count, shares_count, published_at, tickers[]}.

- **news_search** — Search news articles by keyword. Returns an array of {id, title, excerpt, source_name, time (RFC3339), url}, most relevant first.

- **now** — Get current UTC time as an RFC3339 string (e.g. "2025-01-15T08:30:00Z"). Use to determine current date/time before making date-based queries. Returns a bare JSON string, not an object.

- **operating** — Get company operating reviews by reporting period (HK stocks only; other markets return an empty list). Returns list[], newest first (8 reports by default; set count for more), of {id, report (e.g. saf), title, txt (management commentary / operating review), latest, financial{currency, indicators[]{field_name, indicator_name, indicator_value (display string with localized units), yoy (%)}}}.

- **option_chain_expiry_date_list** — Get option chain expiry dates for a symbol (e.g. AAPL.US). Returns a top-level array of "yyyy-mm-dd" strings. Use with option_chain_info_by_date to get the contracts for one of those dates.

- **option_chain_info_by_date** — Get the option contract list for one expiry date. Returns one entry per contract (calls and puts are NOT paired): {symbol, expiry_date, strike_price, direction (Call/Put), option_type (Monthly/Weekly/Quarterly), standard_attr (Normal/Old), days_to_expiry}. Filter on `direction` to split calls from puts, and pass standard_only=true to drop the legacy post-corporate-action contracts. Carries no prices or Greeks — pass the symbols to option_quote for those.

- **option_quote** — Get option quotes (max 500 symbols). Symbols must be option contract symbols (e.g. "AAPL230317P160000.US"), NOT plain stock symbols — obtain valid ones from the symbol field of each option_chain_info_by_date contract. Returns last_done, prev_close, open, high, low, volume, turnover, implied_volatility, delta, gamma, theta, vega, rho, open_interest per symbol. Greeks are normalized: theta is the per-day value (one day's time decay), vega is the price change per 1% change in implied volatility, and rho is the price change per 1% change in the risk-free interest rate.

- **option_volume** — Get real-time option call/put volume stats for a US stock. Returns {c, p}: today's total call (c) and put (p) contract volume, as strings.

- **option_volume_daily** — Get daily historical option stats for a US stock. Returns {stats[]{symbol, timestamp, total_volume, total_call_volume, total_put_volume, put_call_volume_ratio, total_open_interest, total_call_open_interest, total_put_open_interest, put_call_open_interest_ratio}}.

- **order_detail** — Get detailed information about a specific order. Returns {order_id, symbol, status, side, order_type, quantity, price, executed_quantity, executed_price, submitted_at, time_in_force, msg, attached_orders[]}, where attached_orders[] holds the order's take-profit/stop-loss legs with their own order IDs. To look up such a leg by its own ID instead, pass it as order_id with is_attached=true: the response is then that leg, with charge_detail null. US accounts get a US-specific variant: the same top-level fields and history[], without time_in_force, tag, expire_date, outside_rth or the fee/deduction fields (raw US codes in us_time_in_force, us_tag; plus done_at, gtd, security_type, us_attached_orders, us_charge_detail); is_attached is ignored.

- **participants** — Get HK market participant broker information. Returns a top-level array of {broker_ids[], name_en, name_cn}. Use broker_ids to interpret broker queue data.

- **profit_analysis** — Get portfolio profit and loss analysis summary. start/end: optional date range in yyyy-mm-dd format. Both must be provided together — passing only one returns empty results.

- **profit_analysis_detail** — Get detailed profit and loss analysis for a specific symbol. start/end: optional date range in yyyy-mm-dd format. Both must be provided together — passing only one returns empty results.

- **quant_run** — Run a quant indicator script against historical K-line data on the server. Executes the script server-side and returns the computed indicator/plot values as JSON. Periods: 1m, 5m, 15m, 30m, 1h, day, week, month, year (default: day). The optional input parameter accepts a JSON array matching the order of input.*() calls in the script, e.g. "[14,2.0]".

- **quote** — Get latest price quotes. Returns a top-level array, one entry per symbol: symbol, last_done, prev_close, open, high, low, volume, turnover, trade_status, timestamp, plus pre_market / post_market / overnight objects {last_done, prev_close, high, low, volume, turnover, timestamp} when that session has data. No change fields: compute change from last_done and prev_close.

- **rank_categories** — Get rank tab category configurations for the popularity leaderboard. Returns first_tags[]{key, name, second_tags[]{key, name, market}}. Pass a second_tags key (e.g. `hot_all-us`) to rank_list.

- **rank_list** — Get ranked stock list by leaderboard tab key. key: from rank_categories second_tags[].key (e.g. "hot_all-us", "hot_up-hk", "trade_heat-us"). market: inferred from key suffix (-us/-hk) or pass explicitly. size: results (default 20). Returns lists[]{symbol, name, last_done, chg(decimal), inflow, market_cap, pre_post_price, pre_post_chg, amplitude, turnover_rate, volume_rate, five_day_chg, ten_day_chg, twenty_day_chg, this_year_chg, industry}, updated_at.

- **screener_indicators** — Get all available screener indicator keys with their units. Technical indicators carry tech_values {tech_key: [{value, label}]} listing the accepted values (e.g. macd_day: period [day], category [goldenfork, deadcross, upzero, downzero]); pass one value per tech_key as tech_values in screener_search. Optional symbol (e.g. AAPL.US) narrows to stock-specific indicators. Returns groups[]{group_type, group_name, indicators[]{id, key, name, unit, places, category, tech_values{tech_key: [{value, label}]}}}.

- **screener_recommend_strategies** — List platform-preset screener strategies. market: US|HK|CN|SG (default: US). Returns strategys[]{id, name, description, market, three_months_chg, risk}. Pass id to screener_search strategy_id to run, or screener_strategy to inspect filter conditions.

- **screener_search** — Screen stocks. market: US|HK|CN|SG (Mode B required; Mode A uses strategy's market). Mode A: strategy_id from screener_recommend_strategies — auto-runs saved strategy. Mode B: conditions=[{"key":"KEY","min":"10","max":"50","tech_values":{}},...]. extra_returns=["key",...] adds display-only columns. sort_by_key: key name to sort by; sort_order: asc|desc (default desc). page: 0-based (default 0). Returns {total, items[]{symbol, name, counter_id, indicators[]{key, value}}, legend{<key>: {name, unit}}}. Fundamental keys: pettm pbmrq roe roa netmargin salesgrowthyoy netincomegrowthyoy marketcap(亿) circulating_marketcap(亿) prevclose prevchg(%) divyld la epsttm netincome(亿) sales(亿) turnover_rate balance(万). Technical keys (call screener_indicators for tech_values schema): macd_day/week rsi_day/week kdj_day/week boll_day/week.

- **screener_strategy** — Inspect a screener strategy's filter conditions before running it. Returns market, filter{filters[]{key, min, max, tech_values}}. Use screener_search strategy_id to execute the strategy.

- **screener_user_strategies** — List the current user's saved screener strategies. market: US|HK|CN|SG (default: US). Returns strategys[]{id, name, description, market, three_months_chg, risk}. Pass id to screener_search strategy_id to run, or screener_strategy to inspect conditions.

- **security_facts** — List a security's fact (catalyst) events — anomaly detections, factor readings, data sources and natural-language summaries — filtered by time range and count. Facts are what strategies react to: a signal names its trigger in key_fact_id. Returns {facts: [{fact_id, fact_type, direction, occur_time, symbols_info: [{symbol, security_name}], factors: [{name, factor_groups, long_short_direction, trigger_condition, anomaly_detection}], data_source: [{source_name, type, url, icon}], nl_info: {title, sub_title, summary, invest_anal, eli_explain}}]}.

- **security_list** — Get security list for a market. Supports market: US, HK, CN, SG. category: "Overnight" (default). page: 1-based page number (default 1). count: records per page (default 50). Returns {total, page, count, items[]{symbol, name_en, name_cn}}.

- **shareholder** — Get major shareholders of a symbol with their latest reported holding change. Returns shareholder_list[]{shareholder_name, percent_of_shares, shares_changed (negative = reduced), report_date, stocks[]{symbol, market, code, chg}}; stocks[] lists securities linked to the holder and is often empty.

- **shareholder_detail** — Get a single shareholder's holding and trade history. Requires object_id from shareholder_top. Returns name, owner_source (Company/Institution/Person/Insider), tradings[]{period, accum_buy, accum_sell, net_buy, trading_details[]{trading_date, trading_type, trading_shares, trading_price, security_type, filing_date}}, holding_summary, holding_periods, trading_periods. Note: trading_details[] is empty for institutional (13F) holders — it is only populated for insider/individual filers (Form 4).

- **shareholder_top** — Get Top 20 major shareholders (institutions, individuals, insiders) across reporting periods, newest first (4 periods by default; set periods for more). Returns info[]{period, share_holders[]{object_id, name, title, shares_held, percent_shares_held, shares_changed, filing_date}}. Use object_id with shareholder_detail to drill into a holder's full trade history.

- **sharelist_add** — Add securities to a community sharelist by id. Provide symbols (e.g. ["AAPL.US", "700.HK"]) to add. Returns upstream API response.

- **sharelist_create** — Create a new community sharelist with a name and optional description. Returns the created sharelist object including its id, name, and description.

- **sharelist_delete** — Delete a community sharelist by id (own lists only; subscribed lists cannot be deleted). Returns upstream API response on success.

- **sharelist_detail** — Get community sharelist detail by id. Returns {sharelist{id, name, description, stocks_count, subscribers_count, chg, this_year_chg, creator, stocks[]{symbol, name, market, code, intro, …}}, scopes{self, subscription, official, industry}, stock_topics, group}. Constituents carry no prices: pass their symbols to quote.

- **sharelist_list** — List user's own and subscribed community sharelists. Returns {sharelists[] (the user's own lists), subscribed_sharelists[] (lists the user subscribes to)}, each item {id, name, description, stocks_count, subscribers_count, subscribed, chg, this_year_chg, created_at, stocks, …}.

- **sharelist_popular** — Get popular/trending community sharelists. Returns {sharelists[]{id, name, description, stocks_count, subscribers_count, chg, this_year_chg, creator{id, name, …}, stocks, …}} sorted by popularity.

- **sharelist_remove** — Remove securities from a community sharelist by id. Provide symbols to remove. Returns upstream API response on success.

- **sharelist_sort** — Reorder securities in a community sharelist by id. Provide symbols in the desired new order. Returns upstream API response on success.

- **short_margin** — Get short margin deposit details for the current account. Returns short positions with margin_amount, margin_rate, interest_rate, symbol, quantity per position.

- **short_positions** — Get short interest history (open short positions) for HK or US stocks. Market inferred from symbol suffix. count: 1–100 (default 20). Unified data[]{timestamp(RFC3339), short_shares(open short position in shares), rate(decimal ratio e.g. 0.009=0.9%), close}. US-only: avg_daily_vol, days_to_cover. HK-only: balance(outstanding short position in HKD). US source: FINRA bi-weekly. HK source: HKEX daily.

- **short_trades** — Get daily short-sale volume history for HK or US stocks. Market inferred from symbol suffix. last_timestamp: unix seconds (omit for latest). page_size: 1–100 (default 20). Unified data[]{timestamp(RFC3339), short_vol(daily short volume in shares), rate(decimal ratio e.g. 0.36=36%), close}. US-only: nasdaq_vol(NASDAQ short), nyse_vol(NYSE short). HK-only: balance(HKD), market_vol(total market volume that day). US source: FINRA/NASDAQ daily. HK source: HKEX daily.

- **signal_detail** — Get one signal by ID (from `signals`). Same fields as the list, plus `analysis` — the full strategy analysis: fit scores, valuation scenarios, evidence sources and related fact IDs. Returns {id, symbol, company_name, market, title, summary, strategy_id, strategy_name, key_fact_id, key_catalyst, outlook, outlook_desc, analysis_price, conservative_price, benchmark_price, optimistic_price, status, created_at, updated_at, analysis: {confidence, signal: {core_conclusion, evidence_sources, quick_takeaways, releated_facts_ids, …}, strategy_fit_score: {total_score, key_takeaways, …}, strategy_notes, …}}.

- **signals** — Query strategy signals — a strategy's take on a security, triggered by a catalyst. Filter by symbol, strategy, catalyst and time range; page with limit/offset. Returns each signal's title, summary, outlook and conservative/benchmark/optimistic target prices, plus the total for paging. The full strategy analysis is omitted here — fetch it with signal_detail.

- **statement_export** — Get a pre-signed download URL for a statement data file (obtained from statement_list). Returns {url}; fetch that URL to get the statement JSON.

- **statement_list** — List available account statements (daily/monthly). Returns {list[]{dt (statement date, yyyymmdd), file_key}}. Pass file_key to statement_export to download.

- **static_info** — Get static info for securities. Returns a top-level array, one entry per symbol: symbol, name_cn, name_en, name_hk, exchange (e.g. NASD), currency, lot_size, total_shares, circulating_shares, hk_shares, eps, eps_ttm, bps, dividend_yield, stock_derivatives, board. US accounts only: .BKKT crypto symbols (e.g. BTCUSD.BKKT) are routed to a separate US crypto overview endpoint; .HAS/.OSL crypto symbols are unaffected.

- **stock_positions** — Get current stock positions across all channels. Returns list[].stock_info[]{symbol, symbol_name, quantity, available_quantity, currency, cost_price, market}. US accounts get a US-specific variant: the same list[].stock_info[] without available_quantity, plus last_done, market_price, prev_close, today_pl, position_side; cash, options, crypto (symbol e.g. BTCUSD.BKKT) and buying power are under us{cash_list, option_list, crypto_list, cash_buy_power, …}.

- **today_executions** — Get today's trade executions (fills). Returns a top-level array of {order_id, trade_id, symbol, side, quantity, price, trade_done_at}; side comes from the fill's order and is "" when unresolved (US: the order could not be resolved; call order_detail(order_id) for it). Pass symbol or order_id to filter.

- **today_orders** — Get orders placed today. Returns a top-level array of orders {order_id, symbol, stock_name, side, order_type, status, quantity, executed_quantity, price, currency, time_in_force, submitted_at, updated_at, msg, …, attached_orders[]}, where attached_orders[] holds the order's take-profit/stop-loss legs. Pass symbol to filter by security, or order_id for one order. To fetch an attached leg by its own ID, pass that ID as order_id together with is_attached=true — the leg itself comes back as the order entry. is_attached does nothing without order_id. US accounts get a US-specific variant: the same array and field names, without time_in_force, tag, expire_date and outside_rth (raw US codes in us_time_in_force, us_tag; plus gtd, security_type, operate_direction); is_attached is ignored, us_action (Buy/Sell) filters, and all of today's orders (up to 500) are returned unless us_page/us_limit pick one page; today spans 20:00 New York time (EST/EDT) yesterday, when the overnight session opens, through 23:59:59 New York time today, so it may include last evening's overnight orders, which also appear in history_orders for yesterday; dedupe by order_id when combining.

- **top_movers** — Get stocks whose price fluctuation exceeds the 20-trading-day standard deviation, with correlated news reasons. markets: comma-separated HK/US/CN/SG (omit=all). sort: 0=time 1=change-magnitude 2=popularity/heat (default). limit: results per page (default 20). next_params: pass next_params from previous response to paginate. Returns events[]{timestamp(RFC3339), alert_reason, alert_type, stock{symbol, name, change(decimal ratio e.g. 0.0445=+4.45%), last_done, labels[], intro}}, updated_at, next_params.

- **topic** — Get discussion topics for a symbol. Returns a top-level array of {id, title, description, url, published_at, comments_count, likes_count, shares_count}.

- **topic_create** — Create a new discussion topic. topic_type="post" (default) is plain text; "article" requires a non-empty title and accepts Markdown body.

- **topic_create_reply** — Create a reply to a discussion topic. Pass reply_to_id to nest under another reply; omit for a top-level reply.

- **topic_detail** — Get discussion topic detail by topic_id. Returns {id, title, description, body, author{member_id, name, avatar}, tickers[], hashtags, images[], likes_count, comments_count, shares_count, views_count, created_at, updated_at, detail_url, topic_type}.

- **topic_replies** — Get replies to a discussion topic, paginated (page default 1, size default 20, range 1-50). Returns a top-level array of {id, topic_id, body, reply_to_id, author: {member_id, name}, images, likes_count, comments_count, created_at}.

- **topic_search** — Search community topics/posts by keyword. Returns id, author, time, and excerpt.

- **trade_stats** — Get trade statistics (buy/sell/neutral distribution by price) for a price-volume profile. Returns {trades[]{price, buy_amount, sell_amount, neutral_amount}, statistics{avgprice, trades_count, total_amount, buy, sell, neutral, preclose, timestamp, trade_date[]}}.

- **trades** — Get recent trades (max 1000). Returns a top-level array of {price, volume, timestamp, trade_type, direction, trade_session} for the symbol.

- **trading_days** — Get trading days for a market between dates. market: HK/US/CN/SG. Ranges up to 400 days are fetched in one call; split longer ones. Returns {trade_days: [date], half_trade_days: [date]}.

- **trading_session** — Get trading session schedule for all markets. Returns a top-level array of {market, trade_sessions[]{begin_time, end_time, trade_session}}.

- **update_watchlist_group** — Update a watchlist group by id. Can rename (name param) or modify securities (securities + mode: add/remove/replace). Returns upstream API response.

- **valuation** — Get the PE valuation overview: historical low/median/high and the PE series. Returns {range (years), metrics: {pe: {low, median, high, desc, list: [{timestamp, value}]}}}. US accounts querying a .US symbol get a US-specific variant (ai_summary plus a metrics.pe object with different sub-fields). The region is detected from the account automatically.

- **valuation_comparison** — Stock valuation comparison. Mode A (single): pass only symbol — server returns stock + auto-selected industry peers.

- **valuation_history** — Get PE valuation history for long-term percentile analysis. Returns overview{indicator, metrics.pe{metric, desc, industry_median}, range, date, ccy_symbol}, history{range, metrics.pe{low, median, high, desc, list[]{timestamp, value}}}, peers.pe{industry_median, list[]{symbol, name, value}}, and stocks (industry stocks keyed by counter id, e.g. "ST/US/AMD", each {name, market_cap}). PE only; no PB/PS or dividend-yield series.

- **valuation_rank** — Get daily valuation rank (PE/PB/PS/dividend yield industry percentile) for a security over a date range. start/end in yyyymmdd format; defaults to the last 30 days. Returns {kline_type, max_num, pe, pb, ps, dvd}, each series a list of {timestamp, rank} (rank out of max_num).

- **warrant_issuers** — Get HK warrant issuer information. Returns a top-level array of {issuer_id, name_en, name_cn}. Pass issuer_id in warrant_list's issuer filter.

- **warrant_list** — Get filtered warrant list for an underlying symbol. Returns a top-level array of {symbol, name, warrant_type, status, last_done, change_rate, volume, expiry_date (yyyymmdd), strike_price, implied_volatility, delta, premium, leverage_ratio, effective_leverage, outstanding_ratio, conversion_ratio, …}.

- **warrant_quote** — Get warrant quotes. Returns a top-level array, one entry per symbol: last_done, prev_close, open, high, low, volume, turnover, trade_status, timestamp, implied_volatility, category, strike_price, expiry_date, conversion_ratio, outstanding_ratio, underlying_symbol. Delta and leverage are in warrant_list, not here.

- **watchlist** — Get all watchlist groups and their securities. Returns a top-level array of groups {id, name, securities[]{symbol, name, watched_price, watched_at, is_pinned}}.
