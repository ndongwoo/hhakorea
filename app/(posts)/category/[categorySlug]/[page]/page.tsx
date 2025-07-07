// app/(posts)/category/[categoryName]/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify, buildSlugMap } from '@/app/lib/category';

import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';
import { notFound } from 'next/navigation';

const POSTS_PER_PAGE = 10;

export type PageProps = {
  params: {
    categorySlug: string;
    page: string;
  };
};

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

export default function CategoryPostsPage({ params }: PageProps) {
  const { categorySlug, page } = params;
  const allPosts = getSortedPostsData();
  const categories = Array.from(new Set(allPosts.map(p => p.category)));
  const slugMap = buildSlugMap(categories);

  // 슬러그를 원본 카테고리명으로 변환
  const categoryName = slugMap[categorySlug];
  if (!categoryName) {
    return notFound();
  }

  const postsForCategory = allPosts.filter(p => p.category === categoryName);
  const pageNum = Number(page);
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