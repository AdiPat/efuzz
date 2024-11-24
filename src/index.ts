import { CONSTANTS } from "./constants";
import {
  computeStringObjectSimilarity,
  computeSimilarity,
} from "./string-tools";
import { isArrayofObjects } from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string,
    options?: { threshold?: number }
  ): Promise<any[]> => {
    const threshold = validateAndGetThreshold(options?.threshold);

    if (isArrayofObjects(records)) {
      return handleObjectArraySearch(records, query, threshold);
    }

    return handleStringArraySearch(records, query, threshold);
  };

  return search;
};

const validateAndGetThreshold = (threshold: number | undefined): number => {
  if (!threshold) {
    console.log("Threshold not provided. Using default 0.5.");
    return CONSTANTS.DEFAULT_THRESHOLD;
  }

  if (threshold && (threshold < 0 || threshold > 1)) {
    throw new Error(
      "Invalid threshold value. Threshold must be a number between 0 and 1."
    );
  }

  return threshold;
};

const handleStringArraySearch = (
  records: string[],
  query: string,
  threshold: number
) => {
  const results = records.filter((record) => {
    const score = computeSimilarity(query, record);
    return score > threshold;
  });

  return results;
};

const handleObjectArraySearch = (
  records: any[],
  query: string,
  threshold: number
) => {
  const results = records.filter((record) => {
    const averageScore = computeStringObjectSimilarity(query, record);
    return averageScore > threshold;
  });

  return results;
};
