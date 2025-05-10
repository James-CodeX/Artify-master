export async function resizeImage(dataUri: string, maxSizeInMB: number = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate aspect ratio
      const aspectRatio = width / height;

      // Target size in bytes (convert MB to bytes)
      const targetSize = maxSizeInMB * 1024 * 1024;
      
      // Start with original dimensions
      let quality = 0.9;
      let dataUrl: string;
      
      do {
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // If size is still too large, reduce dimensions by 10%
        if (dataUrl.length > targetSize) {
          width *= 0.9;
          height = width / aspectRatio;
          quality = Math.max(0.5, quality - 0.1); // Don't go below 0.5 quality
        }
      } while (dataUrl.length > targetSize && (width > 100 || quality > 0.5));

      resolve(dataUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = dataUri;
  });
}
