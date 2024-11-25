import * as Constants from "./constants";

const isArrayofObjects = (arr: any[]): boolean => {
  if (arr.length === 0) {
    return false;
  }

  return (
    Array.isArray(arr) &&
    arr.every((item) => typeof item === "object" && item !== null)
  );
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

const validateAndGetCountAndTotalRecords = (
  count: number | undefined,
  records: any[]
): {
  count: number;
  totalRecords: number;
} => {
  const totalRecords = records.length;
  count =
    count ?? Math.min(Constants.DEFAULT_RECORDS_RETURN_COUNT, totalRecords);

  if (count > totalRecords) {
    throw new Error(
      `Count (${count}) cannot be greater than the number of records (${totalRecords}).`
    );
  }

  return {
    count,
    totalRecords,
  };
};

export const Utils = {
  isArrayofObjects,
  validateAndGetThreshold,
  validateAndGetCountAndTotalRecords,
};
