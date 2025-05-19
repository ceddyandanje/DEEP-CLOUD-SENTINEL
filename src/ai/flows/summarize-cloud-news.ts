// src/ai/flows/summarize-cloud-news.ts
'use server';

/**
 * @fileOverview Summarizes and ranks cloud and security news articles based on user interests.
 *
 * - summarizeCloudNews - A function that summarizes and ranks news articles.
 * - SummarizeCloudNewsInput - The input type for the summarizeCloudNews function.
 * - SummarizeCloudNewsOutput - The return type for the summarizeCloudNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCloudNewsInputSchema = z.object({
  newsArticles: z
    .array(z.string())
    .describe('An array of news articles to summarize and rank.'),
  userInterests: z
    .string()
    .describe('A description of the user\u0027s interests in cloud and security.'),
});
export type SummarizeCloudNewsInput = z.infer<typeof SummarizeCloudNewsInputSchema>;

const SummarizeCloudNewsOutputSchema = z.object({
  summarizedNews: z.array(
    z.object({
      title: z.string().describe('The title of the news article.'),
      summary: z.string().describe('A concise summary of the news article.'),
      relevanceScore: z
        .number()
        .describe('A score indicating the relevance of the article to the user\u0027s interests.'),
    })
  ),
});
export type SummarizeCloudNewsOutput = z.infer<typeof SummarizeCloudNewsOutputSchema>;

export async function summarizeCloudNews(input: SummarizeCloudNewsInput): Promise<SummarizeCloudNewsOutput> {
  return summarizeCloudNewsFlow(input);
}

const summarizeNewsPrompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: {schema: SummarizeCloudNewsInputSchema},
  output: {schema: SummarizeCloudNewsOutputSchema},
  prompt: `You are an AI assistant that summarizes and ranks news articles based on user interests.

  User Interests: {{{userInterests}}}

  News Articles:
  {{#each newsArticles}}
  - {{{this}}}
  {{/each}}

  Summarize each article and rank its relevance to the user's interests on a scale of 1 to 10.  Return the results as a JSON array.
  Ensure that the summary captures the core essence of the news article, providing enough detail for the user to grasp its significance without reading the full text.
  The relevance score should reflect how closely the article aligns with the user's specified interests, with higher scores indicating a stronger alignment.
  `,
});

const summarizeCloudNewsFlow = ai.defineFlow(
  {
    name: 'summarizeCloudNewsFlow',
    inputSchema: SummarizeCloudNewsInputSchema,
    outputSchema: SummarizeCloudNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeNewsPrompt(input);
    return output!;
  }
);
