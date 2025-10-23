// Re-defining types for client-side usage to avoid importing server-only code.

export type AeoScoreBreakdown = {
  lengthScore: number;
  structureScore: number;
  schemaScore: number;
  intentMatchScore: number;
  readabilityScore: number;
};

export type AeoScore = {
  aeoScore: number;
  breakdown: AeoScoreBreakdown;
  suggestions: string[];
};

export type ConciseAnswer = {
  answer: string;
};

export type Rewrites = {
  rewrittenText: string;
};

export type AnalysisResult = {
  aeoScore: AeoScore;
  conciseAnswer: ConciseAnswer;
};
