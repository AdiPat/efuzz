import { describe, it, expect } from "vitest";
import * as StringTools from "../string-tools";

describe("string-tools should", () => {
  describe("computeSimilarity should", () => {
    it("compute the levenshtein distance between two strings", () => {
      const result = StringTools.computeSimilarity("test", "test");
      expect(result).toBe(1);
    });

    it("return 0 if the strings are not the same", () => {
      const result = StringTools.computeSimilarity("test", "ballpark");
      expect(result).toBe(0);
    });

    it("compute the correct similarity score range for two similar strings", () => {
      const result = StringTools.computeSimilarity("test", "tast");
      expect(result).toBeGreaterThan(0.7);
      expect(result).toBeLessThan(1);
    });

    it("compute the correct similarity score range for two dissimilar strings", () => {
      const result = StringTools.computeSimilarity("test", "hoko");
      expect(result).toBeLessThan(0.3);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe("computecomputeJaroWinklerDistanceDistance should", () => {
    it("return 1.0 for identical strings", () => {
      const s1 = "application";
      const s2 = "application";
      const result = StringTools.computeJaroWinklerDistance(s1, s2);
      expect(result).toBeCloseTo(1.0, 5); // Exact match
    });

    it("return a high score for strings with a common prefix", () => {
      const s1 = "appl";
      const s2 = "application";
      const result = StringTools.computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.8); // Partial prefix match
    });

    it("return 0.0 for completely different strings", () => {
      const s1 = "hello";
      const s2 = "rag";
      const result = StringTools.computeJaroWinklerDistance(s1, s2);
      expect(result).toBe(0.0); // No similarity
    });

    it("handle strings with transpositions", () => {
      const s1 = "applciation";
      const s2 = "application";
      const result = StringTools.computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.9); // Similar but with transpositions
    });

    it("handle strings with partial similarity", () => {
      const s1 = "kitten";
      const s2 = "sitting";
      const result = StringTools.computeJaroWinklerDistance(s1, s2);
      expect(result).toBeGreaterThan(0.7); // Partial similarity
    });
  });

  describe("computeStringObjectSimilarity should", () => {
    it("return 0 if the object is empty", () => {
      const result = StringTools.computeStringObjectSimilarity("test", {});
      expect(result).toBe(0);
    });

    it("return 0 if the object is null", () => {
      const result = StringTools.computeStringObjectSimilarity("test", null);
      expect(result).toBe(0);
    });

    it("return 0 if the object is not an object", () => {
      const result = StringTools.computeStringObjectSimilarity("test", {
        title: "Test",
        description: "This is a test",
      });
      expect(result).toBeGreaterThan(0.5);
    });

    it("return the correct average similarity score for an object", () => {
      const result = StringTools.computeStringObjectSimilarity("appl", {
        name: "apple",
        category: "fruit",
        price: 1.2,
      });
      expect(result).toBeGreaterThan(0.5);
    });

    it("return the correct average similarity score for a nested object", () => {
      const result = StringTools.computeStringObjectSimilarity("re", {
        name: "apple",
        category: "fruit",
        price: 1.2,
        details: {
          color: "red",
          origin: "India",
        },
      });
      expect(result).toBeGreaterThan(0.5);
    });

    it("return the correct average similarity score for a nested object with matching text inside array", () => {
      const result = StringTools.computeStringObjectSimilarity("re", {
        name: "apple",
        category: "fruit",
        price: 1.2,
        details: {
          color: "pink",
          origin: "India",
          tags: ["red", "fruit", "apple"],
        },
      });
      expect(result).toBeGreaterThan(0.5);
    });
  });

  describe("computeObjectSimilarity", () => {
    it("return 0 if both the objects are empty", () => {
      const result = StringTools.computeObjectSimilarity({}, {});
      expect(result).toBe(0);
    });

    it("return 0 if the objects are null", () => {
      const result = StringTools.computeObjectSimilarity(null, null);
      expect(result).toBe(0);
    });

    it("return the correct similarity score for two similar objects", () => {
      const result = StringTools.computeObjectSimilarity(
        { title: "Test", description: "This is a test" },
        { title: "Test", description: "This is a test" }
      );
      expect(result).toBe(1);
    });

    it("return the correct similarity score for two dissimilar objects", () => {
      const result = StringTools.computeObjectSimilarity(
        { title: "Test", description: "This is a test" },
        { title: "Hello", description: "World" }
      );
      expect(result).toBeLessThan(0.3);
    });

    it("return the correct similarity score for two similar nested objects", () => {
      const result = StringTools.computeObjectSimilarity(
        {
          title: "Test",
          description: "This is a test",
          details: {
            color: "red",
            origin: "India",
          },
        },
        {
          title: "Test",
          description: "This is a test",
          details: {
            color: "red",
            origin: "India",
          },
        }
      );
      expect(result).toBe(1);
    });

    it("return the correct similarity score for two dissimilar nested objects", () => {
      const result = StringTools.computeObjectSimilarity(
        {
          title: "Test",
          description: "This is a test",
          details: {
            color: "red",
            origin: "India",
          },
        },
        {
          title: "Test",
          description: "This is a test",
          details: {
            color: "blue",
            origin: "China",
          },
        }
      );
      expect(result).toBeGreaterThan(0.6);
    });
  });
});
