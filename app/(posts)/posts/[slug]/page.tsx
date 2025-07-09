// app/(posts)/posts/[slug]/page.tsx
import { getPostData, getSortedPostsData } from '@/app/lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) notFound();

  const displayDate = new Date(post.date).toISOString().split('T')[0];

  return (
    // [수정] <article> 태그에 prose 클래스를 적용하면 제목(h1)까지 영향을 주므로,
    // 본문 내용(div)에만 적용하도록 구조를 변경합니다.
    <article className="divide-y divide-gray-200 dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>{displayDate}</time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          {/* [핵심] 이 div에 prose 클래스를 적용하여 본문 스타일에만 영향을 주도록 합니다. */}
          <div 
            className="prose max-w-none pb-8 pt-10 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
    </article>
  );
}
