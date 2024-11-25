import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Utils } from "../utils";

describe("utils should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("isArrayofObjects should", () => {
    it("return true if array is an array of objects", () => {
      const result = Utils.isArrayofObjects([{ a: 1 }, { b: 2 }]);
      expect(result).toBe(true);
    });

    it("return false if array is not an array of objects", () => {
      const result = Utils.isArrayofObjects([1, 2, 3]);
      expect(result).toBe(false);
    });

    it("return false if array is empty", () => {
      const result = Utils.isArrayofObjects([]);
      expect(result).toBe(false);
    });

    it("return false if array contains mix of objects and other types", () => {
      const records = [{ a: 1 }, { b: 2 }, 3, "test"];
      const result = Utils.isArrayofObjects(records);
      expect(result).toBe(false);
    });
  });
});
