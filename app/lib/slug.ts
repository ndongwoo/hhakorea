// app/lib/slug.ts
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')      // 1. 악센트 제거 (NFD 정규화)
    .replace(/[^\w\s-]/g, '')             // 2. 알파벳/숫자/공백/하이픈 제외 문자 제거
    .trim()                                 // 3. 앞뒤 공백 제거
    .toLowerCase()                          // 4. 소문자 변환
    .replace(/[\s_-]+/g, '-')              // 5. 공백/언더스코어/연속 하이픈 → 단일 하이픈
    .replace(/^-+|-+$/g, '');               // 6. 앞뒤 하이픈 제거
}

export function buildSlugMap(categories: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  categories.forEach(cat => {
    map[slugify(cat)] = cat;
  });
  return map;
}