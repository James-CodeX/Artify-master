interface StylePrompt {
  name: string;
  prompt: string;
}

export const stylePrompts: Record<string, StylePrompt> = {
  sketch: {
    name: 'Outline Sketch',
    prompt: 'Transform the given image into a detailed black and white outline sketch. The main subject of the image should be clearly visible with clean, precise lines. The sketch should capture essential details while maintaining a minimalist approach. The background should be simplified to complement the main subject without overwhelming it.',
  },
  cartoon: {
    name: 'Cartoon',
    prompt: 'Transform the given image into a vibrant cartoon style. The main subject should be stylized with bold lines, simplified forms, and bright, solid colors. The style should maintain the character\'s key features while adding a playful, animated quality. The background should be simplified and colorful in a complementary cartoon style.',
  },
  ghibli: {
    name: 'Studio Ghibli',
    prompt: 'Transform the given image into the distinctive Studio Ghibli animation style. The image should have soft, painterly qualities with attention to lighting and atmosphere. Use the characteristic Ghibli color palette with emphasis on natural elements. The style should capture the warmth and detail typical of Ghibli films while maintaining the subject\'s core features.',
  },
  // Add more styles as needed
};

export const getStylePrompt = (style: string): string => {
  const styleConfig = stylePrompts[style.toLowerCase()];
  if (!styleConfig) {
    throw new Error(`Style "${style}" not found. Available styles: ${Object.keys(stylePrompts).join(', ')}`);
  }
  return styleConfig.prompt;
};
