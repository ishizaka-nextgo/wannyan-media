// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// site はシェアボタンの絶対URLに使う。Cloudflare Pages の仮URLが決まったら書き換える
export default defineConfig({
  site: 'https://wannyan-media.pages.dev',
  trailingSlash: 'always',
  integrations: [mdx()],
});
