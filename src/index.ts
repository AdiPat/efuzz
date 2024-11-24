export const efuzz = (_records: any[]) => {
  const search = async (
    _query: string,
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

    return [];
  };

  return search;
};
