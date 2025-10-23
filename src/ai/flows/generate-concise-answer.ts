'use server';
/**
 * @fileOverview A flow for generating concise, canonical answers optimized for answer engines.
 *
 * - generateConciseAnswer - A function that generates a concise answer.
 * - GenerateConciseAnswerInput - The input type for the generateConciseAnswer function.
 * - GenerateConciseAnswerOutput - The return type for the generateConciseAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConciseAnswerInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  text: z.string().describe('The text to extract the answer from.'),
  maxLength: z.number().describe('The maximum length of the answer in characters.'),
  readabilityLevel: z.string().describe('The desired readability level of the answer.'),
});
export type GenerateConciseAnswerInput = z.infer<typeof GenerateConciseAnswerInputSchema>;

const GenerateConciseAnswerOutputSchema = z.object({
  answer: z.string().describe('The concise, canonical answer.'),
});
export type GenerateConciseAnswerOutput = z.infer<typeof GenerateConciseAnswerOutputSchema>;

export async function generateConciseAnswer(
  input: GenerateConciseAnswerInput
): Promise<GenerateConciseAnswerOutput> {
  return generateConciseAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConciseAnswerPrompt',
  input: {schema: GenerateConciseAnswerInputSchema},
  output: {schema: GenerateConciseAnswerOutputSchema},
  prompt: `You are an editor that must produce a single-sentence concise answer to the question: {{{question}}}. The answer must be no more than {{maxLength}} characters, avoid marketing language, be factual, and be suitable for voice assistant readout. Use the following text as the source for your answer: {{{text}}}. The answer should be at the readability level of: {{{readabilityLevel}}}.`,
});

const generateConciseAnswerFlow = ai.defineFlow(
  {
    name: 'generateConciseAnswerFlow',
    inputSchema: GenerateConciseAnswerInputSchema,
    outputSchema: GenerateConciseAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
