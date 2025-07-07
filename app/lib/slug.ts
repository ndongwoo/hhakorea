// app/lib/slug.ts
import slugifyLib from 'slugify';

// slugify 라이브러리를 사용한 ASCII-safe 슬러그 생성
export function slugify(str: string): string {
  return slugifyLib(str, { lower: true, strict: true });
}

export function buildSlugMap(categories: string[]): Record<string, string> {
  return categories.reduce((map, cat) => {
    map[slugify(cat)] = cat;
    return map;
  }, {} as Record<string, string>);
}