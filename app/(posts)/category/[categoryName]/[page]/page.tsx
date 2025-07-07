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
 * 한글과 같은 non-ASCII 문자를 포함하는 카테고리 이름을 URL-safe하게 인코딩합니다.
 */
export function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = [...new Set(posts.map((post) => post.category))];
  const params: { categoryName: string; page: string }[] = [];

  categories.forEach(category => {
    // 카테고리 데이터가 유효한 경우에만 파라미터를 생성합니다.
    if (category) {
      const postsForCategory = posts.filter(p => p.category === category);
      const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
      for (let i = 1; i <= totalPages; i++) {
        // 카테고리 이름을 URL에 사용할 수 있도록 인코딩합니다. 이것이 핵심입니다.
        params.push({ categoryName: encodeURIComponent(category), page: i.toString() });
      }
    }
  });

  return params;
}

/**
 * 특정 카테고리에 속한 게시글 목록을 페이지네이션과 함께 보여주는 페이지 컴포넌트입니다.
 */
export default async function CategoryPostsPage({ params }: PageProps) {
  const { categoryName, page } = await params;
  const pageNum = parseInt(page, 10);
  
  // URL 파라미터로 받은 인코딩된 카테고리 이름을 다시 원래의 한글로 디코딩합니다.
  const decodedCategoryName = decodeURIComponent(categoryName);

  const allPosts = getSortedPostsData();
  const postsForCategory = allPosts.filter(p => p.category === decodedCategoryName);

  const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);
  const paginatedPosts = postsForCategory.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Category: {decodedCategoryName}
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
        basePath={`/category/${categoryName}`}
      />
    </div>
  );
}
