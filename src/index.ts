import { getSearchHandler } from "./search-handlers";
import { Utils } from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any>,
    options?: { threshold?: number; count?: number; includeScores?: boolean }
  ): Promise<any[]> => {
    const { count } = Utils.validateAndGetCountAndTotalRecords(
      options?.count,
      records
    );

    try {
      const includeScores = options?.includeScores ?? false;
      const threshold = Utils.validateAndGetThreshold(options?.threshold);
      const searchHandler = getSearchHandler(query, records);
      const results = searchHandler(records, query, threshold);
      return Utils.prepareSearchResults(results, count, includeScores);
    } catch (error) {
      console.error(error);
      throw new Error(`Error: eFuzz search failed due to '${error.message}'`);
    }
  };

  return search;
};
