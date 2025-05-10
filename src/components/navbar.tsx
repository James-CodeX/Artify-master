"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, Home, Info, Image, Mail, Wand2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from './ui/sheet';
import { ThemeToggle } from './theme-toggle';
import Logo from './logo';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl flex justify-between items-center h-16">
        <div className="flex items-center">
          <Logo size="md" onClick={() => scrollToSection('home')} />
        </div>
        
        {/* Desktop navigation with colorful hover effects */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('home')}
            className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('about')}
            className="hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
          >
            About
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('gallery')}
            className="hover:bg-accent/10 hover:text-accent transition-all duration-300"
          >
            Gallery
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('contact')}
            className="hover:bg-chart-5/10 hover:text-chart-5 transition-all duration-300"
          >
            Contact
          </Button>
          <Button 
            variant="default" 
            onClick={() => scrollToSection('create')}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Start Creating
          </Button>
          <ThemeToggle />
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Menu className="h-6 w-6 text-primary relative z-10" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] sm:w-[320px] border-l-4 border-primary p-0 overflow-hidden"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              {/* Mobile menu header with gradient background */}
              <div className="relative h-36 overflow-hidden bg-gradient-to-r from-primary/90 to-secondary/90 flex items-end">
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>
                <div className="p-6 z-10 w-full">
                  <Logo size="md" />
                </div>
                <SheetClose className="absolute top-4 right-4 rounded-full p-1 bg-white/20 hover:bg-white/30 transition-colors" />
              </div>
              
              {/* Nav links with icons */}
              <nav className="flex flex-col gap-2 p-4">
                <div className="text-xs uppercase text-muted-foreground tracking-wider mb-2 ml-1">Navigation</div>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('home')}
                  className="justify-start rounded-xl py-5 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                >
                  <div className="mr-3 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  <span>Home</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('about')}
                  className="justify-start rounded-xl py-5 hover:bg-secondary/10 hover:text-secondary transition-all duration-300 group"
                >
                  <div className="mr-3 h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Info className="h-4 w-4 text-secondary" />
                  </div>
                  <span>About</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('gallery')}
                  className="justify-start rounded-xl py-5 hover:bg-accent/10 hover:text-accent transition-all duration-300 group"
                >
                  <div className="mr-3 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Image className="h-4 w-4 text-accent" />
                  </div>
                  <span>Gallery</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('contact')}
                  className="justify-start rounded-xl py-5 hover:bg-chart-5/10 hover:text-chart-5 transition-all duration-300 group"
                >
                  <div className="mr-3 h-8 w-8 rounded-lg bg-chart-5/10 flex items-center justify-center group-hover:bg-chart-5/20 transition-colors">
                    <Mail className="h-4 w-4 text-chart-5" />
                  </div>
                  <span>Contact</span>
                </Button>
                
                <div className="mt-4 mb-2 border-t border-border/50 pt-4">
                  <Button 
                    variant="default" 
                    onClick={() => scrollToSection('create')}
                    className="w-full rounded-xl py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group flex items-center justify-center"
                  >
                    <Wand2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">Start Creating</span>
                  </Button>
                </div>
              </nav>
              
              {/* Copyright info */}
              <div className="mt-auto px-4 pb-5 text-xs text-muted-foreground text-center">
                <div className="border-t border-border/50 pt-4">
                  Artify &copy; {new Date().getFullYear()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 