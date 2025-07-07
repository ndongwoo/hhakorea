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
    const { page } = await params; // params를 await로 처리
    const pageNum = parseInt(page, 10);

    const allPosts = getSortedPostsData();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = allPosts.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <div className="grid gap-4">
                {paginatedPosts.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
            <PaginationControls
                currentPage={pageNum}
                totalPages={totalPages}
                basePath="/blog"
            />
        </div>
    );
}