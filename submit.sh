#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "feat: 视频合成等工作经历记录"
git push origin main
