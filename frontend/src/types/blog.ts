export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  publish_date: string;
  category: string;
  tags: string[];
  reading_time?: number;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  reading_time: number;
}
