// app/components/Header.tsx
import Link from 'next/link';
import Search from './Search'; // Search 컴포넌트를 불러옵니다.

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="Hhakorea Blog">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              {/* 로고 이미지를 여기에 추가할 수 있습니다. 예: <img src="/logo.svg" /> */}
            </div>
            <div className="h-6 text-2xl font-semibold">
              사랑나눔의사회
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 mt-4 sm:mt-0 sm:space-x-6">
        <Link href="/blog/1" className="font-medium text-gray-900 dark:text-gray-100">
          전체 보기
        </Link>
        <Link href="/category" className="font-medium text-gray-900 dark:text-gray-100">
          주제별 보기
        </Link>
        <Link href="/archive" className="font-medium text-gray-900 dark:text-gray-100">
          연도별 보기
        </Link>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdeeAqubMZacUV1Q2yDoRUtZMU26GM7WcgaJJZlN5fkVsnDHg/viewform?usp=preview" target="_blank" className="font-medium text-gray-900 dark:text-gray-100">
          후원하기
        </Link>
        {/* [추가] 검색창을 헤더의 오른쪽에 추가합니다. */}
        <div className="w-full sm:w-auto">
          <Search />
        </div>
      </div>
    </header>
  );
}
