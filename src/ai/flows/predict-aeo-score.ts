'use server';
/**
 * @fileOverview Predicts the likelihood of content being used as an answer by AI and provides a breakdown of contributing factors.
 *
 * - predictAeoScore - A function that handles the AEO score prediction process.
 * - PredictAeoScoreInput - The input type for the predictAeoScore function.
 * - PredictAeoScoreOutput - The return type for the predictAeoScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictAeoScoreInputSchema = z.object({
  query: z.string().describe('The search query or question.'),
  text: z.string().describe('The content to be evaluated for AEO score.'),
});
export type PredictAeoScoreInput = z.infer<typeof PredictAeoScoreInputSchema>;

const PredictAeoScoreOutputSchema = z.object({
  aeoScore: z.number().describe('The overall AEO score (0-100).'),
  breakdown: z.object({
    lengthScore: z.number().describe('Score based on content length.'),
    structureScore: z.number().describe('Score based on content structure (lists, tables, etc.).'),
    schemaScore: z.number().describe('Score based on the presence of schema markup.'),
    intentMatchScore: z.number().describe('Score based on the semantic similarity between query and content.'),
    readabilityScore: z.number().describe('Score based on the readability of the content.'),
  }).describe('A breakdown of the factors contributing to the AEO score.'),
  suggestions: z.array(z.string()).describe('Suggestions for improving the content AEO score.'),
});
export type PredictAeoScoreOutput = z.infer<typeof PredictAeoScoreOutputSchema>;

export async function predictAeoScore(input: PredictAeoScoreInput): Promise<PredictAeoScoreOutput> {
  return predictAeoScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictAeoScorePrompt',
  input: {schema: PredictAeoScoreInputSchema},
  output: {schema: PredictAeoScoreOutputSchema},
  prompt: `You are an AI content optimization expert. Your task is to predict the likelihood of a given text being used as an answer by AI, based on the provided search query.

  Analyze the following content and provide an AEO score (0-100), along with a breakdown of the contributing factors (length, structure, schema, intent match, readability) and suggestions for improvement.

  Query: {{{query}}}
  Content: {{{text}}}

  Provide the output in JSON format.
  The aeoScore is a number between 0 and 100.
  The breakdown contains lengthScore, structureScore, schemaScore, intentMatchScore, and readabilityScore, each a number between 0 and 100.
  The suggestions is a list of strings.
`,
});

const predictAeoScoreFlow = ai.defineFlow(
  {
    name: 'predictAeoScoreFlow',
    inputSchema: PredictAeoScoreInputSchema,
    outputSchema: PredictAeoScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
