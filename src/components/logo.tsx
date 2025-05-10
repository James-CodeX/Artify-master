import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md", 
  onClick 
}) => {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64
  };

  const sizeValue = sizes[size];
  
  return (
    <div 
      className={`inline-flex items-center ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <svg 
        width={sizeValue} 
        height={sizeValue} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Background circle with gradient */}
        <circle cx="50" cy="50" r="46" fill="url(#logoGradient)" />
        
        {/* Border circle */}
        <circle cx="50" cy="50" r="46" stroke="url(#borderGradient)" strokeWidth="2" fill="none" />
        
        {/* Stylized 'A' letter using brush strokes */}
        <path 
          d="M33 75L50 25L67 75" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M38 60H62" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        
        {/* Paint brush splatter effect */}
        <path 
          d="M28 40C28 40 25 35 30 33C35 31 36 37 36 37" 
          stroke="url(#accentGradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path 
          d="M75 65C75 65 79 63 77 58C75 53 69 56 69 56" 
          stroke="url(#accentGradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <circle cx="72" cy="43" r="4" fill="url(#accentGradient)" />
        <circle cx="25" cy="55" r="3" fill="url(#accentGradient)" />
        
        {/* Gradients definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(320, 80%, 45%)" /> {/* primary */}
            <stop offset="100%" stopColor="hsl(260, 60%, 60%)" /> {/* secondary */}
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="15" y1="85" x2="85" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(180, 90%, 50%)" /> {/* accent */}
            <stop offset="100%" stopColor="hsl(260, 60%, 60%)" /> {/* secondary */}
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(180, 90%, 50%)" /> {/* accent */}
            <stop offset="100%" stopColor="hsl(180, 90%, 80%)" /> {/* lighter accent */}
          </linearGradient>
        </defs>
      </svg>
      
      <div className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
        {size === "sm" ? null : <span className={size === "md" ? "text-xl" : "text-2xl"}>Artify</span>}
      </div>
    </div>
  );
};

export default Logo; 