import { describe, it, expect } from "vitest";
import {
  computeStringObjectSimilarity,
  computeJaroWinklerDistance,
  computeSimilarity,
} from "../string-tools";

describe("string-tools should", () => {
  describe("computeSimilarity should", () => {
    it("compute the levenshtein distance between two strings", () => {
      const result = computeSimilarity("test", "test");
      expect(result).toBe(1);
    });

    it("return 0 if the strings are not the same", () => {
      const result = computeSimilarity("test", "ballpark");
      expect(result).toBe(0);
    });

    it("compute the correct similarity score range for two similar strings", () => {
      const result = computeSimilarity("test", "tast");
      expect(result).toBeGreaterThan(0.7);
      expect(result).toBeLessThan(1);
    });

    it("compute the correct similarity score range for two dissimilar strings", () => {
      const result = computeSimilarity("test", "sack");
      expect(result).toBeLessThan(0.3);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe("computecomputeJaroWinklerDistanceDistance should", () => {
    it("return 1.0 for identical strings", () => {
      const s1 = "application";
      const s2 = "application";
      const result = computeJaroWinklerDistance(s1, s2);
      expect(result).toBeCloseTo(1.0, 5); // Exact match
    });

    it("return a high score for strings with a common prefix", () => {
      const s1 = "appl";
      const s2 = "application";
      const result = computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.8); // Partial prefix match
    });

    it("return 0.0 for completely different strings", () => {
      const s1 = "hello";
      const s2 = "rag";
      const result = computeJaroWinklerDistance(s1, s2);
      expect(result).toBe(0.0); // No similarity
    });

    it("handle strings with transpositions", () => {
      const s1 = "applciation";
      const s2 = "application";
      const result = computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.9); // Similar but with transpositions
    });

    it("handle strings with partial similarity", () => {
      const s1 = "kitten";
      const s2 = "sitting";
      const result = computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.7); // Partial similarity
    });
  });

  describe("computeAverageSimilarity should", () => {
    it("return 0 if the object is empty", () => {
      const result = computeStringObjectSimilarity("test", {});
      expect(result).toBe(0);
    });

    it("return 0 if the object is null", () => {
      const result = computeStringObjectSimilarity("test", null);
      expect(result).toBe(0);
    });

    it("return 0 if the object is not an object", () => {
      const result = computeStringObjectSimilarity("test", {
        title: "Test",
        description: "This is a test",
      });
      expect(result).toBeGreaterThan(0.5);
    });

    it("return the correct average similarity score for an object", () => {
      const result = computeStringObjectSimilarity("appl", {
        name: "apple",
        category: "fruit",
        price: 1.2,
      });
      expect(result).toBeGreaterThan(0.5);
    });
  });
});
