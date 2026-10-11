#!/usr/bin/env bash
# Downloads Flora's own brand assets and photos from florasw17.com into public/images/.
# Each entry is "local-name|primary-path|fallback-path" (fallback optional).
# Requests are spaced out (DELAY seconds) and 429s back off. SKIP_EXISTING=1 keeps files already present.
set -uo pipefail

BASE="https://florasw17.com/wp-content/uploads"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/images"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
DELAY="${DELAY:-2}"
SKIP_EXISTING="${SKIP_EXISTING:-0}"
mkdir -p "$OUT"

assets=(
  "logo-flora.webp|2024/01/logo-flora.webp|"
  "logo-flora-white.webp|2025/12/logo-flora-white.webp|2025/12/logo-flora-white-300x61.webp"
  "favicon.webp|2024/01/favicon2-300x300.webp|"
  "about.webp|2026/06/about.webp|2026/06/about-864x1024.webp"
  "order-deliveroo.webp|2026/07/order-deliveroo.webp|"
  "order-uber.webp|2026/07/order-uber.webp|"
)
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 17 18; do
  assets+=("florasw17_${n}.webp|2026/07/florasw17_${n}.webp|")
done

# Returns 0 on success, 1 on a hard failure (e.g. 404).
fetch() {
  local url="$1" dest="$2" code attempt
  for attempt in 1 2 3 4 5; do
    sleep "$DELAY"
    code=$(curl -sS -L -A "$UA" --connect-timeout 15 --max-time 120 -o "$dest.part" -w '%{http_code}' "$url" || echo 000)
    if [[ "$code" == 200 ]]; then
      mv "$dest.part" "$dest"
      return 0
    fi
    rm -f "$dest.part"
    echo "  $code on attempt $attempt: $url" >&2
    [[ "$code" == 404 ]] && return 1
    sleep $((attempt * 30))
  done
  return 1
}

failed=0
for entry in "${assets[@]}"; do
  IFS='|' read -r name primary fallback <<<"$entry"
  if [[ "$SKIP_EXISTING" == 1 && -s "$OUT/$name" ]]; then
    echo "have  $name"
  elif fetch "$BASE/$primary" "$OUT/$name"; then
    echo "ok    $name"
  elif [[ -n "$fallback" ]] && fetch "$BASE/$fallback" "$OUT/$name"; then
    echo "ok    $name (fallback $fallback)"
  else
    echo "FAIL  $name" >&2
    failed=1
  fi
done
exit $failed
