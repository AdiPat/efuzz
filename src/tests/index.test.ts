import { describe, it, expect } from "vitest";
import { efuzz } from "../index";

describe("efuzz should", () => {
  it("have an efuzz method defined", () => {
    expect(efuzz).toBeDefined();
  });

  it("called efuzz should return a search method", () => {
    const search = efuzz([]);
    expect(search).toBeDefined();
  });

  it("search method should return a list when given search query and threshold", () => {
    const query = "test";
    const threshold = 0.5;
    const search = efuzz([]);
    const result = search(query, { threshold });
    expect(result).toEqual([]);
  });
});
