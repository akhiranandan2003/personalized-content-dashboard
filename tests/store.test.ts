import { describe, expect, it } from "vitest";
import { makeStore, setCategories, toggleFavorite } from "@/store/store";
import type { ContentItem } from "@/types/content";

describe("Redux dashboard state", () => {
  it("updates user preferences", () => {
    const store = makeStore();
    store.dispatch(setCategories(["finance"]));
    expect(store.getState().preferences.categories).toEqual(["finance"]);
  });
  it("toggles favorites", () => {
    const store = makeStore();
    const item: ContentItem = { id: "1", type: "news", title: "Test", description: "Test", image: "x", category: "technology", source: "Test", publishedAt: "now" };
    store.dispatch(toggleFavorite(item));
    expect(store.getState().favorites).toHaveLength(1);
    store.dispatch(toggleFavorite(item));
    expect(store.getState().favorites).toHaveLength(0);
  });
});
