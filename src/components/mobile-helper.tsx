"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, Info, Image, Mail, Wand2 } from 'lucide-react';

const MobileHelper = () => {
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

  // If not mobile, don't render anything
  if (!isMobile) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed floating menu button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className={`rounded-full w-14 h-14 shadow-lg ${isOpen 
            ? "bg-background text-primary border border-primary" 
            : "bg-gradient-to-r from-primary to-secondary text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Navigation overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-6 pointer-events-none">
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-primary/20 p-2 overflow-hidden max-w-[220px] pointer-events-auto animate-in slide-in-from-bottom duration-300">
            <nav className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className="justify-start rounded-xl p-3 hover:bg-primary/10"
                onClick={() => scrollToSection('home')}
              >
                <Home className="h-4 w-4 mr-3 text-primary" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-xl p-3 hover:bg-secondary/10"
                onClick={() => scrollToSection('create')}
              >
                <Wand2 className="h-4 w-4 mr-3 text-secondary" />
                Create
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-xl p-3 hover:bg-accent/10"
                onClick={() => scrollToSection('about')}
              >
                <Info className="h-4 w-4 mr-3 text-accent" />
                About
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-xl p-3 hover:bg-chart-1/10"
                onClick={() => scrollToSection('gallery')}
              >
                <Image className="h-4 w-4 mr-3 text-chart-1" />
                Gallery
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-xl p-3 hover:bg-chart-5/10"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="h-4 w-4 mr-3 text-chart-5" />
                Contact
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHelper; 