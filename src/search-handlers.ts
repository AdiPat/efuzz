import * as StringTools from "./string-tools";
import * as Utils from "./utils";

const handleObjectArraySearch = (
  records: any[],
  query: string | Record<string, any>,
  threshold: number
) => {
  return records.filter((record) => {
    const score = StringTools.computeObjectSimilarity(query, record);
    return score > threshold;
  });
};

const handleStringArraySearch = (
  records: string[],
  query: string,
  threshold: number
) => {
  const results = records.filter((record) => {
    const score = StringTools.computeSimilarity(query, record);
    return score > threshold;
  });

  return results;
};

const handleStringObjectArraySearch = (
  records: any[],
  query: string,
  threshold: number
) => {
  const results = records.filter((record) => {
    const averageScore = StringTools.computeStringObjectSimilarity(
      query,
      record
    );
    return averageScore > threshold;
  });

  return results;
};

const searchHandlers = {
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
