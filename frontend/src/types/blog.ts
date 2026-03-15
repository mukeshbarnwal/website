/** Frontmatter as stored in .md files. Supports PRD format (date, published) and legacy (publish_date, category). */
export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  /** PRD format */
  date?: string;
  /** Legacy; prefer date */
  publish_date?: string;
  category?: string;
  tags: string[];
  /** Draft vs published; default true for backward compat */
  published?: boolean;
  reading_time?: number;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  /** Normalized date (from date or publish_date); always set when parsed. */
  publish_date: string;
  reading_time: number;
}

/** Payload for creating/updating a post from the admin editor */
export interface BlogPostPayload {
  title: string;
  description: string;
  author: string;
  tags: string[];
  content: string;
  /** If false, saved as draft */
  published: boolean;
  /** Optional; generated from title if not provided */
  slug?: string;
}
