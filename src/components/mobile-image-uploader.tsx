"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';

interface MobileImageUploaderProps {
  onImageUpload: (dataUrl: string) => void;
  previewImage?: string | null;
  maxSizeMB?: number;
}

const MobileImageUploader: React.FC<MobileImageUploaderProps> = ({
  onImageUpload,
  previewImage,
  maxSizeMB = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if the device is mobile (screen width < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleCameraClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment"; // Use the back camera
      fileInputRef.current.click();
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  }, []);

  const handleClearImage = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload('');
  }, [onImageUpload]);

  const processFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Check file size (convert maxSizeMB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`Image size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageUpload(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // If not mobile, return null
  if (!isMobile) return null;

  return (
    <div className="w-full space-y-4">
      {/* Hidden file input */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Preview area */}
      {previewImage ? (
        <div className="relative rounded-xl overflow-hidden w-full aspect-square bg-muted">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <Button 
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full h-8 w-8 opacity-80"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center h-48 transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/30 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-center text-muted-foreground text-sm mb-4">
            Drag & drop an image or tap below to upload
          </p>
        </div>
      )}
      
      {/* Mobile-specific action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="rounded-lg flex items-center justify-center gap-2 py-6"
          onClick={handleUploadClick}
          disabled={!!previewImage}
        >
          <Upload className="h-5 w-5" />
          Upload
        </Button>
        <Button 
          variant={previewImage ? "outline" : "default"}
          className="rounded-lg flex items-center justify-center gap-2 py-6"
          onClick={handleCameraClick}
          disabled={!!previewImage}
        >
          <Camera className="h-5 w-5" />
          Camera
        </Button>
      </div>
    </div>
  );
};

export default MobileImageUploader; 