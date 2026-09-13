param(
    [string]$OutputDirectory = "deploy/infinityfree/upload",
    [string]$ArchivePath = "deploy/infinityfree/fullbright-infinityfree.zip"
)

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$output = Join-Path $root $OutputDirectory
$archive = Join-Path $root $ArchivePath

if (Test-Path $output) { Remove-Item -LiteralPath $output -Recurse -Force }
if (Test-Path $archive) { Remove-Item -LiteralPath $archive -Force }

New-Item -ItemType Directory -Path $output -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $output 'core') -Force | Out-Null

Copy-Item (Join-Path $root 'public/assets') $output -Recurse
Copy-Item (Join-Path $root 'public/build') $output -Recurse
Copy-Item (Join-Path $root 'public/favicon.ico'), (Join-Path $root 'public/favicon.svg'), (Join-Path $root 'public/robots.txt') $output
Copy-Item (Join-Path $root 'deploy/infinityfree/index.php'), (Join-Path $root 'deploy/infinityfree/.htaccess') $output

$core = Join-Path $output 'core'
foreach ($directory in @('app', 'bootstrap', 'config', 'database', 'resources', 'routes', 'vendor')) {
    Copy-Item (Join-Path $root $directory) $core -Recurse
}
foreach ($directory in @('storage/framework/cache/data', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs')) {
    New-Item -ItemType Directory -Path (Join-Path $core $directory) -Force | Out-Null
}
Copy-Item (Join-Path $root 'artisan'), (Join-Path $root 'composer.json'), (Join-Path $root 'composer.lock') $core
Copy-Item (Join-Path $root 'deploy/infinityfree/.env') (Join-Path $core '.env')
Copy-Item (Join-Path $root 'deploy/infinityfree/database.sql') $output

$appKey = (php artisan key:generate --show).Trim()
(Get-Content (Join-Path $core '.env') -Raw).Replace('APP_KEY=', "APP_KEY=$appKey") | Set-Content (Join-Path $core '.env') -Encoding utf8
Compress-Archive -Path (Join-Path $output '*') -DestinationPath $archive -Force
Write-Output "Paket siap: $archive"
