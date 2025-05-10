"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  imageUrl?: string | null;
  fileName?: string;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, fileName = "artified-image.png", disabled = false }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!imageUrl) {
      toast({ variant: "destructive", title: "Download Error", description: "No image to download." });
      return;
    }
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Started", description: `Downloading ${fileName}` });
    } catch (error) {
      console.error("Download failed:", error);
      toast({ variant: "destructive", title: "Download Error", description: "Could not initiate download." });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || !imageUrl}
      className="w-full"
      variant="outline"
    >
      <Download className="mr-2 h-4 w-4" />
      Download Image
    </Button>
  );
};

export default DownloadButton;
