'use server';

/**
 * @fileOverview An AI agent that transforms an image based on a selected style using GenAI.
 *
 * - generateStyledImage - A function that handles the image style transformation process.
 * - GenerateStyledImageInput - The input type for the generateStyledImage function.
 * - GenerateStyledImageOutput - The return type for the generateStyledImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit'; 

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
export type GenerateStyledImageInput = z.infer<typeof GenerateStyledImageInputSchema>;

const GenerateStyledImageOutputSchema = z.object({
  transformedImage: z
    .string()
    .describe('The transformed image as a data URI.'),
});
export type GenerateStyledImageOutput = z.infer<typeof GenerateStyledImageOutputSchema>;

export async function generateStyledImage(input: GenerateStyledImageInput): Promise<GenerateStyledImageOutput> {
  return generateStyledImageFlow(input);
}

const generateStyledImagePrompt = ai.definePrompt(
  {
    name: 'generateStyledImagePrompt',
    input: {schema: GenerateStyledImageInputSchema},
    prompt: (input: GenerateStyledImageInput) => {
      const photoDataUri = input.photoDataUri;

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
          text: `Transform the given image into a ${input.style} style. The main subject of the image should be clearly visible and well-defined in the chosen style. The background should complement the style and subject. Ensure the output is only the transformed image.`,
        },
      ];
    },
    config: {
      responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE for gemini-2.0-flash-exp
      // Removed safetySettings to use default which is generally safer.
      // If specific adjustments are needed, they can be added back.
    },
    model: 'googleai/gemini-2.0-flash-exp', 
  }
);

const generateStyledImageFlow = ai.defineFlow(
  {
    name: 'generateStyledImageFlow',
    inputSchema: GenerateStyledImageInputSchema,
    outputSchema: GenerateStyledImageOutputSchema, 
  },
  async input => {
    // Invoking the prompt returns a GenerateResponse object.
    // For prompts with image output, this object contains a `media` field.
    const response = await generateStyledImagePrompt(input);

    if (!response.media || !response.media.url) {
      console.error('Image transformation failed. Response from AI:', JSON.stringify(response, null, 2));
      throw new Error(
        'Image transformation failed to produce a valid media output. The AI model may not have returned an image.'
      );
    }
    // The `media.url` field contains the image as a data URI.
    return {transformedImage: response.media.url};
  }
);
