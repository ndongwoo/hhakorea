// app/(posts)/category/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify } from '@/app/lib/category';

/**
 * 모든 유니크한 카테고리 목록을 보여주는 페이지 컴포넌트입니다.
 */
export default function CategoriesPage() {
  const allPosts = getSortedPostsData();
  const categories = [...new Set(allPosts.map(p => p.category))].sort();

  return (
    <div className="flex flex-wrap pt-8">
      {categories.map(category => {
        const slug = slugify(category);
        return (
          <Link key={slug} href={`/category/${slug}/1`} className="...">
            {category}
          </Link>
        );
      })}
    </div>
  );
}