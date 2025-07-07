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
  // 이제 post.date는 항상 문자열이므로 .substring()을 안전하게 사용할 수 있습니다.
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts from {year}</h1>
      <div className="grid gap-4">
        {paginatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <PaginationControls
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/archive/${year}`}
      />
    </div>
  );
}