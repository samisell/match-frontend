'use server';

/**
 * @fileOverview AI-powered profile analyzer to suggest improvements based on successful match criteria.
 *
 * - analyzeProfile - A function that analyzes the user profile and suggests improvements.
 * - AIProfileAnalyzerInput - The input type for the analyzeProfile function.
 * - AIProfileAnalyzerOutput - The return type for the analyzeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProfileAnalyzerInputSchema = z.object({
  profileDetails: z
    .string()
    .describe('Detailed description of the user profile, including personal information, lifestyle, preferences, and interests.'),
  successfulMatchCriteria: z
    .string()
    .describe('Criteria that define successful matches on the platform.'),
});
export type AIProfileAnalyzerInput = z.infer<typeof AIProfileAnalyzerInputSchema>;

const AIProfileAnalyzerOutputSchema = z.object({
  suggestedImprovements: z
    .string()
    .describe('AI-suggested improvements for the user profile to attract compatible matches, based on successful match criteria.'),
});
export type AIProfileAnalyzerOutput = z.infer<typeof AIProfileAnalyzerOutputSchema>;

export async function analyzeProfile(input: AIProfileAnalyzerInput): Promise<AIProfileAnalyzerOutput> {
  return aiProfileAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProfileAnalyzerPrompt',
  input: {schema: AIProfileAnalyzerInputSchema},
  output: {schema: AIProfileAnalyzerOutputSchema},
  prompt: `You are an AI profile analyzer designed to provide suggestions for improving user profiles on a matchmaking platform. Analyze the user profile based on successful match criteria and provide specific, actionable suggestions to attract compatible matches.

User Profile Details: {{{profileDetails}}}

Successful Match Criteria: {{{successfulMatchCriteria}}}

Based on the profile details and the successful match criteria, what specific improvements can be made to the profile to increase its attractiveness to potential matches? Focus on highlighting key attributes and interests that align with the criteria.`,
});

const aiProfileAnalyzerFlow = ai.defineFlow(
  {
    name: 'aiProfileAnalyzerFlow',
    inputSchema: AIProfileAnalyzerInputSchema,
    outputSchema: AIProfileAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
