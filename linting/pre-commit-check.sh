#!/bin/bash

set -e

ALL_FILE_ARRAY=()
while IFS= read -r line; do
    ALL_FILE_ARRAY+=("$line")
done < <(git diff --cached --name-only --diff-filter=ACM || true)

NEW_FILE_ARRAY=()
while IFS= read -r line; do
    NEW_FILE_ARRAY+=("$line")
done < <(git diff --cached --name-only --diff-filter=A || true)

#echo "ALL_FILE_ARRAY по индексам:"
#for i in "${!ALL_FILE_ARRAY[@]}"; do
#    echo "[$i] = '${ALL_FILE_ARRAY[$i]}'"
#done

echo "ShellCheck..."
bash linting/check_scripts/check_shellcheck.sh "${ALL_FILE_ARRAY[@]}"
echo "----------"

echo "Markdown Code Style Checker..."
bash linting/check_scripts/check_markdownlint.sh "${ALL_FILE_ARRAY[@]}"
echo "----------"

echo "YML/YAML Checker..."
bash linting/check_scripts/check_yamllint.sh "${ALL_FILE_ARRAY[@]}"
echo "----------"

echo "HTML Code Checker..."
bash linting/check_scripts/check_htmlhint.sh "${ALL_FILE_ARRAY[@]}"
echo "----------"

echo "CSS Code Style Checker..."
bash linting/check_scripts/check_stylelint.sh "${ALL_FILE_ARRAY[@]}"
echo "----------"
