#!/bin/bash
# ----------------------------------------
# Shell Script Checker
#
# This script checks shell scripts for
# issues using ShellCheck. It runs directly
# on the host (no Docker required).
#
# Usage:
#   ./check_shellcheck.sh file1.sh file2.sh ...
# ----------------------------------------

if [ $# -eq 0 ]; then
    echo "No files to check"
    exit 0
fi

SH_FILES=()
CHECKED_FILES=0
HAS_ERRORS=0

for file in "$@"; do
    # Skip non-shell files
    if [[ ! "$file" =~ \.sh$ ]]; then
        continue
    fi

    # Skip if file doesn't exist
    if [ ! -f "$file" ]; then
        continue
    fi

    SH_FILES+=("$file")
done

# Check if there are any shell files to check
if [ ${#SH_FILES[@]} -eq 0 ]; then
    echo "No shell script files to check"
    exit 0
fi

# Run ShellCheck on each file
for file in "${SH_FILES[@]}"; do
    CHECKED_FILES=$((CHECKED_FILES + 1))

    OUTPUT=$(shellcheck --severity=warning "$file" 2>&1)
    EXIT_CODE=$?

    if [ $EXIT_CODE -ne 0 ]; then
        HAS_ERRORS=1
        echo "ShellCheck errors in: $file"
        echo "$OUTPUT"
        echo ""
    fi
done

# Final result
if [ $HAS_ERRORS -ne 0 ]; then
    echo "----------------------------------------"
    echo "ERROR: ShellCheck check failed!"
    echo "Total files checked: $CHECKED_FILES"
    echo "Fix the errors above before committing."
    exit 1
fi

echo "ShellCheck check passed! ($CHECKED_FILES files checked)"
exit 0
