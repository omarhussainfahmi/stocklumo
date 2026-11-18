param(
    [string]$Dotnet = 'dotnet',
    [ValidateRange(1024,65535)][int]$Port = 5152
)
$taskRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$snapshotFile = Join-Path $taskRoot 'output/financial-plugin-preview/snapshot.json'
if (-not (Test-Path -LiteralPath $snapshotFile -PathType Leaf)) {
    throw 'A validated local snapshot is required. See docs/research-preview-implementation-2026-10-28.md.'
}
$names = @('ASPNETCORE_ENVIRONMENT','ResearchPreview__Enabled','ResearchPreview__File','Sentry__Enabled','Cloudflare__WebAnalyticsToken')
$previous = @{}
foreach ($name in $names) { $previous[$name] = [Environment]::GetEnvironmentVariable($name, 'Process') }
try {
    $env:ASPNETCORE_ENVIRONMENT = 'Development'
    $env:ResearchPreview__Enabled = 'true'
    $env:ResearchPreview__File = $snapshotFile
    $env:Sentry__Enabled = 'false'
    $env:Cloudflare__WebAnalyticsToken = ' '
    & $Dotnet run --project (Join-Path $taskRoot 'MarketDesk') -c Release --no-build --no-launch-profile --urls "http://127.0.0.1:$Port"
}
finally { foreach ($name in $names) { [Environment]::SetEnvironmentVariable($name, $previous[$name], 'Process') } }
