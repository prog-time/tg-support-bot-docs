#!/bin/bash
# ----------------------------------------
# Shell Script Checker (Full Project)
#
# This script checks all shell scripts in the
# project for issues using ShellCheck.
# Used in pre-push-check.sh
#
# Usage:
#   ./check_shellcheck_all.sh
# ----------------------------------------

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

SH_FILES=$(find "$PROJECT_DIR" -name "*.sh" -not -path "*/_site/*" -not -path "*/node_modules/*" -not -path "*/.git/*")

if [ -z "$SH_FILES" ]; then
    echo "No shell script files found"
    exit 0
fi

exec "$SCRIPT_DIR/check_shellcheck.sh" $SH_FILES
