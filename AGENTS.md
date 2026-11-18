# Stocklumo project maintenance

## Keep public information current

When changing features, data sources, storage, consent, monitoring, backups, contact links or third-party services, review and update these together as part of the same task:

- `MarketDesk/Views/Site/Privacy.cshtml`
- `MarketDesk/Views/Site/Terms.cshtml`
- `MarketDesk/Views/Site/Settings.cshtml` (Privacy & backups)
- `MarketDesk/Views/Shared/_PrivacyControls.cshtml` (Cookie settings)

Match disclosures to verified implementation: local/session/in-memory data, what leaves the browser, backup contents and replacement behavior, optional-service gating, and provider/data limitations. Keep wording concise; visual-only changes do not need policy text. Update revision dates when policy content changes. Do not invent legal guarantees, processing, provider access, retention periods or enabled integrations. Do not reset consent or change its version for copy-only updates. Preserve settings, privacy controls and accessible navigation; verify relevant consent/backup flows and mobile layouts. Report local verification and deployment status accurately.
