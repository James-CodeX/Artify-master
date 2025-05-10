"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Maximize2, Minimize2, Download, X } from 'lucide-react';

interface MobileImageViewerProps {
  imageUrl: string;
  altText?: string;
  downloadEnabled?: boolean;
  downloadFileName?: string;
}

const MobileImageViewer: React.FC<MobileImageViewerProps> = ({
  imageUrl,
  altText = "Image",
  downloadEnabled = true,
  downloadFileName = "artify-image.png"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // If not mobile or no image, return null
  if (!isMobile || !imageUrl) return null;

  return (
    <>
      {/* Expand button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-2 right-2 rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm z-10"
        onClick={() => setIsOpen(true)}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>

      {/* Fullscreen modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col">
          {/* Top controls */}
          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            
            {downloadEnabled && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {/* Image container */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative max-h-full max-w-full">
              <img
                src={imageUrl}
                alt={altText}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
          
          {/* Exit fullscreen bar */}
          <div className="p-4 flex justify-center">
            <Button
              variant="secondary"
              className="rounded-full px-4 gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Minimize2 className="h-4 w-4" />
              <span>Exit Fullscreen</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileImageViewer; 