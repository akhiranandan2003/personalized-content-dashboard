import type { ContentItem } from "@/types/content";

export const socialPosts: ContentItem[] = [
  { id: "social-1", type: "social", title: "AI is changing how teams build software", description: "A community discussion about practical AI tools for developers.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80", category: "technology", source: "Community", publishedAt: new Date().toISOString() },
  { id: "social-2", type: "social", title: "Weekend sports picks are here", description: "Fans share predictions, highlights and the moments they are watching.", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80", category: "sports", source: "Community", publishedAt: new Date().toISOString() },
  { id: "social-3", type: "social", title: "Smart money habits for young professionals", description: "A social thread about saving, investing and building better habits.", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80", category: "finance", source: "Community", publishedAt: new Date().toISOString() }
];
