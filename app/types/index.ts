// types/index.ts
export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string; // '2011-03-21T08:44:54' 형식
  category: string;
  content: string; // HTML content
}
