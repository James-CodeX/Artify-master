"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
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
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] border-l-4 border-primary">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center mb-8 mt-4">
                <Logo size="sm" />
              </div>
              <nav className="flex flex-col gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('home')}
                  className="hover:bg-primary/10 hover:text-primary transition-all duration-300 justify-start"
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('about')}
                  className="hover:bg-secondary/10 hover:text-secondary transition-all duration-300 justify-start"
                >
                  About
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('gallery')}
                  className="hover:bg-accent/10 hover:text-accent transition-all duration-300 justify-start"
                >
                  Gallery
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => scrollToSection('contact')}
                  className="hover:bg-chart-5/10 hover:text-chart-5 transition-all duration-300 justify-start"
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 