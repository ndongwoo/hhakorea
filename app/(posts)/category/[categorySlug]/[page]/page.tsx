// app/(posts)/category/[categorySlug]/[page]/page.tsx
import { notFound } from 'next/navigation';
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify, buildSlugMap } from '@/app/lib/slug';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

// --- FIX START ---
// 타입 에러를 해결하기 위해 params를 다시 Promise 타입으로 변경합니다.
interface PageProps {
  params: Promise<{ categorySlug: string; page: string }>;
}
// --- FIX END ---

export function generateStaticParams() {
  const posts = getSortedPostsData();

  // post.category가 실제로 존재하는지 확인하고, 문자열인 경우에만 필터링합니다.
  const categories = Array.from(
    new Set(
      posts
        .map(p => p.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0)
    )
  );

  const params: { categorySlug: string; page: string }[] = [];

  categories.forEach(category => {
    // 이제 category는 항상 유효한 문자열이므로 slugify가 안전합니다.
    const slug = slugify(category);
    const totalPages = Math.ceil(
      posts.filter(p => p.category === category).length / POSTS_PER_PAGE
    );

    for (let i = 1; i <= totalPages; i++) {
      params.push({ categorySlug: slug, page: i.toString() });
    }
  });

  return params;
}

// --- FIX START ---
// 컴포넌트를 async로 만들고 params를 await 합니다.
export default async function CategoryPostsPage({ params }: PageProps) {
  const { categorySlug, page } = await params;
  // --- FIX END ---
  const allPosts = getSortedPostsData();
  const categories = Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)));
  const slugMap = buildSlugMap(categories as string[]);

  const categoryName = slugMap[categorySlug];
  if (!categoryName) {
    return notFound();
  }

  const pageNum = parseInt(page, 10);
  const postsForCategory = allPosts.filter(p => p.category === categoryName);
  const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
  const paginatedPosts = postsForCategory.slice(
    (pageNum - 1) * POSTS_PER_PAGE,
    pageNum * POSTS_PER_PAGE
  );

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 헤더 */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Category: {categoryName}
        </h1>
      </div>

      {/* 포스트 리스트 */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {paginatedPosts.length === 0 && <p>No posts found.</p>}
        {paginatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>

      {/* 페이지네이션 */}
      <PaginationControls
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/category/${categorySlug}`}
      />
    </div>
  );
}
