# Vercel デプロイ手順

## 1. GitHub リポジトリの作成

1. [https://github.com/new](https://github.com/new) にアクセス
2. 以下を設定:
   - **Repository name:** `zentect-insight`
   - **Public** または **Private:** 任意
   - **Add a README file:** チェックしない
   - **Add .gitignore:** チェックしない
3. **Create repository** をクリック

## 2. GitHub へのプッシュ

ターミナルで実行（`<GitHubユーザー名>` を実際のユーザー名に置き換え）:

```bash
./scripts/vercel-deploy.sh <GitHubユーザー名>
```

例: `./scripts/vercel-deploy.sh tamurakei`

## 3. Vercel でデプロイ

1. [https://vercel.com](https://vercel.com) にアクセス
2. GitHub アカウントでログイン
3. **Add New** → **Project**
4. **Import Git Repository** で `zentect-insight` を選択
5. **Configure Project** で設定を確認（デフォルトのままで可）
6. **Deploy** をクリック

デプロイ完了後、`https://zentect-insight-xxx.vercel.app` のような URL が発行されます。
