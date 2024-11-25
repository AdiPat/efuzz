import { getSearchHandler } from "./search-handlers";
import { validateAndGetThreshold } from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any>,
    options?: { threshold?: number }
  ): Promise<any[]> => {
    const threshold = validateAndGetThreshold(options?.threshold);
    const searchHandler = getSearchHandler(query, records);
    return searchHandler(records, query, threshold);
  };

  return search;
};
