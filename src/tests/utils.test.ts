import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isArrayofObjects } from "../utils";

describe("utils should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("isArrayofObjects should", () => {
    it("return true if array is an array of objects", () => {
      const result = isArrayofObjects([{ a: 1 }, { b: 2 }]);
      expect(result).toBe(true);
    });

    it("return false if array is not an array of objects", () => {
      const result = isArrayofObjects([1, 2, 3]);
      expect(result).toBe(false);
    });

    it("return false if array is empty", () => {
      const result = isArrayofObjects([]);
      expect(result).toBe(false);
    });

    it("return false if array contains mix of objects and other types", () => {
      const records = [{ a: 1 }, { b: 2 }, 3, "test"];
      const result = isArrayofObjects(records);
      expect(result).toBe(false);
    });
  });
});
