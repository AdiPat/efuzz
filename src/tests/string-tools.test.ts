import { describe, it, expect } from "vitest";
import { computeSimilarity } from "../string-tools";

describe("string-tools should", () => {
  it("should compute the levenshtein distance between two strings", () => {
    const result = computeSimilarity("test", "test");
    expect(result).toBe(1);
  });

  it("should return 0 if the strings are not the same", () => {
    const result = computeSimilarity("test", "ballpark");
    expect(result).toBe(0);
  });

  it("should compute the correct similarity score range for two similar strings", () => {
    const result = computeSimilarity("test", "tast");
    expect(result).toBeGreaterThan(0.7);
    expect(result).toBeLessThan(1);
  });

  it("should compute the correct similarity score range for two dissimilar strings", () => {
    const result = computeSimilarity("test", "sack");
    expect(result).toBeLessThan(0.3);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
