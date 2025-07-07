// app/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post } from '@/app/types';

const postsDirectory = path.join(process.cwd(), '_posts');

/**
 * Validates and normalizes a date from frontmatter.
 * Ensures it's either a valid ISO string or a Date object.
 */
function normalizeDate(dateValue: unknown, fileName: string): string {
  if (!dateValue) {
    throw new Error(`Post "${fileName}" is missing a 'date' in its frontmatter.`);
  }
  // If it's already a Date, convert to ISO string
  if (dateValue instanceof Date) {
    return dateValue.toISOString();
  }
  // If it's a string, check validity
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Post "${fileName}" has an invalid 'date' value: ${dateValue}`);
    }
    // Return the original string if it's in ISO-ish format, else standardize
    return parsed.toISOString();
  }
  throw new Error(
    `Post "${fileName}" has a 'date' of unexpected type (${typeof dateValue}).` 
  );
}

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const frontmatter = matterResult.data as Record<string, unknown>;

    // Normalize and validate date field
    const date = normalizeDate(frontmatter.date, fileName);

    // Validate required fields
    if (typeof frontmatter.title !== 'string') {
      throw new Error(`Post "${fileName}" is missing a valid 'title' in its frontmatter.`);
    }
    if (typeof frontmatter.author !== 'string') {
      throw new Error(`Post "${fileName}" is missing a valid 'author' in its frontmatter.`);
    }
    if (typeof frontmatter.category !== 'string') {
      throw new Error(`Post "${fileName}" is missing a valid 'category' in its frontmatter.`);
    }

    // Build Post object; content left blank for listing
    return {
      slug,
      title: frontmatter.title,
      author: frontmatter.author,
      date,
      category: frontmatter.category,
      content: '',
    } as Post;
  });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const frontmatter = matterResult.data as Record<string, unknown>;

  // Normalize and validate date
  const date = normalizeDate(frontmatter.date, `${slug}.md`);

  // Process markdown to HTML
  const processedContent = await remark().use(html).process(matterResult.content);
  const content = processedContent.toString();

  // Validate required frontmatter fields as above
  if (typeof frontmatter.title !== 'string') {
    throw new Error(`Post "${slug}.md" is missing a valid 'title' in its frontmatter.`);
  }
  if (typeof frontmatter.author !== 'string') {
    throw new Error(`Post "${slug}.md" is missing a valid 'author' in its frontmatter.`);
  }
  if (typeof frontmatter.category !== 'string') {
    throw new Error(`Post "${slug}.md" is missing a valid 'category' in its frontmatter.`);
  }

  return {
    slug,
    title: frontmatter.title,
    author: frontmatter.author,
    date,
    category: frontmatter.category,
    content,
  };
}
