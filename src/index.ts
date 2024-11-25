import { eFuzzSearchOptions } from "./models";
import { getSearchHandler } from "./search-handlers";
import { Utils } from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any> | string[],
    options?: eFuzzSearchOptions
  ): Promise<any[]> => {
    const { count } = Utils.validateAndGetCountAndTotalRecords(
      options?.count,
      records
    );
    const includeScores = options?.includeScores ?? false;
    const scoreFunction = options?.scoreFunction ?? undefined;

    if (Array.isArray(query)) {
      return batchSearch(
        options?.threshold,
        query,
        records,
        scoreFunction,
        count,
        includeScores
      );
    }

    try {
      return oneSearch(
        options?.threshold,
        query,
        records,
        scoreFunction,
        count,
        includeScores
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Error: eFuzz search failed due to '${error.message}'`);
    }
  };

  return search;
};

const oneSearch = (
  threshold: number | undefined,
  query: string | Record<string, any>,
  records: any[],
  scoreFunction: (s: string, t: string) => number,
  count: number,
  includeScores: boolean
) => {
  const updatedThreshold = Utils.validateAndGetThreshold(threshold);
  const searchHandler = getSearchHandler(query, records);
  const results = searchHandler(
    records,
    query,
    updatedThreshold,
    scoreFunction
  );
  return Utils.prepareSearchResults(results, count, includeScores);
};

const batchSearch = (
  threshold: number | undefined,
  query: any[] | string[],
  records: any[],
  scoreFunction: (s: string, t: string) => number,
  count: number,
  includeScores: boolean
) => {
  const updatedThreshold = Utils.validateAndGetThreshold(threshold);
  return query.map((q) =>
    oneSearch(updatedThreshold, q, records, scoreFunction, count, includeScores)
  );
};
