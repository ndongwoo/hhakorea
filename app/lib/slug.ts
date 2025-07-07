// app/lib/slug.ts

// 1. slug 라이브러리를 import 합니다.
// 먼저 터미널에서 `npm install slug` 또는 `yarn add slug`를 실행해주세요.
import slug from 'slug';

// slug 라이브러리는 한글을 포함한 다국어를 완벽하게 지원합니다.
// slug.charmap['.'] = '-'; // 필요하다면 특정 문자를 어떻게 바꿀지 정의할 수도 있습니다.

export function slugify(str: string): string {
  // 2. 직접 만든 로직 대신 라이브러리를 호출합니다.
  // 라이브러리가 null, undefined 등의 예외 케이스를 더 잘 처리해줍니다.
  return slug(str || '');
}

export function buildSlugMap(categories: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  categories.forEach(cat => {
    // cat이 유효한 문자열인지 확인
    if (typeof cat === 'string' && cat.length > 0) {
      map[slugify(cat)] = cat;
    }
  });
  return map;
}
