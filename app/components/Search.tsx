// app/components/Search.tsx
'use client';

import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  content: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
//  const [results, setResults] = useState<Fuse.FuseResult<SearchResult>[]>([]);
//  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);  

  useEffect(() => {
//    fetch('/search-data.json')
//      .then((res) => res.json())
//      .then((data) => {
//        const fuseInstance = new Fuse(data, {
   fetch('/search-data.json')
     .then((res) => res.json() as Promise<SearchResult[]>)
     .then((data) => {
       // 제네릭<T>를 붙여서 Fuse<SearchResult>를 만들도록 강제
       const fuseInstance = new Fuse<SearchResult>(data, {

          keys: ['title', 'content'],
          includeScore: true,
          threshold: 0.4,
        });
        setFuse(fuseInstance);
      });
  }, []);

  useEffect(() => {
    if (query.length > 2 && fuse) {
      setResults(fuse.search(query));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
      {results.length > 0 && (
        <ul className="mt-2 border rounded bg-white absolute w-full max-h-80 overflow-y-auto z-10">
          {results.map(({ item }) => (
            <li key={item.slug}>
              <Link href={`/posts/${item.slug}`} className="block p-2 hover:bg-gray-100" onClick={() => setQuery('')}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}