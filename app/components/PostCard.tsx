// components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/app/types';

interface PostCardProps {
  post: Omit<Post, 'content'>;
}

export default function PostCard({ post }: PostCardProps) {
  const displayDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <li key={post.slug} className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{displayDate}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  <span className="mr-3 text-sm font-medium uppercase text-blue-500">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {/* 요약 내용을 여기에 표시할 수 있습니다. */}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/posts/${post.slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${post.title}"`}
              >
                더 읽기 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
