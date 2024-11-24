export const isArrayofObjects = (arr: any[]): boolean => {
  if (arr.length === 0) {
    return false;
  }

  return (
    Array.isArray(arr) &&
    arr.every((item) => typeof item === "object" && item !== null)
  );
};
