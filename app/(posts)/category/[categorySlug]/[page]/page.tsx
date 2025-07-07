// app/(posts)/category/[categoryName]/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify, buildSlugMap } from '@/app/lib/category';

import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ categoryName: string; page: string }>;
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(p => p.category)));

  const params: { categorySlug: string; page: string }[] = [];
  categories.forEach(category => {
    const postsForCategory = posts.filter(p => p.category === category);
    const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
    const slug = slugify(category);

    for (let i = 1; i <= totalPages; i++) {
      params.push({ categorySlug: slug, page: i.toString() });
    }
  });
  return params;
}

/**
 * 특정 카테고리에 속한 게시글 목록을 페이지네이션과 함께 보여주는 페이지 컴포넌트입니다.
 */

export default async function CategoryPostsPage({ params }: PageProps) {
  const { categorySlug, page } = params;
  const allPosts = getSortedPostsData();
  const categories = Array.from(new Set(allPosts.map(p => p.category)));
  const slugMap = buildSlugMap(categories);

  // 슬러그를 원본 카테고리명으로 변환
  const categoryName = slugMap[categorySlug];
  if (!categoryName) {
    // 없는 슬러그라면 404 처리
    return notFound();
  }

  const postsForCategory = allPosts.filter(p => p.category === categoryName);
  const pageNum = parseInt(page, 10);
  const paginatedPosts = postsForCategory.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

  return (
    <>
      <h1>Category: {categoryName}</h1>
      {paginatedPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        paginatedPosts.map(post => <PostCard key={post.slug} post={post} />)
      )}
      <PaginationControls
        currentPage={pageNum}
        totalPages={Math.ceil(postsForCategory.length / POSTS_PER_PAGE)}
        basePath={`/category/${categorySlug}`}
      />
    </>
  );
}