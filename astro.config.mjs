// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// site はシェアボタンとシェア用画像の絶対URLに使う。
// Cloudflare Pages ではブランチ名が渡されるので、main 以外（例：design-b）はそのブランチの確認用URLにする
const branch = process.env.CF_PAGES_BRANCH;
const site = !branch || branch === 'main'
  ? 'https://wannyan-media.pages.dev'
  : `https://${branch}.wannyan-media.pages.dev`;

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [mdx()],
});
