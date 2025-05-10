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
    prompt: 'Transform the given image into a cartoon style'
  },
  ghibli: {
    name: 'Studio Ghibli',
    prompt: 'Transform the given image into the Ghibli style',
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
