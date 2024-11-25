import { get as levenshtein } from "fast-levenshtein";
import { jaroWinkler } from "@skyra/jaro-winkler";
import { ScoreFunction } from "./models";

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
  const netScore = Math.max(levScore, jwScore);
  return netScore;
};

export const computeStringObjectSimilarity = (
  query: string,
  obj: any,
  options?: {
    scoreFunction: ScoreFunction;
  }
): number => {
  const scoreFunction = options?.scoreFunction ?? computeSimilarity;
  let maxScore = 0;

  const computeScore = (query: string, obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        computeScore(query, obj[key]);
      } else {
        const curScore = scoreFunction(query, String(obj[key]));
        maxScore = Math.max(maxScore, curScore);
      }
    }
  };

  computeScore(query, obj);
  return maxScore;
};

export const computeObjectSimilarity = (
  p: any,
  q: any,
  options?: {
    scoreFunction: ScoreFunction;
  }
): number => {
  const scoreFunction = options?.scoreFunction ?? computeSimilarity;
  let totalScore = 0;
  let fieldCount = 0;

  const computeScore = (obj1: any, obj2: any) => {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (
          typeof obj1[key] === "object" &&
          obj1[key] !== null &&
          typeof obj2[key] === "object" &&
          obj2[key] !== null
        ) {
          computeScore(obj1[key], obj2[key]);
        } else {
          totalScore += scoreFunction(String(obj1[key]), String(obj2[key]));
          fieldCount++;
        }
      }
    }
  };

  computeScore(p, q);
  return fieldCount === 0 ? 0 : totalScore / fieldCount;
};
