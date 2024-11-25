import fuzzysort from "fuzzysort";
import * as Benchmark from "benchmark";
import { faker } from "@faker-js/faker";
import { efuzz } from "../src";
import { BenchmarkFixtureModule } from "./benchmark_fixture";

const createRandomFruit = () => {
  return {
    name: faker.person.firstName(),
    category: "fruit",
    price: faker.number.int(),
    description: faker.lorem.sentence(),
  };
};

const getData = () => {
  const data = new Array(1000).fill(null).map(() => createRandomFruit());
  return data;
};

const run = async () => {
  console.log("Benchmarking efuzz vs fuzzysort");
  const suite = BenchmarkFixtureModule.getBenchmarkSuite();
  await BasicBenchmarkRunner.runBenchmarks(suite);
};

const runBenchmarks = async (suite: Benchmark.Suite) => {
  const data = getData();
  suite
    .add("fuzzysort#test1", function () {
      fuzzysort.go("ho", data as any);
    })
    .add("efuzz#test2", async function () {
      const search = efuzz(data);
      await search("ho", { threshold: 0.5 });
    })
    .on("cycle", function (event: any) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    // run async
    .run({ async: true });
};

export const BasicBenchmarkRunner = {
  runBenchmarks,
};

export const BasicBenchmarkModule = {
  getData,
  run,
};

if (require.main === module) {
  run();
}
