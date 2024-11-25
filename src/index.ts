import { getSearchHandler } from "./search-handlers";
import * as Constants from "./constants";
import { Utils } from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any>,
    options?: { threshold?: number; count?: number }
  ): Promise<any[]> => {
    try {
      const threshold = Utils.validateAndGetThreshold(options?.threshold);
      const count = options?.count ?? Constants.DEFAULT_RECORDS_RETURN_COUNT;
      const searchHandler = getSearchHandler(query, records);
      const results = searchHandler(records, query, threshold);
      const sortedResults = results.sort((a: any, b: any) => b.score - a.score);
      return sortedResults.slice(0, count).map((result: any) => result.record);
    } catch (error) {
      console.error(error);
      throw new Error(`Error: eFuzz search failed due to '${error.message}'`);
    }
  };

  return search;
};
