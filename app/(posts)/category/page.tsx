// app/(posts)/archive/page.tsx (연도별 예시)
import { getSortedPostsData } from '@/app/lib/posts';
import Link from 'next/link';

export default function ArchivePage() {
  const posts = getSortedPostsData();
  // 'date' 필드에서 연도만 추출하여 중복 제거
  const years = [...new Set(posts.map((post) => post.date.substring(0, 4)))].sort().reverse();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Archive</h1>
      <ul>
        {years.map((year) => (
          <li key={year}>
            <Link href={`/archive/${year}/1`} className="text-blue-500 hover:underline">
              {year}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 카테고리 페이지(category/page.tsx)도 위와 유사하게 구현합니다.