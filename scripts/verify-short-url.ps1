param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$LongUrl = "https://example.com/products?id=42&ref=api-test"
)

$createEndpoint = "$BaseUrl/api/url"
$payload = @{ url = $LongUrl } | ConvertTo-Json -Compress

Write-Host "1) Creating short URL"
$responseJson = $payload | curl.exe -sS -X POST "$createEndpoint" `
  -H "Content-Type: application/json" `
  --data-binary "@-"

Write-Host "Create response: $responseJson"

$response = $responseJson | ConvertFrom-Json
$shortId = $response.id

if (-not $shortId) {
    Write-Error "Could not parse short id from API response."
    exit 1
}

$shortUrl = "$BaseUrl/api/url/$shortId"
Write-Host ""
Write-Host "2) Checking redirect headers for: $shortUrl"

curl.exe -sS -D - -o NUL "$shortUrl"

Write-Host ""
Write-Host "3) Expected: HTTP/1.1 302 and Location: $LongUrl"
