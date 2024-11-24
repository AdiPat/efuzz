import { computeSimilarity } from "./string-tools";

export const efuzz = (records: any[]) => {
  const search = async (
    query: string,
    options?: { threshold?: number }
  ): Promise<any[]> => {
    let { threshold } = options || {};

    if (!threshold) {
      console.log("Threshold not provided. Using default 0.5.");
      threshold = 0.5;
    }

    if (threshold && (threshold < 0 || threshold > 1)) {
      throw new Error(
        "Invalid threshold value. Threshold must be a number between 0 and 1."
      );
    }

    const results = records.filter((record) => {
      const score = computeSimilarity(query, record);
      return score > threshold;
    });
    return results;
  };

  return search;
};
