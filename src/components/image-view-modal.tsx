import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText?: string;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl,
  altText = "Full-size image" 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-background/90 backdrop-blur-md border-primary/10">
        <DialogTitle>
          <VisuallyHidden>Image Preview</VisuallyHidden>
        </DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="p-2 md:p-4 w-full h-full flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt={altText}
              className="max-w-full max-h-[80vh] object-contain rounded-md" 
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal; 