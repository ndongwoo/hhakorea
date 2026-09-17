'use client';

import { useEffect, useRef } from 'react';

interface CommentSidecarProps {
  pageId: string;
}

export default function CommentSidecar({ pageId }: CommentSidecarProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 이전 게시글의 댓글 DOM 제거
    container.innerHTML = '';

    const script = document.createElement('script');

    script.src =
      'https://comments.mycafe24.com/comment-sidecar-js-delivery.php';
    script.async = true;
    script.dataset.site = 'https://hhakorea.org';
    script.dataset.pageId = pageId;

    script.onerror = () => {
      console.error('Failed to load Comment-Sidecar');
    };

    // Comment-Sidecar가 초기화될 영역 안에 script 삽입
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [pageId]);

  return <aside id="comment-sidecar" ref={containerRef} />;
}