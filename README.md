# 研究室シミュレーション ノベルゲーム

研究室を舞台にしたノベルゲーム。フロントエンドとバックエンドが分かれた構成です。

## 技術スタック
- Frontend: React 19 + TypeScript + Vite
- Backend: FastAPI + Python 3.13 + SQLite
- Assets: `frontend/public`（画像/音声）

## プロジェクト構造

```
lab-simulator/
├── backend/
│   ├── app/
│   │   ├── api/routes/       # FastAPIルーター
│   │   ├── core/             # 設定・共通処理
│   │   ├── db/               # DB接続とスキーマ
│   │   ├── schemas/          # Pydanticスキーマ
│   │   └── services/         # ビジネスロジック
│   ├── data/novel_game.db    # SQLiteデータ（自動生成）
│   ├── .env.example          # バックエンド用環境変数サンプル
│   └── requirements.txt
├── frontend/
│   ├── src/                  # Reactアプリ
│   ├── public/               # 画像/音声
│   ├── .env.example          # フロント用環境変数サンプル
│   └── package.json
└── README.md
```

## セットアップ

### Backend
1) 依存関係をインストール
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2) 環境変数を用意
```bash
cp .env.example .env
```

3) サーバー起動
```bash
uvicorn app.main:app --reload
# または python main.py
```

初回起動時に `backend/data/novel_game.db` が生成され、セーブスロットが初期化されます。

### Frontend
1) 依存関係をインストール
```bash
cd frontend
npm install
```

2) APIの接続先を設定
```bash
cp .env.example .env
# 必要なら VITE_API_BASE_URL を変更
```

3) 開発サーバー起動
```bash
npm run dev
```

## バックエンドAPI（prefix: `/api`）
- `GET /health` … ヘルスチェック
- `GET /save-slots` … セーブスロット一覧
- `POST /save-game` … ゲームデータ保存
- `GET /load-game/{slot_number}` … セーブデータ読み込み
- `DELETE /delete-save/{slot_number}` … セーブ削除
- `POST /reset-database` … DBリセット

## 設定メモ
- DBの保存先は `APP_DATA_DIR` と `APP_DATABASE_FILE` で変更可能（`backend/.env`）。
- フロントのAPI接続先は `VITE_API_BASE_URL` で上書き可能（`frontend/.env`）。
- CORS許可ドメインは `APP_CORS_ORIGINS`（カンマ区切り）で調整。
