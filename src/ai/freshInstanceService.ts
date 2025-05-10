'use server';

/**
 * @fileOverview A service that creates a fresh model instance for each request
 * This ensures each transformation starts with a clean state
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { getStylePrompt } from './styles/prompts';

// Define input schema for the image transformation
const GenerateStyledImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be transformed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  style: z
    .string()
    .describe(
      'The desired style for the image transformation (e.g., cartoon, sketch, ghibli).'
    ),
});
export type FreshInstanceInput = z.infer<typeof GenerateStyledImageInputSchema>;

// Define output schema for the image transformation
const GenerateStyledImageOutputSchema = z.object({
  transformedImage: z
    .string()
    .describe('The transformed image as a data URI.'),
});
export type FreshInstanceOutput = z.infer<typeof GenerateStyledImageOutputSchema>;

/**
 * Creates a fresh instance of the model for each request
 * This ensures each transformation starts with a clean state
 */
export async function generateWithFreshInstance(input: FreshInstanceInput): Promise<FreshInstanceOutput> {
  console.log("Creating fresh model instance for new request");
  
  // Create a fresh instance of the genkit library with a new model
  const freshAi = genkit({
    plugins: [
      googleAI({
        apiKey: process.env.GOOGLE_AI_API_KEY,
      }),
    ],
    model: 'googleai/gemini-2.0-flash',
  });

  // Define a prompt with the fresh instance
  const freshPrompt = freshAi.definePrompt(
    {
      name: 'freshImageStylePrompt',
      input: {schema: GenerateStyledImageInputSchema},
      prompt: (promptInput: FreshInstanceInput) => {
        const photoDataUri = promptInput.photoDataUri;

        const mimeTypeRegex = /^data:([^;]+);base64,/;
        const match = photoDataUri.match(mimeTypeRegex);

        if (!match || !match[1]) {
          console.error(
            'Invalid data URI format or missing MIME type in photoDataUri (prefix):',
            photoDataUri.substring(0, 100) 
          );
          throw new Error(
            'Invalid data URI format or missing MIME type. Ensure the uploaded file is a valid image and the data URI is correctly formatted.'
          );
        }
        const contentType = match[1];

        return [
          {media: {url: photoDataUri, contentType: contentType}},
          {
            text: getStylePrompt(promptInput.style),
          },
        ];
      },
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
      model: 'googleai/gemini-2.0-flash-exp', 
    }
  );

  // Define a flow with the fresh instance
  const freshFlow = freshAi.defineFlow(
    {
      name: 'freshImageStyleFlow',
      inputSchema: GenerateStyledImageInputSchema,
      outputSchema: GenerateStyledImageOutputSchema, 
    },
    async flowInput => {
      // Execute the prompt with the fresh instance
      const response = await freshPrompt(flowInput);

      if (!response.media || !response.media.url) {
        console.error('Image transformation failed. Response from AI:', JSON.stringify(response, null, 2));
        throw new Error(
          'Image transformation failed to produce a valid media output. The AI model may not have returned an image.'
        );
      }
      
      return {transformedImage: response.media.url};
    }
  );

  // Execute the flow with a fresh instance
  try {
    return await freshFlow(input);
  } catch (error) {
    console.error("Error with fresh instance:", error);
    throw error;
  }
} 