// scripts/generate-search-data.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * HTML 태그와 마크다운 문법을 제거하여 일반 텍스트로 변환하는 함수입니다.
 * @param {string} content - 원본 마크다운/HTML 문자열
 * @returns {string} - 깨끗한 일반 텍스트
 */
function cleanContent(content) {
  if (!content) {
    return '';
  }
  // 1. HTML 태그 제거
  let text = content.replace(/<\/?[^>]+(>|$)/g, "");
  // 2. 마크다운 문법 제거
  text = text
    .replace(/#{1,6}\s/g, '') // 헤더 (e.g., #, ##)
    .replace(/!?\[(.*?)\]\(.*?\)/g, '$1') // 링크/이미지 (e.g., [text](url))
    .replace(/[`*_~]/g, '') // 강조 (e.g., *italic*, **bold**)
    .replace(/\s+/g, ' ') // 여러 공백을 하나로
    .trim();
  return text;
}

async function generateSearchData() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug: slug,
      title: matterResult.data.title,
      // [수정] content를 깨끗한 텍스트로 변환하여 저장합니다.
      content: cleanContent(matterResult.content),
    };
  });

  fs.writeFileSync(
    path.join(process.cwd(), 'public/search-data.json'),
    JSON.stringify(allPosts)
  );
  console.log('Clean search data generated successfully.');
}

generateSearchData();
