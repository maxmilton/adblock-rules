#!/bin/sh
set -eu

script_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd -P)

if ! test -f "${script_dir}/favicon.ico"; then
  # Create minimal favicon.ico file
  magick -size 1x1 xc:none "${script_dir}/favicon.ico"
fi

xdg-open 'http://localhost:5000/adblock-test.html'
exec busybox httpd -fvv -p '127.0.0.1:5000' -h "$script_dir"
