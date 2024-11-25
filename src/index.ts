import { getSearchHandler } from "./search-handlers";
import { validateAndGetThreshold } from "./utils";
import * as Constants from "./constants";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any>,
    options?: { threshold?: number; count?: number }
  ): Promise<any[]> => {
    const threshold = validateAndGetThreshold(options?.threshold);
    const count = options?.count ?? Constants.DEFAULT_RECORDS_RETURN_COUNT;
    const searchHandler = getSearchHandler(query, records);
    const results = searchHandler(records, query, threshold);
    const sortedResults = results.sort((a: any, b: any) => b.score - a.score);
    return sortedResults.slice(0, count).map((result: any) => result.record);
  };

  return search;
};
