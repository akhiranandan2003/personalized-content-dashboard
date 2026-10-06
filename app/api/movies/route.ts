import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.TMDB_API_KEY;
  if (!key) return NextResponse.json([
    { id: "movie-1", type: "movie", title: "The Last Horizon", description: "Demo recommendation. Add TMDB_API_KEY for live movie recommendations.", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80", url: "https://www.themoviedb.org/", category: "movies", source: "Demo Recommendations", publishedAt: new Date().toISOString() },
    { id: "movie-2", type: "movie", title: "Beyond the City", description: "A second demo recommendation for the dashboard.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80", url: "https://www.themoviedb.org/", category: "movies", source: "Demo Recommendations", publishedAt: new Date().toISOString() }
  ]);

  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`, { next: { revalidate: 300 } });
  if (!response.ok) return NextResponse.json({ error: "Movie provider failed" }, { status: 502 });
  const data = await response.json();
  return NextResponse.json((data.results ?? []).slice(0, 12).map((m: { id: number; title: string; overview?: string; poster_path?: string; release_date?: string }) => ({
    id: `movie-${m.id}`, type: "movie", title: m.title, description: m.overview || "Recommended movie.", image: m.poster_path ? `https://image.tmdb.org/t/p/w780${m.poster_path}` : "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80", url: `https://www.themoviedb.org/movie/${m.id}`, category: "movies", source: "TMDB", publishedAt: m.release_date || new Date().toISOString()
  })));
}
