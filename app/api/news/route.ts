import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get("categories")?.split(",").filter(Boolean) ?? ["technology"];
  const key = process.env.NEWS_API_KEY;

  if (!key) {
    return NextResponse.json([
      { id: "demo-news-1", type: "news", title: "The future of AI-powered software", description: "A demo article is shown until NEWS_API_KEY is configured.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80", url: "https://newsapi.org/", category: categories[0], source: "Demo News", publishedAt: new Date().toISOString() },
      { id: "demo-news-2", type: "news", title: "Technology teams focus on practical innovation", description: "Connect your NewsAPI key to replace demo content with live headlines.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80", url: "https://newsapi.org/", category: categories[1] ?? categories[0], source: "Demo News", publishedAt: new Date().toISOString() }
    ]);
  }

  const query = categories.join(" OR ");
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=12&sortBy=publishedAt&apiKey=${key}`;
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) return NextResponse.json({ error: "News provider failed" }, { status: 502 });
  const data = await response.json();
  return NextResponse.json((data.articles ?? []).filter((a: { title?: string; urlToImage?: string }) => a.title && a.urlToImage).map((a: { title: string; description?: string; urlToImage: string; url: string; source?: { name?: string }; publishedAt: string }, i: number) => ({
    id: `news-${i}-${a.url}`, type: "news", title: a.title, description: a.description ?? "Latest news article.", image: a.urlToImage, url: a.url, category: categories[i % categories.length], source: a.source?.name ?? "News", publishedAt: a.publishedAt
  })));
}
