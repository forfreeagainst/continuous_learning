#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "fix: 优化WebSocket心跳机制"
git push origin main
