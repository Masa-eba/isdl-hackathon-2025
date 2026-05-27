# 研究室シミュレータ

同志社大学 知的システムデザイン研究室 ISDLハッカソン優勝作品です。研究室での1年間を題材にしたノベルゲーム形式のシミュレータです。  
プレイヤーは4年生として配属され、役割選択、研究活動、イベント、会話を通してパラメータや人間関係を変化させていきます。

フロントエンドは React + Vite、バックエンドは FastAPI + SQLite で構成されています。

## 主な機能

- 名前・誕生月を設定してゲーム開始
- プロローグ、チュートリアル、メインゲーム、エピローグの画面遷移
- 研究スキル、社交スキル、教授好感度、ストレスの管理
- 研究班・研究室役割の選択
- 月ごとのイベント、週ごとの行動、会話選択肢
- ローカルストレージと SQLite を使ったセーブデータ管理
- BGM・効果音の再生制御

## 技術構成

| 領域 | 技術 |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Backend | FastAPI, Pydantic, Uvicorn |
| Database | SQLite |
| Assets | SVG placeholders, optional MP3 audio |

## ディレクトリ構成

```text
.
├── backend/
│   ├── app/
│   │   ├── api/routes/      # APIルート
│   │   ├── core/            # 設定
│   │   ├── db/              # SQLite接続・スキーマ
│   │   ├── schemas/         # Pydanticモデル
│   │   └── services/        # ゲーム・セーブ処理
│   ├── .env.example
│   ├── main.py              # 互換用起動エントリ
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   ├── audio/           # BGM・効果音配置先
│   │   └── images/          # 画像アセット
│   ├── src/
│   │   ├── components/      # UIコンポーネント
│   │   ├── data/            # キャラクター・イベント・会話データ
│   │   ├── hooks/           # React hooks
│   │   ├── pages/           # 画面
│   │   ├── services/        # API通信
│   │   ├── types/           # 型定義
│   │   └── utils/           # 状態・音声・時間管理
│   ├── .env.example
│   └── package.json
└── README.md
```

## セットアップ

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

別の起動方法:

```bash
cd backend
python main.py
```

初回起動時に `backend/data/novel_game.db` が自動生成されます。

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

デフォルトではフロントエンドは `http://localhost:5173`、API は `http://localhost:8000/api` を参照します。

## 環境変数

### Backend

`backend/.env.example` をコピーして `backend/.env` を作成します。

| 変数 | デフォルト | 説明 |
| --- | --- | --- |
| `APP_APP_NAME` | `Novel Game API` | FastAPIアプリ名 |
| `APP_APP_VERSION` | `1.0.0` | APIバージョン |
| `APP_DEBUG` | `false` | デバッグ設定 |
| `APP_HOST` | `0.0.0.0` | 起動ホスト |
| `APP_PORT` | `8000` | 起動ポート |
| `APP_CORS_ORIGINS` | `http://localhost:5173` | CORS許可オリジン |
| `APP_DATA_DIR` | `backend/data` | DB保存先 |
| `APP_DATABASE_FILE` | `novel_game.db` | DBファイル名 |

### Frontend

`frontend/.env.example` をコピーして `frontend/.env` を作成します。

| 変数 | デフォルト | 説明 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8000/api` | バックエンドAPIのベースURL |

## 開発コマンド

### Frontend

```bash
cd frontend
npm run dev      # 開発サーバー
npm run build    # TypeScriptチェック + production build
npm run lint     # ESLint
npm run preview  # build結果の確認
```

### Backend

```bash
cd backend
uvicorn app.main:app --reload
```

## API

バックエンドAPIの prefix は `/api` です。

| Method | Path | 説明 |
| --- | --- | --- |
| `GET` | `/health` | ヘルスチェック |
| `GET` | `/save-slots` | セーブスロット一覧 |
| `POST` | `/save-game` | ゲームデータ保存 |
| `GET` | `/load-game/{slot_number}` | セーブデータ読み込み |
| `DELETE` | `/delete-save/{slot_number}` | セーブデータ削除 |
| `POST` | `/reset-database` | DBリセット |

## アセット

画像は `frontend/public/images/` に配置します。現在はプレースホルダー SVG が入っています。

音声ファイルは git 管理対象外です。必要に応じて以下に MP3 を配置してください。

- `frontend/public/audio/bgm/`
- `frontend/public/audio/sfx/`

必要なファイル名は各ディレクトリの README を参照してください。

## データ保存

- フロントエンド側の一時状態や設定は localStorage に保存されます。
- バックエンド側のセーブスロットは SQLite に保存されます。
- SQLite ファイルは `backend/data/novel_game.db` に自動生成され、git 管理対象外です。
