// app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="Hhakorea Blog">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              {/* 로고 이미지를 여기에 추가할 수 있습니다. 예: <img src="/logo.svg" /> */}
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              Hhakorea Blog
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <Link href="/blog/1" className="font-medium text-gray-900 dark:text-gray-100">
          Blog
        </Link>
        <Link href="/category" className="font-medium text-gray-900 dark:text-gray-100">
          Category
        </Link>
        <Link href="/archive" className="font-medium text-gray-900 dark:text-gray-100">
          Archive
        </Link>
      </div>
    </header>
  );
}