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
    <Card className="w-full shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full overflow-hidden group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
      <CardHeader className="pb-1 pt-3 relative z-10">
        <CardTitle className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 relative z-10">
        <div 
          className="w-full h-[220px] rounded-md overflow-hidden bg-muted/30 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-300"
          style={{
            boxShadow: "0 0 0 1px rgba(var(--primary), 0.1)",
            background: "linear-gradient(to bottom right, rgba(var(--card), 0.8), rgba(var(--background), 0.8))"
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 h-8 w-8"></div>
                <Loader2 className="h-8 w-8 animate-spin text-primary relative z-10" />
              </div>
              <p className="text-xs font-medium">Processing...</p>
            </div>
          ) : imageUrl ? (
            <div className="w-full h-full flex items-center justify-center p-1">
              <div className="relative w-full h-full overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                <img 
                  src={imageUrl} 
                  alt={altText} 
                  className="max-w-full max-h-full object-contain z-0 relative" 
                  data-ai-hint="artistic photo" 
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 h-10 w-10 -m-1"></div>
                <ImageIcon className="h-8 w-8 opacity-50 relative z-10" />
              </div>
              <p className="text-xs">{title === "Original Image" ? "Upload an image" : "Transformed art will appear here"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplay;
