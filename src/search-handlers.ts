import * as StringTools from "./string-tools";
import { Utils } from "./utils";

const handleTwoTypedSearch = (
  records: any[],
  query: string | Record<string, any>,
  threshold: number,
  typedScoreCalculator: Function
) =>
  records
    .filter((record) => {
      const averageScore = typedScoreCalculator(query, record);
      return averageScore > threshold;
    })
    .map((record) => {
      const score = typedScoreCalculator(query, record);
      return { record, score };
    });

const handleObjectArraySearch = (
  records: any[],
  query: string | Record<string, any>,
  threshold: number
) =>
  handleTwoTypedSearch(
    records,
    query,
    threshold,
    StringTools.computeObjectSimilarity
  );

const handleStringArraySearch = (
  records: string[],
  query: string,
  threshold: number
) =>
  handleTwoTypedSearch(
    records,
    query,
    threshold,
    StringTools.computeSimilarity
  );

const handleStringObjectArraySearch = (
  records: any[],
  query: string,
  threshold: number
) =>
  handleTwoTypedSearch(
    records,
    query,
    threshold,
    StringTools.computeStringObjectSimilarity
  );

export const searchHandlers = {
  stringArray: handleStringArraySearch,
  objectArray: handleObjectArraySearch,
  stringObjectArray: handleStringObjectArraySearch,
};

export const getSearchHandler = (
  query: string | Record<string, any>,
  records: any[]
): Function => {
  if (typeof query === "object") {
    return searchHandlers.objectArray;
  }

  if (Utils.isArrayofObjects(records)) {
    return searchHandlers.stringObjectArray;
  }

  return searchHandlers.stringArray;
};
