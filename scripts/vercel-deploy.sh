#!/bin/bash
# Vercel デプロイ用: GitHub にプッシュするスクリプト
# 使用方法: ./scripts/vercel-deploy.sh <GitHubユーザー名>
#
# 事前に GitHub で zentect-insight リポジトリを作成してください:
# https://github.com/new
# - リポジトリ名: zentect-insight
# - README/.gitignore の自動作成: しない

GITHUB_USERNAME=$1
if [ -z "$GITHUB_USERNAME" ]; then
  echo "Usage: ./scripts/vercel-deploy.sh <GitHubユーザー名>"
  echo ""
  echo "例: ./scripts/vercel-deploy.sh tamurakei"
  echo ""
  echo "事前に https://github.com/new で zentect-insight リポジトリを作成してください。"
  exit 1
fi

set -e
cd "$(dirname "$0")/.."

echo "Adding remote origin..."
git remote add origin "https://github.com/${GITHUB_USERNAME}/zentect-insight.git" 2>/dev/null || \
  git remote set-url origin "https://github.com/${GITHUB_USERNAME}/zentect-insight.git"

echo "Pushing to main..."
git branch -M main
git push -u origin main

echo ""
echo "Push 完了。次に Vercel でデプロイ:"
echo "1. https://vercel.com にアクセス"
echo "2. Add New -> Project"
echo "3. Import Git Repository で zentect-insight を選択"
echo "4. Deploy をクリック"
