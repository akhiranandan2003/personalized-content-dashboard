import type { ContentItem } from "@/types/content";

export async function getNews(categories: string[]) {
  const response = await fetch(`/api/news?categories=${encodeURIComponent(categories.join(","))}`);
  if (!response.ok) throw new Error("Unable to load news");
  return (await response.json()) as ContentItem[];
}

export async function getMovies() {
  const response = await fetch("/api/movies");
  if (!response.ok) throw new Error("Unable to load recommendations");
  return (await response.json()) as ContentItem[];
}
