import * as Benchmark from "benchmark";
import fuzzysort from "fuzzysort";
import { faker } from "@faker-js/faker";
import { efuzz } from "../src";

const suite = new Benchmark.Suite();

const createRandomFruit = () => {
  return {
    name: faker.person.firstName(),
    category: "fruit",
    price: faker.number.int(),
    description: faker.lorem.sentence(),
  };
};

const data = new Array(1000).fill(null).map(() => createRandomFruit());

console.log("Benchmarking efuzz vs fuzzysort");

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
