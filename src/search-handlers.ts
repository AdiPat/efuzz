import * as StringTools from "./string-tools";
import { Utils } from "./utils";

const handleTwoTypedSearch = (
  records: any[],
  query: string | Record<string, any>,
  threshold: number,
  typedScoreCalculator: Function
) =>
  records
    .map((record) => ({ record, score: typedScoreCalculator(query, record) }))
    .filter((recordWithScore) => recordWithScore.score >= threshold);

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
