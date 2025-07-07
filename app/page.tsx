// app/page.tsx
import { getSortedPostsData } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard'; // PostCard 경로를 프로젝트에 맞게 확인
import Link from 'next/link';

export default function HomePage() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 5); // 최신 5개만 표시

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            최신 게시글
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Hhakorea 블로그의 최신 소식을 만나보세요.
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!recentPosts.length && 'No posts found.'}
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      {allPosts.length > 5 && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog/1"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            모든 게시글 보기 &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
