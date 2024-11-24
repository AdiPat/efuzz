import { get as levenshtein } from "fast-levenshtein";
import { jaroWinkler } from "@skyra/jaro-winkler";

export const computeJaroWinklerDistance = (s: string, t: string): number => {
  return jaroWinkler(s, t);
};

export const computeSimilarity = (s: string, t: string): number => {
  if (s === t) {
    return 1;
  }
  const distance = levenshtein(s, t);
  const maxLength = Math.max(s.length, t.length);
  const levScore = 1 - distance / maxLength;
  const jwScore = computeJaroWinklerDistance(s, t);
  const netScore = (levScore + jwScore) / 2;
  return netScore;
};
