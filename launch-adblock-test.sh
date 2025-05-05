#!/bin/sh
set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd -P)

if ! test -f "${script_dir}/favicon.ico"; then
  # Create minimal favicon.ico file
  magick -size 16x16 xc:red -strip -colors 1 -depth 2 "${script_dir}/favicon.ico"
fi

url='http://localhost:5000/adblock-test.html'
xdg-open "$url" 2>/dev/null || echo "Open URL: $url"
exec busybox httpd -fvv -p '127.0.0.1:5000' -h "$script_dir"
