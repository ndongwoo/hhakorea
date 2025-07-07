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
  const { slug } = await params; // params를 await로 처리
  const post = await getPostData(slug);
  if (!post) notFound();

  const displayDate = new Date(post.date).toISOString().split('T')[0];
  return (
    <article className="prose lg:prose-xl mx-auto p-4">
      <h1>{post.title}</h1>
      <div className="text-gray-500">
        <span>{post.author}</span> | <span>{displayDate}</span> | <span>{post.category}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}