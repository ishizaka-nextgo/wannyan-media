import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS, ANIMALS, AGES } from './data/site';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(CATEGORY_SLUGS),
      animal: z.enum(ANIMALS),
      ages: z.array(z.enum(AGES)).min(1),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      hero: image(),
      heroAlt: z.string(),
      summary: z.array(z.string()).length(3),
      // 健康に関わる記事は supervisor を入れる（未定なら「調整中」）
      supervisor: z.string().optional(),
      // 入れると記事末に「受診の目安」ボックスと免責文が出る
      vetSigns: z.array(z.string()).optional(),
      sample: z.boolean().default(true),
      popular: z.boolean().default(false),
    }),
});

// 犬種・猫種図鑑。評価（1〜5）はスタッフの経験にもとづく目安
const level = z.number().int().min(1).max(5);
const breeds = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/breeds' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      nameEn: z.string(),
      animal: z.enum(['dog', 'cat']),
      size: z.string(),
      coat: z.string(),
      origin: z.string(),
      photo: image(),
      photoAlt: z.string(),
      lead: z.string(),
      levels: z.object({ care: level, exercise: level, alone: level, beginner: level }),
      fits: z.array(z.string()).min(1),
      checks: z.array(z.string()).min(1),
      sample: z.boolean().default(true),
    }),
});

export const collections = { articles, breeds };
