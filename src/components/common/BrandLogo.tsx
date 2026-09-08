import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  inverted = false,
  className = '',
  onClick,
}) => {
  // Dimension mappings
  const iconDimensions = {
    xs: { w: 26, h: 26 },
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 56, h: 56 },
    xl: { w: 72, h: 72 },
  }[size];

  const textSizes = {
    xs: { shadi: 'text-base', kabbo: 'text-[8px] tracking-[0.20em]' },
    sm: { shadi: 'text-lg', kabbo: 'text-[9px] tracking-[0.25em]' },
    md: { shadi: 'text-2xl', kabbo: 'text-[11px] tracking-[0.28em]' },
    lg: { shadi: 'text-3xl', kabbo: 'text-xs tracking-[0.32em]' },
    xl: { shadi: 'text-4xl', kabbo: 'text-sm tracking-[0.36em]' },
  }[size];

  const shadiColor = inverted ? 'text-white' : 'text-[#16205B]';
  const kabboColor = 'text-[#D91B2B]';

  // The custom vector mark matching the exact stylized bride & groom motif
  const LogoIcon = (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="Shadikabbo Logo Mark"
    >
      <defs>
        <linearGradient id="groomGrad" x1="20" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#253582" />
          <stop offset="50%" stopColor="#1B2668" />
          <stop offset="100%" stopColor="#121A45" />
        </linearGradient>
        <linearGradient id="brideGrad" x1="50" y1="30" x2="90" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF2A42" />
          <stop offset="60%" stopColor="#D91B2B" />
          <stop offset="100%" stopColor="#A8101E" />
        </linearGradient>
        <linearGradient id="swooshRed" x1="10" y1="65" x2="70" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EA2536" />
          <stop offset="100%" stopColor="#B30E1D" />
        </linearGradient>
        <linearGradient id="veilGrad" x1="65" y1="35" x2="95" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF384F" />
          <stop offset="100%" stopColor="#C91424" />
        </linearGradient>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#16205B" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#softGlow)">
        {/* Red lower swooshes & wedding saree swirls */}
        <path
          d="M20 78C14 83 18 96 28 99C35 101 45 98 48 94C38 97 30 92 28 85C27 80 23 79 20 78Z"
          fill="url(#swooshRed)"
        />
        <path
          d="M23 88C18 94 25 106 40 106C52 106 63 99 68 88C56 97 43 99 35 96C28 93 25 89 23 88Z"
          fill="url(#swooshRed)"
        />

        {/* Groom Head */}
        <circle cx="39" cy="24" r="9" fill="url(#groomGrad)" />

        {/* Groom Body - Arched elegant curve leaning inward */}
        <path
          d="M37 35C44 38 47 48 48 57C49 67 47 78 43 88C39 96 32 101 26 95C22 91 27 82 30 73C33 63 32 50 28 42C26 38 31 34 37 35Z"
          fill="url(#groomGrad)"
        />

        {/* Bride Head */}
        <circle cx="70" cy="29" r="7.5" fill="url(#brideGrad)" />

        {/* Bride Draped Chunri / Bridal Veil */}
        <path
          d="M74 27C81 29 89 36 91 43C93 47 88 50 85 47C88 51 86 56 81 57C85 54 84 48 80 47C76 46 73 40 74 27Z"
          fill="url(#veilGrad)"
        />

        {/* Bride Body - Graceful posture wrapped with groom */}
        <path
          d="M68 39C63 43 59 50 58 59C57 66 60 74 65 82C72 93 84 98 90 94C95 91 88 83 82 76C77 70 75 62 76 54C77 47 74 41 68 39Z"
          fill="url(#brideGrad)"
        />

        {/* Red sash / scarf connecting both hearts */}
        <path
          d="M48 54C54 51 61 52 65 57C68 61 64 66 59 67C52 68 47 62 48 54Z"
          fill="none"
          stroke="url(#brideGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Groom base tail flourish */}
        <path
          d="M43 88C49 97 59 102 70 101C61 99 53 94 48 87L43 88Z"
          fill="url(#groomGrad)"
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
        title="Shadikabbo.com"
      >
        {LogoIcon}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${size === 'xs' ? 'gap-1.5' : 'gap-2.5'} cursor-pointer select-none ${
        variant === 'stacked' ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
    >
      {LogoIcon}
      <div className={`flex flex-col ${variant === 'stacked' ? 'items-center' : 'items-start'} leading-none`}>
        <div className="flex items-baseline tracking-tight">
          <span className={`font-black font-sans uppercase ${textSizes.shadi} ${shadiColor}`}>
            SHADI
          </span>
        </div>
        <div className="flex items-center -mt-0.5">
          <span className={`font-extrabold font-sans uppercase ${textSizes.kabbo} ${kabboColor}`}>
            KABBO.COM
          </span>
        </div>
      </div>
    </div>
  );
};
