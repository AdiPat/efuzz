import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { efuzz } from "../index";
import { Utils } from "../utils";

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
    await search(query);
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
      await search(query, { threshold } as any);
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

    const results = await search("appl", { threshold: 0.6, count: 2 });

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
    const results = await search("zolo", { threshold: 0.6 });
    expect(results).toEqual([]);
  });

  it("return correct fuzzy matches for a set of objects and an object search query", async () => {
    const records = [
      {
        name: "apple",
        category: "fruit",
        price: 1.2,
        details: {
          color: "red",
          origin: "India",
        },
      },
      {
        name: "application",
        category: "software",
        price: 99.99,
        details: {
          color: "blue",
          origin: "USA",
        },
      },
      {
        name: "orange",
        category: "fruit",
        price: 0.8,
        details: {
          color: "orange",
          origin: "Spain",
        },
      },
    ];

    const search = efuzz(records);

    const results = await search(
      {
        name: "orange",
        category: "software",
      },
      { threshold: 0.6 }
    );

    expect(results).toMatchObject([
      {
        name: "orange",
        category: "fruit",
        price: 0.8,
        details: {
          color: "orange",
          origin: "Spain",
        },
      },
      {
        name: "application",
        category: "software",
        price: 99.99,
        details: {
          color: "blue",
          origin: "USA",
        },
      },
    ]);
  });

  it.each([
    [2, 2, "ap"],
    [8, 8, "an"],
    [8, 7, "p"],
    [2, 2, "ki"],
  ])(
    "returns the specified count (%s) of results (expected: %s) when specified in the options for query (%s)",
    async (count, expectedCount, query) => {
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
      const results = await search(query, { threshold: 0.3, count });
      expect(results.length).toBe(expectedCount);
    }
  );

  it("should return the results in sorted order by score when count is specified", async () => {
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
    const results = await search("pp", { threshold: 0.3, count: 4 });
    expect(results).toEqual([
      { name: "apple", category: "fruit", price: 1.2 },
      { name: "pineapple", category: "fruit", price: 3.0 },
      { name: "application", category: "software", price: 99.99 },
      { name: "pear", category: "fruit", price: 1.3 },
    ]);
  });

  it("returns default 5 records if no records are specified", async () => {
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
    const results = await search("p", { threshold: 0 });
    expect(results.length).toBe(5);
  });

  it("throws a generic error if something fails in the search method", async () => {
    const errorMessage = "Arbitrary Error Message";
    const validateAndGetThresholdSpy = vi.spyOn(
      Utils,
      "validateAndGetThreshold"
    );
    validateAndGetThresholdSpy.mockImplementation((): any => {
      throw new Error(errorMessage);
    });
    const search = efuzz([]);
    const promise = search("apple", { threshold: 0.5 });

    await expect(promise).rejects.toThrowError(
      `Error: eFuzz search failed due to '${errorMessage}'`
    );
  });

  it("returns the score along with matches if the 'includeScores' flag is enabled", async () => {
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
    const results = await search("appl", {
      threshold: 0,
      count: 2,
      includeScores: true,
    });
    expect(results).toEqual([
      {
        record: { name: "apple", category: "fruit", price: 1.2 },
        score: expect.any(Number),
      },
      {
        record: { name: "application", category: "software", price: 99.99 },
        score: expect.any(Number),
      },
    ]);
  });
});
