// app/components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/app/types'; // 사용자님의 경로에 맞춤

/**
 * HTML 태그와 마크다운 문법을 제거하고, 지정된 단어 수만큼 텍스트를 잘라냅니다.
 * @param content - 원본 마크다운/HTML 문자열
 * @param wordLimit - 단어 수 제한
 * @returns 잘라낸 텍스트 스니펫
 */
function createSnippet(content: string, wordLimit: number): string {
  if (!content) {
    return '';
  }
  // 1. HTML 태그 제거
  const textWithoutHtml = content.replace(/<\/?[^>]+(>|$)/g, "");
  // 2. 마크다운 문법 (헤더, 링크, 이미지, 강조 등) 제거 후 공백 정리
  const plainText = textWithoutHtml
    .replace(/#{1,6}\s/g, '') // 헤더 (e.g., #, ##)
    .replace(/!?\[(.*?)\]\(.*?\)/g, '$1') // 링크/이미지 (e.g., [text](url))
    .replace(/[`*_~]/g, '') // 강조 (e.g., *italic*, **bold**)
    .replace(/\s+/g, ' ') // 여러 공백을 하나로
    .trim();

  // 3. 단어 수만큼 자르기
  const words = plainText.split(' ');
  if (words.length <= wordLimit) {
    return plainText;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
}

interface PostCardProps {
  // [수정] 이제 content를 포함하는 전체 Post 타입을 받습니다.
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const displayDate = new Date(post.date).toISOString().split('T')[0];
  // 본문 내용에서 15단어 분량의 미리보기를 생성합니다.
  const snippet = createSnippet(post.content, 15);

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
                <div className="flex flex-wrap mt-1">
                  <span className="mr-3 text-sm font-medium uppercase text-blue-500">
                    {post.category}
                  </span>
                </div>
              </div>
              {/* [추가] 본문 미리보기 영역 */}
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {snippet}
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
