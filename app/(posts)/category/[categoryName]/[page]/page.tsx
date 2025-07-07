// app/(posts)/category/[categoryName]/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ categoryName: string; page: string }>;
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = [...new Set(posts.map((post) => post.category))];
  const params: { categoryName: string; page: string }[] = [];

  categories.forEach(category => {
    const postsForCategory = posts.filter(p => p.category === category);
    const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
    for (let i = 1; i <= totalPages; i++) {
      params.push({ categoryName: encodeURIComponent(category), page: i.toString() });
    }
  });

  return params;
}

export default async function CategoryPostsPage({ params }: PageProps) {
  const { categoryName, page } = await params; // params를 await로 처리
  const pageNum = parseInt(page, 10);
  
  const allPosts = getSortedPostsData();
  const decodedCategoryName = decodeURIComponent(categoryName);
  const postsForCategory = allPosts.filter(p => p.category === decodedCategoryName);

  const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
  const paginatedPosts = postsForCategory.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category: {decodedCategoryName}</h1>
      <div className="grid gap-4">
        {paginatedPosts.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
      <PaginationControls
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/category/${categoryName}`}
      />
    </div>
  );
}