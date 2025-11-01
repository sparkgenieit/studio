'use server';

/**
 * @fileOverview An AI-powered tool that analyzes agent, guide, and vendor performance data to identify top performers and key trends.
 *
 * - getPerformanceInsights - A function that handles the performance insights process.
 * - PerformanceInsightsInput - The input type for the getPerformanceInsights function.
 * - PerformanceInsightsOutput - The return type for the getPerformanceInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformanceInsightsInputSchema = z.object({
  agentsData: z.string().describe('A string containing the performance data of agents.'),
  guidesData: z.string().describe('A string containing the performance data of guides.'),
  vendorsData: z.string().describe('A string containing the performance data of vendors.'),
});
export type PerformanceInsightsInput = z.infer<typeof PerformanceInsightsInputSchema>;

const PerformanceInsightsOutputSchema = z.object({
  topAgents: z.string().describe('A summary of the top performing agents and why they are top performers.'),
  keyAgentTrends: z.string().describe('Key trends observed in agent performance data.'),
  topGuides: z.string().describe('A summary of the top performing guides and why they are top performers.'),
  keyGuideTrends: z.string().describe('Key trends observed in guide performance data.'),
  topVendors: z.string().describe('A summary of the top performing vendors and why they are top performers.'),
  keyVendorTrends: z.string().describe('Key trends observed in vendor performance data.'),
});
export type PerformanceInsightsOutput = z.infer<typeof PerformanceInsightsOutputSchema>;

export async function getPerformanceInsights(input: PerformanceInsightsInput): Promise<PerformanceInsightsOutput> {
  return performanceInsightsFlow(input);
}

const performanceInsightsPrompt = ai.definePrompt({
  name: 'performanceInsightsPrompt',
  input: {schema: PerformanceInsightsInputSchema},
  output: {schema: PerformanceInsightsOutputSchema},
  prompt: `You are an AI assistant designed to analyze performance data and provide insights.

  Analyze the provided data for agents, guides, and vendors to identify top performers and key trends.

  Agents Data: {{{agentsData}}}
  Guides Data: {{{guidesData}}}
  Vendors Data: {{{vendorsData}}}

  Provide a summary of the top performing agents and key trends in agent performance data.
  Provide a summary of the top performing guides and key trends in guide performance data.
  Provide a summary of the top performing vendors and key trends in vendor performance data.
`,
});

const performanceInsightsFlow = ai.defineFlow(
  {
    name: 'performanceInsightsFlow',
    inputSchema: PerformanceInsightsInputSchema,
    outputSchema: PerformanceInsightsOutputSchema,
  },
  async input => {
    const {output} = await performanceInsightsPrompt(input);
    return output!;
  }
);
