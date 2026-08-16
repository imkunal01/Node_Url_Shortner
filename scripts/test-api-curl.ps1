param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$LongUrl = "https://example.com/products?id=42&ref=api-test"
)

$endpoint = "$BaseUrl/api/url"
$payload = @{ url = $LongUrl } | ConvertTo-Json -Compress

Write-Host "Testing URL shortener API"
Write-Host "POST $endpoint"
Write-Host "Payload: $payload"
Write-Host ""

$payload | curl.exe -sS -X POST "$endpoint" `
  -H "Content-Type: application/json" `
  --data-binary "@-"

Write-Host ""
