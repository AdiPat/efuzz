import { describe, it, expect } from "vitest";
import { main } from "../index";

describe("index", () => {
  it("should have a main method", () => {
    expect(main).toBeDefined();
  });
});
