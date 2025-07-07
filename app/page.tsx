// app/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

/**
 * 홈페이지 컴포넌트입니다.
 * 가장 최근 게시글 10개를 보여주고, 전체 블로그로 이동하는 링크를 제공합니다.
 */
export default function HomePage() {
  // 모든 게시글을 날짜순으로 정렬하여 가져옵니다.
  const allPosts = getSortedPostsData();
  // 가장 최신 10개의 게시글만 선택합니다.
  const recentPosts = allPosts.slice(0, 10);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        최신 게시글
      </h1>
      <div className="grid gap-4">
        {/* 최신 게시글 10개를 순회하며 PostCard 컴포넌트를 렌더링합니다. */}
        {recentPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link 
          href="/blog/1" 
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          모든 게시글 보기 &rarr;
        </Link>
      </div>
    </div>
  );
}
