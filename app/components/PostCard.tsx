// components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/app/types';

// PostCard 컴포넌트가 받을 props의 타입을 정의합니다.
// 목록에서는 전체 content가 필요 없으므로 Omit 유틸리티 타입을 사용하여 제외합니다.
interface PostCardProps {
  post: Omit<Post, 'content'>;
}

/**
 * 게시글 목록에 표시될 개별 게시글 카드 컴포넌트입니다.
 * @param {PostCardProps} props - post 객체를 포함하는 props
 * @returns JSX.Element
 */
export default function PostCard({ post }: PostCardProps) {
  // ISO 형식의 날짜 문자열('YYYY-MM-DDTHH:mm:ss')에서 'YYYY-MM-DD' 부분만 추출합니다.
  const displayDate = new Date(post.date).toISOString().split('T')[0];

  return (
    // Link 컴포넌트로 전체 카드를 감싸 클릭 가능한 영역으로 만듭니다.
    <Link
      href={`/posts/${post.slug}`}
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 ease-in-out"
    >
      {/* 게시글 제목 */}
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {post.title}
      </h2>
      
      {/* 게시글 메타 정보 (작성자, 날짜) */}
      <div className="text-sm text-gray-600">
        <span>{post.author}</span>
        <span className="mx-2">·</span>
        <time dateTime={post.date}>{displayDate}</time>
      </div>
    </Link>
  );
}
