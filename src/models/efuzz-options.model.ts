export interface eFuzzSearchOptions {
  threshold?: number;
  count?: number;
  includeScores?: boolean;
  scoreFunction?: (s: string, t: string) => number;
}
