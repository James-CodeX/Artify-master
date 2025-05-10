"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, Loader2 } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl?: string | null;
  title: string;
  isLoading?: boolean;
  altText?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, title, isLoading = false, altText = "Displayed image" }) => {
  return (
    <Card className="w-full shadow-sm h-full">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="w-full h-[220px] rounded-md overflow-hidden border border-border/50 bg-muted/30 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs">Processing...</p>
            </div>
          ) : imageUrl ? (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={altText} 
                className="max-w-full max-h-full object-contain" 
                data-ai-hint="artistic photo" 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <ImageIcon className="h-8 w-8 opacity-30" />
              <p className="text-xs">{title === "Original Image" ? "Upload an image" : "Transformed art will appear here"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplay;
