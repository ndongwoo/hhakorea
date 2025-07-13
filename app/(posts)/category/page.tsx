// app/(posts)/category/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/app/lib/posts';

/**
 * 모든 유니크한 카테고리 목록을 보여주는 페이지 컴포넌트입니다.
 */
export default function CategoriesPage() {
  // 모든 게시글 데이터를 가져옵니다.
  const allPosts = getSortedPostsData();

  // 모든 게시글에서 category만 추출한 후, Set을 이용해 중복을 제거하고,
  // 다시 배열로 변환한 뒤 알파벳순으로 정렬합니다.
  const categories = [...new Set(allPosts.map((post) => post.category))].sort();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Categories
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          주제별 게시글 목록입니다.
        </p>
      </div>
      <div className="flex flex-wrap pt-8">
        {categories.map((category) => (
          <div key={category} className="mb-2 mr-5 mt-2">
            <Link
              href={`/category/${encodeURIComponent(category)}/1`}
              className="mr-3 text-lg font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {category}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
