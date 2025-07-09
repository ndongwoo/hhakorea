// app/(posts)/posts/[slug]/page.tsx
import { getPostData, getSortedPostsData } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link'; // [추가] Link 컴포넌트를 불러옵니다.

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
    <article className="divide-y divide-gray-200 dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-4 text-center">
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
          {/* [추가] 작성자와 카테고리 정보를 표시하는 섹션 */}
          <div className="flex justify-center items-center gap-4 pt-2 text-sm text-gray-500 dark:text-gray-400">
            <dl>
              <dt className="sr-only">Author</dt>
              <dd>
                {/* 작성자 이름을 표시합니다. */}
                <p>{post.author}</p>
              </dd>
            </dl>
            <span>•</span>
            <dl>
              <dt className="sr-only">Category</dt>
              <dd>
                {/* 카테고리를 클릭 가능한 링크로 만듭니다. */}
                <Link
                  href={`/category/${encodeURIComponent(post.category)}/1`}
                  className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {post.category}
                </Link>
              </dd>
            </dl>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div 
            className="prose max-w-none pb-8 pt-10 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
    </article>
  );
}
