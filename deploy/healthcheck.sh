#!/bin/sh
set -eu
wget -q -O /dev/null "http://127.0.0.1:${PORT:-8080}/health"
