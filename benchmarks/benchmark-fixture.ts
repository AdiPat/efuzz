import * as Benchmark from "benchmark";

const getBenchmarkSuite = () => {
  const suite = new Benchmark.Suite();
  return suite;
};

export const BenchmarkFixtureModule = {
  getBenchmarkSuite,
};
