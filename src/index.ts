import { CONSTANTS } from "./constants";
import {
  computeStringObjectSimilarity,
  computeSimilarity,
} from "./string-tools";
import { isArrayofObjects } from "./utils";

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

export const efuzz = (records: any[]) => {
  const search = async (
    query: string,
    options?: { threshold?: number }
  ): Promise<any[]> => {
    let { threshold } = options || {};

    threshold = validateAndGetThreshold(threshold);

    if (isArrayofObjects(records)) {
      const results = records.filter((record) => {
        const averageScore = computeStringObjectSimilarity(query, record);
        return averageScore > threshold;
      });

      return results;
    }

    const results = records.filter((record) => {
      const score = computeSimilarity(query, record);
      return score > threshold;
    });
    return results;
  };

  return search;
};
