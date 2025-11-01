'use server';

/**
 * @fileOverview Identifies trends in dashboard metrics using AI.
 *
 * - identifyDashboardTrends - A function that identifies trends in dashboard metrics.
 * - DashboardTrendIdentificationInput - The input type for the identifyDashboardTrends function.
 * - DashboardTrendIdentificationOutput - The return type for the identifyDashboardTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DashboardTrendIdentificationInputSchema = z.object({
  bookingData: z.string().describe('Historical booking data in JSON format.'),
  revenueData: z.string().describe('Historical revenue data in JSON format.'),
  cancellationData: z.string().describe('Historical cancellation data in JSON format.'),
});
export type DashboardTrendIdentificationInput = z.infer<
  typeof DashboardTrendIdentificationInputSchema
>;

const DashboardTrendIdentificationOutputSchema = z.object({
  bookingTrends: z.string().describe('Identified trends in booking data.'),
  revenueFluctuations: z.string().describe('Identified fluctuations in revenue data.'),
  cancellationRateTrends: z
    .string()
    .describe('Identified trends in cancellation rates.'),
});
export type DashboardTrendIdentificationOutput = z.infer<
  typeof DashboardTrendIdentificationOutputSchema
>;

export async function identifyDashboardTrends(
  input: DashboardTrendIdentificationInput
): Promise<DashboardTrendIdentificationOutput> {
  return identifyDashboardTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dashboardTrendIdentificationPrompt',
  input: {
    schema: DashboardTrendIdentificationInputSchema,
  },
  output: {
    schema: DashboardTrendIdentificationOutputSchema,
  },
  prompt: `You are an expert data analyst specializing in identifying trends from dashboard metrics.

  Analyze the provided booking, revenue, and cancellation data to identify key trends and potential issues.

  Booking Data: {{{bookingData}}}
  Revenue Data: {{{revenueData}}}
  Cancellation Data: {{{cancellationData}}}

  Provide a summary of the identified trends for each data set.
  `,
});

const identifyDashboardTrendsFlow = ai.defineFlow(
  {
    name: 'identifyDashboardTrendsFlow',
    inputSchema: DashboardTrendIdentificationInputSchema,
    outputSchema: DashboardTrendIdentificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
