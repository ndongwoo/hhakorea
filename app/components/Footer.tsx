// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {/* 소셜 링크 아이콘을 여기에 추가할 수 있습니다. */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <a href="/">Hhakorea Blog</a>
        </div>
      </div>
    </footer>
  );
}