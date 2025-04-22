#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "fix: 权限管理的文档优化"
git push origin main
