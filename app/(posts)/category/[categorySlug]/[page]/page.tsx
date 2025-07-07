// app/(posts)/category/[categorySlug]/[page]/page.tsx
import { notFound } from 'next/navigation';
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify, buildSlugMap } from '@/app/lib/slug';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  // Promise로 감싸지 않는 것이 일반적입니다. Next.js가 이미 resolve된 값을 전달합니다.
  params: { categorySlug: string; page: string };
}

export function generateStaticParams() {
  const posts = getSortedPostsData();

  // --- FIX START ---
  // 1. post.category가 실제로 존재하는지 확인하고, 문자열인 경우에만 필터링합니다.
  const categories = Array.from(
    new Set(
      posts
        .map(p => p.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0)
    )
  );
  // --- FIX END ---

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

// page 컴포넌트의 params는 async/await가 필요 없습니다.
export default function CategoryPostsPage({ params }: PageProps) {
  const { categorySlug, page } = params; // await 제거
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
