// app/components/Header.tsx
import Link from 'next/link';
import Search from './Search';

export default function Header() {
  return (
    // [수정] flex-col을 기본으로 하고, sm(640px) 이상일 때만 flex-row로 변경합니다.
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
      {/* [수정] 메뉴와 검색창을 감싸는 div 추가, 반응형 레이아웃 적용 */}
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mt-4 sm:mt-0">
        <nav className="flex space-x-4 leading-5 sm:space-x-6 mb-4 sm:mb-0">
          <Link href="/blog/1" className="font-medium text-gray-900 dark:text-gray-100">
            전체
          </Link>
          <Link href="/category" className="font-medium text-gray-900 dark:text-gray-100">
            주제별
          </Link>
          <Link href="/archive" className="font-medium text-gray-900 dark:text-gray-100">
            연도별
          </Link>
          <Link href="/posts/post_00482" className="font-medium text-gray-900 dark:text-gray-100">
          후원하기
          </Link>
        </nav>
        <div className="w-full sm:w-auto sm:ml-6">
          <Search />
        </div>
      </div>
    </header>
  );
}
