import { describe, it, expect, vi } from "vitest";
import { efuzz } from "../index";
import { afterEach, beforeEach } from "node:test";

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
});
