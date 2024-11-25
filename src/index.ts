import * as Constants from "./constants";
import * as StringTools from "./string-tools";
import * as Utils from "./utils";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string | Record<string, any>,
    options?: { threshold?: number }
  ): Promise<any[]> => {
    const threshold = validateAndGetThreshold(options?.threshold);

    if (typeof query === "object") {
      return records.filter((record) => {
        const score = StringTools.computeObjectSimilarity(query, record);
        return score > threshold;
      });
    }

    if (Utils.isArrayofObjects(records)) {
      return handleObjectArraySearch(records, query, threshold);
    }

    return handleStringArraySearch(records, query, threshold);
  };

  return search;
};

const validateAndGetThreshold = (threshold: number | undefined): number => {
  if (!threshold) {
    console.log("Threshold not provided. Using default 0.5.");
    return Constants.DEFAULT_THRESHOLD;
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
    const score = StringTools.computeSimilarity(query, record);
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
    const averageScore = StringTools.computeStringObjectSimilarity(
      query,
      record
    );
    return averageScore > threshold;
  });

  return results;
};
