// app/(posts)/category/[categoryName]/[page]/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import PaginationControls from '@/app/components/PaginationControls';

const POSTS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ categoryName: string; page: string }>;
}

/**
 * 빌드 시점에 생성할 모든 카테고리/페이지 조합을 반환합니다.
 * Next.js가 내부적으로 인코딩을 처리하도록, 순수한 한글 카테고리 이름을 반환합니다.
 */
export function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = [...new Set(posts.map((post) => post.category))];
  const params: { categoryName: string; page: string }[] = [];

  categories.forEach(category => {
    if (category) {
      const postsForCategory = posts.filter(p => p.category === category);
      const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
      for (let i = 1; i <= totalPages; i++) {
        // [수정] encodeURIComponent를 제거하고 원본 카테고리 이름을 그대로 사용합니다.
        params.push({ categoryName: category, page: i.toString() });
      }
    }
  });

  return params;
}

/**
 * 특정 카테고리에 속한 게시글 목록을 페이지네이션과 함께 보여주는 페이지 컴포넌트입니다.
 */
export default async function CategoryPostsPage({ params }: PageProps) {
  // [수정] params로 받은 categoryName은 이미 디코딩된 순수한 한글입니다.
  const { categoryName, page } = await params;
  const pageNum = parseInt(page, 10);
  
  const allPosts = getSortedPostsData();
  // [수정] decodeURIComponent 호출을 제거합니다.
  const postsForCategory = allPosts.filter(p => p.category === categoryName);

  const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
  const paginatedPosts = postsForCategory.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Category: {categoryName}
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!paginatedPosts.length && 'No posts found.'}
        {paginatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      <PaginationControls
        currentPage={pageNum}
        totalPages={totalPages}
        // [수정] 페이지네이션 링크를 만들 때는 URL에 맞게 인코딩해줍니다.
        basePath={`/category/${encodeURIComponent(categoryName)}`}
      />
    </div>
  );
}
