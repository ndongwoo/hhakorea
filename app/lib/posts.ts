// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post } from '@/app/types'; // 사용자님의 경로에 맞춤

const postsDirectory = path.join(process.cwd(), '_posts');

/**
 * 모든 게시글 데이터를 가져와 날짜순으로 정렬합니다.
 * 데이터 유효성 검사를 강화하여 안정성을 높입니다.
 */
export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const { date, title, author, category } = matterResult.data;
    const content = matterResult.content || '';

    // --- 견고한 날짜 유효성 검사 ---
    if (!date) {
      throw new Error(`[Data Error] Post "${fileName}" is missing a 'date' in its frontmatter.`);
    }

    let dateString: string;
    if (date instanceof Date) {
      dateString = date.toISOString();
    } else if (typeof date === 'string') {
      dateString = date;
    } else {
      // 날짜가 Date 객체나 문자열이 아닌 경우, 구체적인 오류를 발생시킵니다.
      throw new Error(`[Data Error] Post "${fileName}" has an invalid 'date' format. It must be a string or Date object.`);
    }

    return {
      slug,
      title: title || 'Untitled',
      author: author || 'Unknown',
      date: dateString,
      category: category || 'Uncategorized',
      content: content,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 특정 slug를 가진 게시글 데이터와 HTML 컨텐츠를 반환합니다.
 */
export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const content = processedContent.toString();
  
  const { date, title, author, category } = matterResult.data;

  // --- 여기에서도 동일한 유효성 검사를 적용합니다 ---
  if (!date) {
    throw new Error(`[Data Error] Post "${slug}.md" is missing a 'date' in its frontmatter.`);
  }

  let dateString: string;
  if (date instanceof Date) {
    dateString = date.toISOString();
  } else if (typeof date === 'string') {
    dateString = date;
  } else {
    throw new Error(`[Data Error] Post "${slug}.md" has an invalid 'date' format.`);
  }

  return {
    slug,
    title: title || 'Untitled',
    author: author || 'Unknown',
    date: dateString,
    category: category || 'Uncategorized',
    content,
  };
}
