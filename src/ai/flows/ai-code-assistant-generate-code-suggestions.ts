'use server';
/**
 * @fileOverview An AI code assistant that suggests code snippets based on a GitHub repository.
 *
 * - generateCodeSuggestions - A function that handles the code suggestion process.
 * - GenerateCodeSuggestionsInput - The input type for the generateCodeSuggestions function.
 * - GenerateCodeSuggestionsOutput - The return type for the generateCodeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSuggestionsInputSchema = z.object({
  githubRepoUrl: z.string().describe('The URL of the GitHub repository to analyze.'),
  prompt: z.string().describe('The prompt describing the desired code snippet.'),
});
export type GenerateCodeSuggestionsInput = z.infer<
  typeof GenerateCodeSuggestionsInputSchema
>;

const GenerateCodeSuggestionsOutputSchema = z.object({
  codeSuggestion: z.string().describe('The suggested code snippet.'),
});
export type GenerateCodeSuggestionsOutput = z.infer<
  typeof GenerateCodeSuggestionsOutputSchema
>;

export async function generateCodeSuggestions(
  input: GenerateCodeSuggestionsInput
): Promise<GenerateCodeSuggestionsOutput> {
  return generateCodeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSuggestionsPrompt',
  input: {schema: GenerateCodeSuggestionsInputSchema},
  output: {schema: GenerateCodeSuggestionsOutputSchema},
  prompt: `You are an AI code assistant. Analyze the code in the provided GitHub repository and suggest a code snippet that satisfies the following prompt.\n\nGitHub Repository URL: {{{githubRepoUrl}}}\nPrompt: {{{prompt}}}\n\nSuggested Code Snippet:`,
});

const generateCodeSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateCodeSuggestionsFlow',
    inputSchema: GenerateCodeSuggestionsInputSchema,
    outputSchema: GenerateCodeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
