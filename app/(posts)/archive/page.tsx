// app/(posts)/archive/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import Link from 'next/link';

export default function ArchivePage() {
  const posts = getSortedPostsData();
  const years = [...new Set(posts.map((post) => post.date.substring(0, 4)))].sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Archive
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          연도별로 정리된 게시글 목록입니다.
        </p>
      </div>
      <div className="flex flex-wrap pt-8">
        {years.map((year) => (
          <div key={year} className="mb-2 mr-5 mt-2">
            <Link
              href={`/archive/${year}/1`}
              className="mr-3 text-lg font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {year}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
