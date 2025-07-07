// scripts/generate-search-data.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 이 스크립트는 Node.js 환경에서 실행됩니다.
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
      content: matterResult.content, // 검색을 위해 원본 content 포함
    };
  });

  fs.writeFileSync(
    path.join(process.cwd(), 'public/search-data.json'),
    JSON.stringify(allPosts)
  );
  console.log('Search data generated successfully.');
}

generateSearchData();