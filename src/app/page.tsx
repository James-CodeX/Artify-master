"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ImageUploader from '@/components/image-uploader';
import StyleSelector from '@/components/style-selector';
import ImageDisplay from '@/components/image-display';
import DownloadButton from '@/components/download-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateStyledImage, type GenerateStyledImageInput } from '@/ai/flows/generate-styled-image';
import { resizeImage } from '@/utils/imageProcessing';
import { Wand2, Info, ArrowDown, Camera, Image, Mail, Phone, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { stylePrompts } from '@/ai/styles/prompts';
import NavBar from '@/components/navbar';
import MobileHelper from '@/components/mobile-helper';
import MobileImageViewer from '@/components/mobile-image-viewer';
import { trackImageTransformation } from '@/utils/analytics';

const STYLES = Object.values(stylePrompts).map(style => style.name);

// Sample gallery images
const GALLERY_IMAGES = [
  {
    original: "/orginal.jpg",
    transformed: "/artified-studio-ghibli.png",
    style: "Studio Ghibli",
    id: "gallery1"
  },
  {
    original: "/orginal.jpg",
    transformed: "/artified-cartoon.png",
    style: "Cartoon",
    id: "gallery2"
  },
  {
    original: "/orginal.jpg",
    transformed: "/artified-outline-sketch.png",
    style: "Outline Sketch",
    id: "gallery3"
  },
  {
    original: "/orginal.jpg",
    transformed: "/artified-outline-sketch (1).png",
    style: "Abstract Sketch",
    id: "gallery4"
  },
];

export default function ArtifyPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Artify page loaded and ready.");
  }, []);

  const getStyleKey = (displayName: string) => {
    return Object.entries(stylePrompts).find(([_, style]) => style.name === displayName)?.[0] || '';
  };

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setTransformedImage(null); 
  }, []);

  const handleStyleChange = useCallback((style: string) => {
    setSelectedStyle(style);
  }, []);

  const handleTransformImage = useCallback(async () => {
    if (!originalImage) {
      toast({ variant: "destructive", title: "No Image", description: "Please upload an image first." });
      return;
    }

    setIsLoading(true);
    setTransformedImage(null); 
    
    // Track start time for calculating duration
    const startTime = performance.now();

    try {
      // Resize image if it's too large
      const resizedImage = await resizeImage(originalImage, 2); // Max 2MB
      
      const input: GenerateStyledImageInput = {
        photoDataUri: resizedImage,
        style: getStyleKey(selectedStyle),
      };
      const result = await generateStyledImage(input);
      setTransformedImage(result.transformedImage);
      toast({ title: "Artified!", description: "Your image has been transformed." });
      
      // Calculate duration and track the transformation event
      const duration = performance.now() - startTime;
      trackImageTransformation(selectedStyle, Math.round(duration));
    } catch (error) {
      console.error("Transformation error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during transformation.";
      toast({ variant: "destructive", title: "Transformation Failed", description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Mobile Helper Component - floating navigation for mobile */}
      <MobileHelper />
      
      {/* Hero Section - Full Screen */}
      <section id="home" className="min-h-[90vh] md:min-h-screen flex flex-col justify-center px-4 md:px-8 w-full bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden pt-16 md:pt-0">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[70%] md:w-[50%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[50%] md:w-[30%] h-[40%] bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[20%] bg-secondary/5 rounded-full blur-3xl hidden md:block"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 py-8 md:py-0">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70 drop-shadow-sm">
                Transform Your Photos Into Art
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0">
                Unleash your creativity with Artify. Our AI-powered platform transforms your ordinary photos into stunning works of art in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-md hover:shadow-lg rounded-full"
                  onClick={() => document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Try It Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Image className="mr-2 h-5 w-5" />
                  View Gallery
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 w-full px-4 sm:px-10 md:px-0">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -top-4 -right-4 w-full h-full bg-accent/20 rounded-lg blur-[1px] rotate-3"></div>
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-primary/20 rounded-lg blur-[1px] -rotate-2"></div>
                <div className="relative aspect-video bg-gradient-to-tr from-primary/20 to-accent/20 rounded-lg flex items-center justify-center p-4 shadow-xl">
                  <img 
                    src="/artified-cartoon.png" 
                    alt="Artify Transformation Example" 
                    className="rounded-md max-h-[300px] w-auto object-contain"
                    onError={(e) => e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjE3MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg=='}  
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Down arrow - positioned absolutely at the bottom */}
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce rounded-full bg-background/50 backdrop-blur-sm shadow-md"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Create Section (Moved up) */}
      <section id="create" className="py-10 md:py-16 bg-muted/30 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Create Your Art</h2>
            <p className="text-md text-foreground/80 max-w-2xl mx-auto">
              Upload your photo, select a style, and transform it into a masterpiece in seconds.
            </p>
          </div>
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Controls Column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Card className="shadow-md">
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-lg font-medium text-primary">Transform Your Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ImageUploader onImageUpload={handleImageUpload} previewImage={originalImage} />
                  
                  <div className="border-t border-border pt-4">
                    <StyleSelector
                      styles={STYLES}
                      selectedStyle={selectedStyle}
                      onStyleChange={setSelectedStyle}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      onClick={handleTransformImage}
                      disabled={!originalImage || isLoading}
                      className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isLoading ? "Artifying..." : "Artify Image"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Image Display Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col h-full">
                  <ImageDisplay 
                    title="Original Image" 
                    imageUrl={originalImage || "/orginal.jpg"} 
                    altText="Original uploaded image" 
                  />
                </div>
                
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <ImageDisplay 
                      title="Transformed Image" 
                      imageUrl={transformedImage || (originalImage ? null : "/artified-studio-ghibli.png")} 
                      isLoading={isLoading} 
                      altText="AI transformed image" 
                    />
                  </div>
                  
                  {transformedImage && !isLoading && (
                    <div className="mt-3">
                      <DownloadButton 
                        imageUrl={transformedImage} 
                        fileName={`artified-${selectedStyle.toLowerCase().replace(/\s+/g, '-')}.png`} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Artify</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Artify is an AI-powered platform that lets you transform your photos into stunning artworks using state-of-the-art image processing technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Upload Your Photos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Simply upload your favorite photos and let our AI do the rest. We support various image formats for your convenience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Wand2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Choose Your Style</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Select from a variety of artistic styles, from Renaissance to Modern Art, and see your photos transformed instantly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Download & Share</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Download your transformed images in high resolution and share them with friends or on social media.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Gallery</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore transformations created by our users and get inspired for your own artwork.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((item, index) => (
              <div key={item.id} className="rounded-lg overflow-hidden shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div className="space-y-2">
                    <div className="aspect-square bg-muted rounded-md overflow-hidden">
                      <img 
                        src={item.original} 
                        alt={`Original image ${index+1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjcwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk5OSI+T3JpZ2luYWwgSW1hZ2U8L3RleHQ+PC9zdmc+'}  
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Original</p>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-square bg-muted rounded-md overflow-hidden">
                      <img 
                        src={item.transformed} 
                        alt={`Transformed image ${index+1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjcwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk5OSI+VHJhbnNmb3JtZWQgSW1hZ2U8L3RleHQ+PC9zdmc+'}  
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">{item.style}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
              onClick={() => document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Create Your Own
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="text-foreground/80">amazingjimmy44@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="text-foreground/80">+254 114 858561</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-foreground/80">Nairobi, Kenya</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  Stay connected and see the latest Artify creations by following us on social media.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/10 py-8 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70">
                Artify
              </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Button variant="link" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                Home
              </Button>
              <Button variant="link" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                About
              </Button>
              <Button variant="link" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                Gallery
              </Button>
              <Button variant="link" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-foreground/70">
            <p>&copy; {new Date().getFullYear()} Artify. All rights reserved.</p>
            <p className="mt-1">Unleash your creativity with AI-powered art transformations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
