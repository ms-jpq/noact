#!/usr/bin/env bash

cd "$(dirname "$0")" || exit
echo "$PWD"

(
  cd ./artifacts || exit;
  git add .;
  git commit -m "build - $(date)";
  git push;
)
