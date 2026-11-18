# ワンニャンハウス ペットのくらし手帖（テストサイト）

ワンニャンハウス株式会社の犬猫オウンドメディアのテストサイトです。完成イメージを確認するためのもので、本番公開用ではありません。

- 要件：`要件定義書_テストサイト.md`
- 構成：Astro 7（静的サイト）＋ MDX。公開先は Cloudflare Pages の無料枠
- 検索エンジンに載せない設定：全ページに `noindex, nofollow`、`public/robots.txt` で全体をブロック
- GA4 は入れていません（本番で設定）

## 手元で確認する

```bash
npm install
npm run dev      # http://localhost:4321 で確認しながら編集
npm run build    # dist/ に書き出し
npm run preview  # 書き出した結果を確認
```

## 記事の追加方法

1. `src/content/articles/` に `英小文字とハイフンのファイル名.mdx` を作ります。ファイル名がそのままURLになります（例：`dog-walk.mdx` → `/articles/dog-walk/`）。
2. 写真は `src/assets/photos/` に置き、`hero` に相対パスで書きます。出典は `docs/photo-credits.md` に追記します。
3. 先頭に次の設定（フロントマター）を書きます。

```yaml
---
title: 記事タイトル
description: 検索結果などに出る説明文（80〜120字）
category: food        # food / senior / living / health / training / grooming / season
animal: dog           # dog / cat / both
ages: [adult]         # puppy-kitten / adult / senior から1つ以上
publishDate: 2026-12-01
updatedDate: 2026-12-10        # 更新したときだけ
hero: ../../assets/photos/xxx.jpg
heroAlt: 写真の説明（読み上げ用）
summary:              # 「この記事でわかること」。必ず3行
  - 1行目
  - 2行目
  - 3行目
supervisor: 調整中    # 健康・シニアの記事に入れる
vetSigns:             # 入れると記事末に「受診の目安」と免責文が出る（健康に関わる記事）
  - 受診をすすめるサイン
sample: false         # true のとき「見本」表示が出る（初期値 true）
---
```

4. 本文は Markdown で書きます。見出しは `##`（H2）と `###`（H3）。目次は見出しから自動で作られます。
5. 次の部品を使えます。使うときは、本文の先頭で読み込みます。

```mdx
import Note from '../../components/Note.astro';
import Checklist from '../../components/Checklist.astro';
import QA from '../../components/QA.astro';
import Product from '../../components/Product.astro';

<Note title="ポイント">緑のポイントボックス</Note>
<Note type="caution" title="注意">オレンジの注意ボックス</Note>

<Checklist title="チェックリスト" items={['項目1', '項目2']} />

<QA q="質問文">回答文</QA>

<Product items={[{ name: '商品名', desc: '説明' }]} />
```

- 関連商品ブロックは、フード記事の途中と末尾に置きます。ボタンのリンク先（店舗一覧・通販）は `src/data/site.ts` の `storesUrl`・`shopUrl` でまとめて変えられます（いまは仮リンク）。
- 特定のメーカーや商品を否定する表現は書きません。診断はしません。

## デザインの決め方

色と形は、会社サイト https://www.wan-nyan-house.com のCSS（2026-11-18 取得）から抜き出し、`src/styles/tokens.css` にまとめています。

| 役割 | 値 | 出どころ |
|---|---|---|
| 主色 | `#FFA326` | 会社サイトのボタン・強調色 |
| 差し色 | `#5AB31B` | 会社サイトのボタン色 |
| 背景 | `#FFFFFF`、`#FFF3E3` | 会社サイトの背景・メッセージ欄 |
| 文字 | `#1A1A1A` | 会社サイトの本文 |
| 形 | 大きな角丸、片側だけ大きく丸めたラベル（30px 15px 15px 15px）、ボタン真下の5pxの影 | 会社サイトのボタン・ラベル |

調整したところ：
- **ボタンの文字色**：会社サイトの「オレンジ／緑の地に白文字」は、文字と背景の差が 2.0:1〜2.7:1 で、読みやすさの基準（4.5:1）に届きません。オレンジのボタンは黒文字にし、白文字の緑ボタンは `#3B7A10` まで濃くしました（5.3:1）。白地に置くオレンジの文字は `#9A5C08` を使います。
- **書体**：会社サイトの本文は Noto Sans JP なので、そのまま使います。ヘッダーの一部に使われている AB-kirigirisu は Adobe Fonts の書体で、Google Fonts にはありません。やわらかい印象が近く、見出しで読みやすい **Zen Maru Gothic** を見出しに使いました。
- **フォントの読み込み**：日本語フォントは大きいので、後から読み込む設定にしています（読み込み中は端末の標準書体で表示）。この設定で、Lighthouse モバイルの表示速度が 57 点から 100 点になりました。

## Cloudflare Pages への公開手順

制作側（NEXTGO）のアカウントで行います。

1. GitHub で非公開リポジトリ `wannyan-media` を作り、このフォルダを push します。
   ```bash
   git remote add origin https://github.com/<アカウント名>/wannyan-media.git
   git push -u origin main
   ```
2. Cloudflare のダッシュボードで「Workers & Pages」→「作成」→「Pages」→「Git に接続」を選び、`wannyan-media` を選びます。
3. ビルドの設定：
   - フレームワーク プリセット：Astro
   - ビルド コマンド：`npm run build`
   - ビルド出力ディレクトリ：`dist`
   - 環境変数：`NODE_VERSION` = `24`
4. 「保存してデプロイ」を押すと、`https://wannyan-media.pages.dev`（名前が使われていれば別の名前）で公開されます。
5. 実際のURLが `wannyan-media.pages.dev` と違うときは、`astro.config.mjs` の `site` を書き換えます（シェアボタンのURLに使います）。

以後は `main` に push するたびに、自動で公開し直されます。

## 本番までに決めること

要件定義書の第7章を参照してください（監修、ロゴ、店舗一覧と通販のURL、独自ドメイン、問い合わせの送信先、GA4、正式なメディア名）。本番移行時の引き継ぎ資料は `docs/handover/` に作ります（第10章）。
