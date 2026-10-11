#!/usr/bin/env bash
# Downloads Flora's own brand assets and photos from florasw17.com into public/images/.
# Each entry is "local-name|primary-path|fallback-path" (fallback optional).
set -euo pipefail

BASE="https://florasw17.com/wp-content/uploads"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/images"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
mkdir -p "$OUT"

assets=(
  "logo-flora.webp|2024/01/logo-flora.webp|"
  "logo-flora-white.webp|2025/12/logo-flora-white.webp|2025/12/logo-flora-white-300x61.webp"
  "favicon.webp|2024/01/favicon2-300x300.webp|"
  "about.webp|2026/06/about.webp|2026/06/about-864x1024.webp"
  "bottomless-02.webp|2026/07/bottonless-02.webp|"
  "bottomless-03.webp|2026/07/bottonless-03.webp|"
  "bottomless-baixo2.webp|2026/07/bottonless-baixo2.webp|2026/07/bottonless-baixo2-855x1024.webp"
  "booktable-02.webp|2026/07/booktable-02.webp|"
  "booktable-03.webp|2026/07/booktable-03.webp|"
)
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 17 18; do
  assets+=("florasw17_${n}.webp|2026/07/florasw17_${n}.webp|")
done

fetch() {
  local url="$1" dest="$2"
  curl -fsSL -A "$UA" --connect-timeout 15 --max-time 90 --retry 2 --retry-delay 2 -o "$dest" "$url"
}

failed=0
for entry in "${assets[@]}"; do
  IFS='|' read -r name primary fallback <<<"$entry"
  if fetch "$BASE/$primary" "$OUT/$name"; then
    echo "ok    $name"
  elif [[ -n "$fallback" ]] && fetch "$BASE/$fallback" "$OUT/$name"; then
    echo "ok    $name (fallback $fallback)"
  else
    echo "FAIL  $name" >&2
    rm -f "$OUT/$name"
    failed=1
  fi
done
exit $failed
