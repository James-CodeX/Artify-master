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
    <Card className="w-full shadow-md h-full">
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-md font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full h-[280px] rounded-md overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Processing...</p>
            </div>
          ) : imageUrl ? (
            <div className="w-full h-full flex items-center justify-center p-2">
              <img 
                src={imageUrl} 
                alt={altText} 
                className="max-w-full max-h-full object-contain rounded"
                data-ai-hint="artistic photo" 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <ImageIcon className="h-10 w-10 opacity-30" />
              <p className="text-sm">{title === "Original Image" ? "Upload an image" : "Transformed art will appear here"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplay;
