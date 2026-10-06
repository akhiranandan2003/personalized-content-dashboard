import { describe, expect, it } from "vitest";
import { socialPosts } from "@/lib/mockSocial";

describe("dashboard content", () => {
  it("contains mock social content for the feed", () => {
    expect(socialPosts.length).toBeGreaterThan(0);
    expect(socialPosts[0].type).toBe("social");
  });
  it("supports category metadata", () => {
    expect(socialPosts.map((p) => p.category)).toContain("technology");
  });
});
