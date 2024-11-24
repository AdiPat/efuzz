import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { efuzz } from "../index";

describe("efuzz should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("have an efuzz method defined", () => {
    expect(efuzz).toBeDefined();
  });

  it("called efuzz should return a search method", () => {
    const search = efuzz([]);
    expect(search).toBeDefined();
  });

  it("search method should return a list when given search query and threshold", async () => {
    const query = "test";
    const threshold = 0.5;
    const search = efuzz([]);
    const result = await search(query, { threshold });
    expect(result).toEqual([]);
  });

  it.each([-1, -0.5, 1.01, 4, 100])(
    "throw an error if invalid threshold (%s) is passed",
    async (threshold) => {
      const query = "test";
      const search = efuzz([]);
      const promise = search(query, { threshold });
      await expect(promise).rejects.toThrowError(
        "Invalid threshold value. Threshold must be a number between 0 and 1."
      );
      ``;
    }
  );

  it("use threshold as 0.5 if no threshold is passed", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const query = "test";
    const search = efuzz([]);
    const result = await search(query);
    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Threshold not provided. Using default 0.5."
    );
  });

  it.each([undefined, null])(
    "use threshold as 0.5 if threshold is %s",
    async (threshold) => {
      const consoleSpy = vi.spyOn(console, "log");
      const query = "test";
      const search = efuzz([]);
      const result = await search(query, { threshold } as any);
      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Threshold not provided. Using default 0.5."
      );
    }
  );

  it("return correct fuzzy matches", async () => {
    const search = efuzz(["apple", "application", "orange"]);
    const results = await search("appl", { threshold: 0.6 });

    expect(results).toEqual(["apple", "application"]);
  });

  it("return an empty array for no matches", async () => {
    const search = efuzz(["apple", "application", "orange"]);
    const results = await search("banana", { threshold: 0.8 });

    expect(results).toEqual([]);
  });

  it("correctly return the fuzzy matches for a set of objects and a string search query", async () => {
    const records = [
      { name: "apple", category: "fruit", price: 1.2 },
      { name: "application", category: "software", price: 99.99 },
      { name: "orange", category: "fruit", price: 0.8 },
      { name: "banana", category: "fruit", price: 1.0 },
      { name: "grapes", category: "fruit", price: 2.5 },
      { name: "mango", category: "fruit", price: 1.8 },
      { name: "kiwi", category: "fruit", price: 2.2 },
      { name: "peach", category: "fruit", price: 1.5 },
      { name: "pear", category: "fruit", price: 1.3 },
      { name: "plum", category: "fruit", price: 1.0 },
      { name: "pineapple", category: "fruit", price: 3.0 },
    ];

    const search = efuzz(records);

    const results = await search("appl", { threshold: 0.6 });

    expect(results).toEqual([
      { name: "apple", category: "fruit", price: 1.2 },
      { name: "application", category: "software", price: 99.99 },
    ]);
  });

  it("return no matches for a set of objects and a mismatched string search query", async () => {
    const records = [
      { name: "apple", category: "fruit", price: 1.2 },
      { name: "application", category: "software", price: 99.99 },
      { name: "orange", category: "fruit", price: 0.8 },
      { name: "banana", category: "fruit", price: 1.0 },
      { name: "grapes", category: "fruit", price: 2.5 },
      { name: "mango", category: "fruit", price: 1.8 },
      { name: "kiwi", category: "fruit", price: 2.2 },
      { name: "peach", category: "fruit", price: 1.5 },
      { name: "pear", category: "fruit", price: 1.3 },
      { name: "plum", category: "fruit", price: 1.0 },
      { name: "pineapple", category: "fruit", price: 3.0 },
    ];

    const search = efuzz(records);

    const results = await search("kamikaze", { threshold: 0.6 });

    expect(results).toEqual([]);
  });
});
