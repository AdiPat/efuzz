import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BasicBenchmarkModule, BasicBenchmarkRunner } from "../basic_benchmark";
import { BenchmarkFixtureModule } from "../benchmark_fixture";

describe("efuzz should", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getData should", () => {
    it("return an array of 1000 elements", () => {
      const data = BasicBenchmarkModule.getData();
      expect(data.length).toBe(1000);
    });
  });

  describe("getBenchmarkSuite should", () => {
    it("return a Benchmark.Suite instance", () => {
      const suite = BenchmarkFixtureModule.getBenchmarkSuite();
      expect(suite).toBeDefined();
    });
  });

  describe("runBenchmarks should", () => {
    it("run the benchmarks", async () => {
      const suite = BenchmarkFixtureModule.getBenchmarkSuite();
      const addSpy = vi.spyOn(suite, "add");
      const onSpy = vi.spyOn(suite, "on");
      const runSpy = vi.spyOn(suite, "run");
      await BasicBenchmarkRunner.runBenchmarks(suite);
      expect(addSpy).toHaveBeenCalledTimes(2);
      expect(onSpy).toHaveBeenCalledTimes(2);
      expect(runSpy).toHaveBeenCalled();
      expect(runSpy).toHaveBeenCalledWith({ async: true });
    });
  });

  describe("run should", () => {
    it("log the banner on start", async () => {
      const consoleSpy = vi.spyOn(console, "log");
      await BasicBenchmarkModule.run();
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Benchmarking efuzz vs fuzzysort"
      );
    });

    it("call getBenchmarkSuite", async () => {
      const getBenchmarkSuiteSpy = vi.spyOn(
        BenchmarkFixtureModule,
        "getBenchmarkSuite"
      );
      await BasicBenchmarkModule.run();
      expect(getBenchmarkSuiteSpy).toHaveBeenCalled();
    });

    it("call runBenchmarks", async () => {
      const suite = BenchmarkFixtureModule.getBenchmarkSuite();
      const getBenchmarkSuiteSpy = vi
        .spyOn(BenchmarkFixtureModule, "getBenchmarkSuite")
        .mockReturnValue(suite);
      getBenchmarkSuiteSpy.mockReturnValue(suite);
      const runBenchmarksSpy = vi.spyOn(BasicBenchmarkRunner, "runBenchmarks");
      await BasicBenchmarkModule.run();
      expect(runBenchmarksSpy).toHaveBeenCalled();
      expect(runBenchmarksSpy).toHaveBeenCalledWith(suite);
    });
  });
});
