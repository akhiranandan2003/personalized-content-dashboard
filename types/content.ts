export type ContentType = "news" | "movie" | "social";

export type ContentItem = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  image: string;
  url?: string;
  category: string;
  source: string;
  publishedAt: string;
};

export type Preferences = {
  categories: string[];
};
