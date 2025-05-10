"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ImageUploader from '@/components/image-uploader';
import StyleSelector from '@/components/style-selector';
import ImageDisplay from '@/components/image-display';
import DownloadButton from '@/components/download-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateStyledImage, type GenerateStyledImageInput } from '@/ai/flows/generate-styled-image';
import { Wand2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { stylePrompts } from '@/ai/styles/prompts';

const STYLES = Object.values(stylePrompts).map(style => style.name);

export default function ArtifyPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Artify page loaded and ready.");
  }, []);

  const getStyleKey = (displayName: string) => {
    return Object.entries(stylePrompts).find(([_, style]) => style.name === displayName)?.[0] || '';
  };

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setTransformedImage(null); 
  }, []);

  const handleStyleChange = useCallback((style: string) => {
    setSelectedStyle(style);
  }, []);

  const handleTransformImage = useCallback(async () => {
    if (!originalImage) {
      toast({ variant: "destructive", title: "No Image", description: "Please upload an image first." });
      return;
    }

    setIsLoading(true);
    setTransformedImage(null); 

    try {
      const input: GenerateStyledImageInput = {
        photoDataUri: originalImage,
        style: getStyleKey(selectedStyle),
      };
      const result = await generateStyledImage(input);
      setTransformedImage(result.transformedImage);
      toast({ title: "Artified!", description: "Your image has been transformed." });
    } catch (error) {
      console.error("Transformation error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during transformation.";
      toast({ variant: "destructive", title: "Transformation Failed", description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, toast]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 bg-gradient-to-br from-background to-muted/30">
      <header className="my-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70">
          Artify
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          Transform your photos into stunning works of art with AI.
        </p>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Controls Column */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">Create Your Art</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploader onImageUpload={handleImageUpload} previewImage={originalImage} />
              <StyleSelector
                styles={STYLES}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                disabled={isLoading}
              />
              <Button
                onClick={handleTransformImage}
                disabled={!originalImage || isLoading}
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                {isLoading ? "Artifying..." : "Artify Image"}
              </Button>
            </CardContent>
          </Card>
           <Alert className="bg-card border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary">Tip</AlertTitle>
            <AlertDescription className="text-foreground/80">
              Experiment with different styles for unique results! The AI will interpret the style and apply it to your image.
            </AlertDescription>
          </Alert>
        </div>

        {/* Image Display Column */}
        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ImageDisplay title="Original Image" imageUrl={originalImage} altText="Original uploaded image" />
          <div className="flex flex-col space-y-4">
            <ImageDisplay title="Transformed Image" imageUrl={transformedImage} isLoading={isLoading} altText="AI transformed image" />
            {transformedImage && !isLoading && (
              <DownloadButton imageUrl={transformedImage} fileName={`artified-${selectedStyle.toLowerCase().replace(/\s+/g, '-')}.png`} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Artify. Unleash your creativity.</p>
      </footer>
    </div>
  );
}
