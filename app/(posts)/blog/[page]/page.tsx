// app/(posts)/blog/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ page: string }>;
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }: PageProps) {
    const { page } = await params;
    const pageNum = parseInt(page, 10);

    const allPosts = getSortedPostsData();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = allPosts.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    All Posts
                </h1>
                <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                    블로그의 모든 게시글 목록입니다.
                </p>
            </div>
            {/* [수정] 게시글 목록을 ul 태그로 감싸 테마를 적용합니다. */}
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {!paginatedPosts.length && 'No posts found.'}
                {paginatedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </ul>
            {/* 페이지네이션 컨트롤은 ul 태그 밖에 위치해야 합니다. */}
            {totalPages > 1 && (
                <PaginationControls
                    currentPage={pageNum}
                    totalPages={totalPages}
                    basePath="/blog"
                />
            )}
        </div>
    );
}
