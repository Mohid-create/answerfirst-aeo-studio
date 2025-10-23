'use server';

import { generateConciseAnswer, type GenerateConciseAnswerInput } from '@/ai/flows/generate-concise-answer';
import { predictAeoScore, type PredictAeoScoreInput } from '@/ai/flows/predict-aeo-score';
import { rewriteContent, type RewriteContentInput } from '@/ai/flows/rewrite-content';

export async function getAnalysis(data: { query: string; content: string }) {
  try {
    const aeoScoreInput: PredictAeoScoreInput = {
      query: data.query,
      text: data.content,
    };

    const conciseAnswerInput: GenerateConciseAnswerInput = {
      question: data.query,
      text: data.content,
      maxLength: 150, // default
      readabilityLevel: '8th grade', // default
    };

    const [aeoScore, conciseAnswer] = await Promise.all([
      predictAeoScore(aeoScoreInput),
      generateConciseAnswer(conciseAnswerInput),
    ]);

    return { success: true, data: { aeoScore, conciseAnswer } };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze content. Please check your API key and try again.' };
  }
}

export async function getRewrites(data: RewriteContentInput) {
  try {
    const rewrittenContent = await rewriteContent(data);
    return { success: true, data: rewrittenContent };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate rewrites. Please check your API key and try again.' };
  }
}
