"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Paintbrush } from 'lucide-react';

interface StyleSelectorProps {
  styles: string[];
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  disabled?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange, disabled = false }) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="style-select" className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-flex items-center gap-2">
        <Paintbrush className="h-4 w-4 text-primary" />
        Choose a Style
      </Label>
      <Select value={selectedStyle} onValueChange={onStyleChange} disabled={disabled} name="style-select">
        <SelectTrigger 
          id="style-select" 
          className="w-full bg-card border-primary/20 focus:ring-primary focus:ring-offset-0 hover:border-primary/50 transition-all duration-300 hover:shadow-sm hover:shadow-primary/10"
        >
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent className="border-primary/20 bg-gradient-to-br from-background to-background/95 backdrop-blur-sm">
          {styles.map((style, index) => (
            <SelectItem 
              key={style} 
              value={style}
              className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer transition-colors duration-200 data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary"
              style={{
                borderLeft: `2px solid transparent`,
                borderImage: index % 3 === 0 
                  ? 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--secondary))) 1 100%' 
                  : index % 3 === 1 
                    ? 'linear-gradient(to bottom, hsl(var(--secondary)), hsl(var(--accent))) 1 100%'
                    : 'linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--primary))) 1 100%'
              }}
            >
              {style}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;
