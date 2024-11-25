import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSearchHandler, searchHandlers } from "../search-handlers";

describe("search-handler should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getSearchHandler should", () => {
    it("return stringArray handler for string query and string array records", () => {
      const query = "test";
      const records = [{ a: 1 }, { b: 2 }];
      const searchHandler = getSearchHandler(query, records);
      expect(searchHandler).toEqual(searchHandlers.stringObjectArray);
    });

    it("return stringArray handler for string query and string array records", () => {
      const query = "test";
      const records = ["test", "test2"];
      const searchHandler = getSearchHandler(query, records);
      expect(searchHandler).toEqual(searchHandlers.stringArray);
    });

    it("return stringArray handler for string query and string array records", () => {
      const query = { a: 1 };
      const records = [{ a: 1 }, { b: 2 }];
      const searchHandler = getSearchHandler(query, records);
      expect(searchHandler).toEqual(searchHandlers.objectArray);
    });
  });
});
