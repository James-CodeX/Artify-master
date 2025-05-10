"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon, Loader2 } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl?: string | null;
  title: string;
  isLoading?: boolean;
  altText?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, title, isLoading = false, altText = "Displayed image" }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] w-full rounded-md overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>Processing your art...</p>
            </div>
          ) : imageUrl ? (
            <div className="relative w-full h-full">
              <Image src={imageUrl} alt={altText} layout="fill" objectFit="contain" data-ai-hint="artistic photo" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <ImageIcon className="h-12 w-12" />
              <p>{title === "Original Image" ? "Upload an image to start" : "Your art will appear here"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplay;
