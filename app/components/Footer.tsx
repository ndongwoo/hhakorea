// app/components/Footer.tsx
import Link from 'next/link'; // Link를 import 합니다.

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {/* 소셜 링크 아이콘을 여기에 추가할 수 있습니다. */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© 2004-${new Date().getFullYear()} HHA`}</div>
          <div>{` • `}</div>
          {/* <a> 태그를 <Link>로 변경합니다. */}
          <Link href="/">Home</Link>
          <div>{` • `}</div>
          <Link href="https://www.acrc.go.kr/">공익위반제보</Link>
        </div>
      </div>
    </footer>
  );
}
