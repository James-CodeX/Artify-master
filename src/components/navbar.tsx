"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ThemeToggle } from './theme-toggle';
import Image from 'next/image';

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
          <Image 
            src="/artify.svg" 
            alt="Artify Logo" 
            width={140} 
            height={40} 
            className="h-10 w-auto"
            onClick={() => scrollToSection('home')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          <Button variant="ghost" onClick={() => scrollToSection('home')}>Home</Button>
          <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
          <Button variant="ghost" onClick={() => scrollToSection('gallery')}>Gallery</Button>
          <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
          <Button variant="default" onClick={() => scrollToSection('create')}>Start Creating</Button>
          <ThemeToggle />
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex items-center mb-8 mt-4">
                <Image 
                  src="/artify.svg" 
                  alt="Artify Logo" 
                  width={120} 
                  height={32} 
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-col gap-4">
                <Button variant="ghost" onClick={() => scrollToSection('home')}>Home</Button>
                <Button variant="ghost" onClick={() => scrollToSection('about')}>About</Button>
                <Button variant="ghost" onClick={() => scrollToSection('gallery')}>Gallery</Button>
                <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
                <Button variant="default" onClick={() => scrollToSection('create')}>Start Creating</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 