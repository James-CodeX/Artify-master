"use client";

import type { ChangeEvent, DragEvent } from 'react';
import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  previewImage?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onImageUpload(dataUrl);
        toast({ title: "Image Loaded", description: "Your image has been successfully loaded." });
      };
      reader.onerror = () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to read the image file." });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast({ variant: "destructive", title: "Invalid File", description: "Please upload a valid image file (PNG, JPG, WEBP, etc.)." });
    }
  }, [onImageUpload, toast]);

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onPaste = useCallback(async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          handleFileChange(blob);
          return;
        }
      }
    }
    toast({ variant: "destructive", title: "Paste Error", description: "No image found on clipboard or permission denied." });
  }, [handleFileChange, toast]);
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full shadow-lg">
      <CardContent 
        className={`p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
        ${isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/70'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={triggerFileInput}
        onPaste={onPaste}
        tabIndex={0} // Make it focusable for paste
        role="button"
        aria-label="Upload or paste image"
      >
        <Input
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
          className="hidden"
          ref={fileInputRef}
          id="imageUploadInput"
        />
        {previewImage ? (
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            <Image
              src={previewImage}
              alt="Uploaded preview"
              layout="fill"
              objectFit="contain"
              data-ai-hint="uploaded image"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 h-48 text-muted-foreground">
            <UploadCloud className="w-12 h-12 text-primary" />
            <p className="text-center font-medium">
              Drag &amp; drop an image here, or click to select a file.
            </p>
            <p className="text-sm">You can also paste an image from clipboard.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
