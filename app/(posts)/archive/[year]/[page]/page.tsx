// app/(posts)/archive/[year]/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ year: string; page: string }>;
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  const years = [...new Set(posts.map(post => post.date.substring(0, 4)))];
  const params: { year: string; page: string }[] = [];

  years.forEach(year => {
    const postsForYear = posts.filter(p => p.date.startsWith(year));
    const totalPages = Math.ceil(postsForYear.length / POSTS_PER_PAGE);
    for (let i = 1; i <= totalPages; i++) {
      params.push({ year, page: i.toString() });
    }
  });

  return params;
}

export default async function ArchivePostsPage({ params }: PageProps) {
  const { year, page } = await params;
  const pageNum = parseInt(page, 10);

  const allPosts = getSortedPostsData();
  const postsForYear = allPosts.filter(p => p.date.startsWith(year));

  const totalPages = Math.ceil(postsForYear.length / POSTS_PER_PAGE);
  const paginatedPosts = postsForYear.slice(
    (pageNum - 1) * POSTS_PER_PAGE,
    pageNum * POSTS_PER_PAGE
  );

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Archive: {year}
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!paginatedPosts.length && 'No posts found.'}
        {paginatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={pageNum}
          totalPages={totalPages}
          basePath={`/archive/${year}`}
        />
      )}
    </div>
  );
}
