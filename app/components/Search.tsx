// app/components/Search.tsx
'use client';

import { useState, useEffect } from 'react';
// Fuse의 기본 클래스와 함께 FuseResult 타입을 명시적으로 import 합니다.
import Fuse, { type FuseResult } from 'fuse.js';
import Link from 'next/link';

// 검색 결과로 나올 게시글의 타입을 정의합니다.
interface SearchResult {
  slug: string;
  title: string;
  content: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  // 'Fuse.FuseResult' 대신 'FuseResult' 타입을 직접 사용합니다.
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);

  // 컴포넌트가 마운트될 때, 빌드 시점에 생성된 검색용 JSON 데이터를 불러옵니다.
  useEffect(() => {
    fetch('/search-data.json')
      .then((res) => res.json())
      // [수정] fetch로 받아온 data의 타입을 명시적으로 지정해줍니다.
      .then((data: SearchResult[]) => {
        // Fuse.js 인스턴스를 생성하고, 제목과 본문 내용을 검색 대상으로 설정합니다.
        const fuseInstance = new Fuse(data, {
          keys: ['title', 'content'],
          includeScore: true,
          threshold: 0.4, // 검색 정확도 임계값 (0.0 ~ 1.0)
        });
        setFuse(fuseInstance);
      });
  }, []);

  // 검색어(query)가 변경될 때마다 검색을 실행합니다.
  useEffect(() => {
    if (query.length > 2 && fuse) {
      setResults(fuse.search(query));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="게시글 검색..."
        className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      {/* 검색 결과가 있을 때만 목록을 보여줍니다. */}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 max-h-80 overflow-y-auto">
          {results.map(({ item }) => (
            <li key={item.slug}>
              <Link 
                href={`/posts/${item.slug}`} 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                // 링크를 클릭하면 검색창을 닫도록 설정합니다.
                onClick={() => setQuery('')}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
