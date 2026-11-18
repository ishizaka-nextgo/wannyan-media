export const SITE = {
  name: 'ワンニャンハウス ペットのくらし手帖',
  shortName: 'ペットのくらし手帖',
  tagline: '毎日のごはんから、シニア期の暮らしまで。ペットショップのスタッフが答えます。',
  author: 'ワンニャンハウス 編集部',
  company: 'ワンニャンハウス株式会社',
  // 仮リンク：本番で正式URLに差し替える
  storesUrl: '#stores-tbd',
  shopUrl: '#shop-tbd',
};

export const CATEGORIES = [
  { slug: 'food', name: '食事・フード・おやつ', priority: true, lead: '食べない、選び方がわからない。毎日のごはんの悩みに。' },
  { slug: 'senior', name: 'シニアケア・介護', priority: true, lead: '年齢を重ねた子との、おだやかな毎日のために。' },
  { slug: 'living', name: '暮らし・住まい・グッズ', priority: true, lead: 'お部屋づくりや便利なグッズで、いっしょに快適に。' },
  { slug: 'health', name: '健康・病気の基礎知識', priority: false, lead: '' },
  { slug: 'training', name: 'しつけ・トレーニング', priority: false, lead: '' },
  { slug: 'grooming', name: 'お手入れ・トリミング', priority: false, lead: '' },
  { slug: 'season', name: '季節のケア', priority: false, lead: '' },
] as const;

export const CATEGORY_SLUGS = ['food', 'senior', 'living', 'health', 'training', 'grooming', 'season'] as const;
export const ANIMALS = ['dog', 'cat', 'both'] as const;
export const AGES = ['puppy-kitten', 'adult', 'senior'] as const;

export const TAG_LABELS: Record<string, string> = {
  dog: '犬',
  cat: '猫',
  both: '犬・猫',
  'puppy-kitten': '子犬・子猫',
  adult: '成犬・成猫',
  senior: 'シニア',
};

export const categoryName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

export const formatDate = (d: Date) =>
  `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
