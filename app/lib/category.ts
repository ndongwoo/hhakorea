// app/lib/category.ts
import slugifyLib from 'slugify';

// 한글 카테고리명 → 슬러그 (lowercase, 하이픈 연결)
export function slugify(category: string): string {
  return slugifyLib(category, { lower: true, strict: true });
}

// 슬러그 → 원본 카테고리명 매핑(역변환용 맵 생성)
export function buildSlugMap(categories: string[]): Record<string, string> {
  return categories.reduce((map, c) => {
    map[slugify(c)] = c;
    return map;
  }, {} as Record<string, string>);
}