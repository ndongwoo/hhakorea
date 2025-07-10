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
	<img src="/files/attach/images/admin/logos.jpg" alt="사랑나눔의사회 배너" className="h-auto rounded-lg shadow" />
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사랑나눔의사회 홈페이지에 오신 것을 환영합니다.<br />
	    사랑나눔의사회는 여러분 주변의 이웃들에게 사랑과 정성으로 의료봉사와 건강한 삶을 위한 지원을 하는 단체입니다.
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            문의전화 02-969-3110 <br />
            후원계좌 하나은행 200-000010-04105 <br />
            <Link
              href="https://pf.kakao.com/_Kixgexj"
              aria-label="카카오톡 채널"
            >
	    카카오톡 채널
            </Link>	    
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
