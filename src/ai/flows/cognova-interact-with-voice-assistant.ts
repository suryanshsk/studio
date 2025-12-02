'use server';

/**
 * @fileOverview Flow for interacting with the Cognova AI voice assistant.
 *
 * Exports:
 * - `interactWithCognova`: Function to send a voice query to Cognova and receive a text response.
 * - `InteractWithCognovaInput`: The input type for the interactWithCognova function.
 * - `InteractWithCognovaOutput`: The return type for the interactWithCognova function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractWithCognovaInputSchema = z.object({
  voiceQuery: z
    .string()
    .describe(
      'The voice query to send to the AI voice assistant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type InteractWithCognovaInput = z.infer<typeof InteractWithCognovaInputSchema>;

const InteractWithCognovaOutputSchema = z.object({
  textResponse: z.string().describe('The text response from the AI voice assistant.'),
});
export type InteractWithCognovaOutput = z.infer<typeof InteractWithCognovaOutputSchema>;

export async function interactWithCognova(input: InteractWithCognovaInput): Promise<InteractWithCognovaOutput> {
  return interactWithCognovaFlow(input);
}

const cognovaPrompt = ai.definePrompt({
  name: 'cognovaPrompt',
  input: {schema: InteractWithCognovaInputSchema},
  output: {schema: InteractWithCognovaOutputSchema},
  prompt: `You are Cognova, an AI-powered voice assistant. 

  A user will provide a voice recording of their query. Transcribe the voice recording and generate a response to the user's query.

  Voice Query: {{media url=voiceQuery}}
  `,
});

const interactWithCognovaFlow = ai.defineFlow(
  {
    name: 'interactWithCognovaFlow',
    inputSchema: InteractWithCognovaInputSchema,
    outputSchema: InteractWithCognovaOutputSchema,
  },
  async input => {
    const {output} = await cognovaPrompt(input);
    return output!;
  }
);
