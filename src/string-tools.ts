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

export const computeStringObjectSimilarity = (
  query: string,
  obj: any
): number => {
  let maxScore = 0;

  const computeScore = (query: string, obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        computeScore(query, obj[key]);
      } else {
        const curScore = computeSimilarity(query, String(obj[key]));
        maxScore = Math.max(maxScore, curScore);
      }
    }
  };

  computeScore(query, obj);
  return maxScore;
};
