import { get as levenshtein } from "fast-levenshtein";

export const computeSimilarity = (s: string, t: string): number => {
  if (s === t) {
    return 1;
  }
  const distance = levenshtein(s, t);
  const maxLength = Math.max(s.length, t.length);
  return 1 - distance / maxLength;
};
