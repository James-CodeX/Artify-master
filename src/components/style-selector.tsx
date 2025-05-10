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

interface StyleSelectorProps {
  styles: string[];
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  disabled?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange, disabled = false }) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="style-select" className="text-sm font-medium text-foreground">Choose a Style</Label>
      <Select value={selectedStyle} onValueChange={onStyleChange} disabled={disabled} name="style-select">
        <SelectTrigger id="style-select" className="w-full bg-card focus:ring-primary focus:ring-offset-0">
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent>
          {styles.map((style) => (
            <SelectItem key={style} value={style}>
              {style}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;
