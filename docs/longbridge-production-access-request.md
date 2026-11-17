# Confirm Longbridge production access

Prepared 28 October 2026. No request has been sent, credentials created or subscription purchased.

## Public-display permission

Use the official [Longbridge support channel](https://longbridge.com/sg/support/) for your account region. Send the following request through your authenticated account; retain their written reply. The broker account's ordinary market-data access does not establish permission to redistribute it to website visitors.

Subject: Stocklumo public website — US market-data display and server API permission

Hello,

I operate Stocklumo, a publicly accessible informational stock-research website at https://stocklumo.onrender.com/.

I would like to use a dedicated server-side Longbridge integration to display US stock historical OHLCV charts, intraday observations, price snapshots, fundamental screening results, financial-statement metrics and earnings dates to visitors. The website does not execute trades and its portfolio is hypothetical. Visitors would not be using my brokerage account or seeing private account data.

Please confirm in writing:

1. Whether my account's current agreement allows these public website displays, including historical/derived charts, and which provider/exchange authorizations are required.
2. Whether delayed or end-of-day display changes the permission or cost; please identify permitted fields, delay, attribution and user restrictions.
3. Whether server caching is permitted, its maximum retention/refresh periods, and restrictions on derived values or browser-accessible API responses. I do not intend to offer bulk data downloads or resell a feed.
4. Which OpenAPI authentication and market-data-only access configuration should be used for this server application, with no trading/account permissions.
5. Applicable commercial fees, request limits, symbol quotas and supported deployment regions.
6. Why my chat integration can retrieve 270 recent daily candles but the date-range historical endpoint reports error 301607 with a zero quota, and whether the website integration would receive the same or different entitlements.

Please do not activate a paid service or change account permissions without my approval.

Thank you.

## Dedicated server credentials

Follow the [official OpenAPI setup](https://open.longbridge.com/docs/getting-started) for the applicable account region and its documented OAuth registration/authorization flow. The chat plugin's token must not be extracted or reused as an application credential.

- Create a separate application identity for Stocklumo using the provider's supported setup; check whether it supports only market-data access. Account/trading scopes are unnecessary.
- Review the exact permissions and costs before completing authorization. The account owner should complete credential creation and any binding agreement/permission step.
- Keep secrets/tokens out of chat, screenshots, client JavaScript, source control and backups. Local development can use .NET User Secrets; deployment uses protected Render environment configuration once the integration transport is implemented and validated.
- Confirm the credential works outside ChatGPT against the intended endpoints. A successful chat tool call alone is insufficient.
- No official .NET SDK was established in the reviewed documentation. Verify supported transport first; do not install an arbitrary similarly named NuGet package. A small supported-SDK bridge may be necessary and must be evaluated against the existing Render memory/hosting budget.

Until both rights and server authentication are established, the implemented preview remains explicitly opt-in, Development-only and loopback-only. Captured provider files live outside the application and web root and are not published.
