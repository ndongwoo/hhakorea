// app/(posts)/category/[categorySlug]/[page]/page.tsx
import { notFound } from 'next/navigation';
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify, buildSlugMap } from '@/app/lib/slug';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(
    new Set(
      posts
        .map(p => p.category)
        .filter((c): c is string => Boolean(c && typeof c === 'string'))
    )
  );

  return categories.flatMap(category => {
    const slug = slugify(category);
    const totalPages = Math.ceil(
      posts.filter(p => p.category === category).length / POSTS_PER_PAGE
    );

    return Array.from({ length: totalPages }, (_, i) => ({
      categorySlug: slug,
      page: (i + 1).toString(),
    }));
  });
}

interface PageProps {
  params: {
    categorySlug: string;
    page: string;
  };
}

export default function CategoryPostsPage({ params }: PageProps) {
  const { categorySlug, page } = params;
  const allPosts = getSortedPostsData();
  const categories = Array.from(
    new Set(
      allPosts.map(p => p.category).filter((c): c is string => Boolean(c))
    )
  );
  const slugMap = buildSlugMap(categories);

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
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Category: {categoryName}
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {paginatedPosts.length === 0 && <p>No posts found.</p>}
        {paginatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      <PaginationControls
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/category/${categorySlug}`}
      />
    </div>
  );
}