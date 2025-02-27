#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "docs: webpack开发自己的loader"
git push origin main
