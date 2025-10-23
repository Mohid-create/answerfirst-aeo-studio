// src/ai/flows/rewrite-content.ts
'use server';
/**
 * @fileOverview A content rewriting AI agent.
 *
 * - rewriteContent - A function that handles the content rewriting process.
 * - RewriteContentInput - The input type for the rewriteContent function.
 * - RewriteContentOutput - The return type for the rewriteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteContentInputSchema = z.object({
  text: z.string().describe('The text to be rewritten.'),
  style: z
    .enum(['concise', 'conversational', 'voice-search friendly', 'formal'])
    .describe('The desired style of the rewritten content.'),
  maxLength: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('The maximum length of the rewritten content in characters.'),
});
export type RewriteContentInput = z.infer<typeof RewriteContentInputSchema>;

const RewriteContentOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten content.'),
});
export type RewriteContentOutput = z.infer<typeof RewriteContentOutputSchema>;

export async function rewriteContent(input: RewriteContentInput): Promise<RewriteContentOutput> {
  return rewriteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteContentPrompt',
  input: {schema: RewriteContentInputSchema},
  output: {schema: RewriteContentOutputSchema},
  prompt: `You are a content rewriting expert. You will rewrite the given text in the specified style, adhering to the maximum length if provided.

Original Text: {{{text}}}
Style: {{{style}}}
Maximum Length: {{#if maxLength}}{{{maxLength}}} characters{{else}}No limit{{/if}}

Rewritten Text:`,
});

const rewriteContentFlow = ai.defineFlow(
  {
    name: 'rewriteContentFlow',
    inputSchema: RewriteContentInputSchema,
    outputSchema: RewriteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
