// app/(posts)/category/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/app/lib/posts';
import { slugify } from '@/app/lib/slug';

export default function CategoriesPage() {
  const allPosts = getSortedPostsData();
  const categories = [...new Set(allPosts.map(post => post.category))].sort();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold">Categories</h1>
      </div>
      <div className="flex flex-wrap pt-8">
        {categories.map(category => {
          const slug = slugify(category);
          return (
            <Link
              key={slug}
              href={`/category/${slug}/1`}
              className="mr-3 text-lg font-medium uppercase text-primary-500"
            >
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
