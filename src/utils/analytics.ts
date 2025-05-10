/**
 * Google Analytics event tracking utilities
 */

// Check if window and dataLayer are available (client-side)
const isClient = typeof window !== 'undefined' && window.dataLayer !== undefined;

// Track a custom event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (isClient) {
    try {
      window.gtag('event', eventName, eventParams);
      console.log(`Analytics event tracked: ${eventName}`, eventParams);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }
};

// Specific event tracking functions
export const trackFileUpload = (fileType: string, fileSize?: number) => {
  trackEvent('file_upload', {
    file_type: fileType,
    file_size: fileSize,
  });
};

export const trackImageTransformation = (style: string, transformationDuration?: number) => {
  trackEvent('image_transformation', {
    style: style,
    transformation_duration: transformationDuration,
  });
};

// Define a window augmentation for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 