import React from 'react';

interface MyanmarDevLogoProps {
  className?: string;
  showText?: boolean;
  isLight?: boolean;
}

/**
 * Official Myanmar Developers (<MD>) Emblem
 * High-precision vector recreation of the official brand identity.
 */
export function MyanmarDevEmblem({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Left chevron blue gradient */}
        <linearGradient id="md-blue-bracket" x1="16" y1="120" x2="88" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0047BA" />
        </linearGradient>

        {/* M left vertical fold */}
        <linearGradient id="md-m-left-leg" x1="104" y1="20" x2="162" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="40%" stopColor="#0052D4" />
          <stop offset="100%" stopColor="#00359E" />
        </linearGradient>

        {/* M center origami diagonal fold */}
        <linearGradient id="md-m-ribbon" x1="104" y1="20" x2="258" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0084FF" />
          <stop offset="50%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0047BA" />
        </linearGradient>

        {/* M right diagonal fold */}
        <linearGradient id="md-m-right-leg" x1="288" y1="20" x2="204" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0096FF" />
          <stop offset="55%" stopColor="#005DD8" />
          <stop offset="100%" stopColor="#0044B2" />
        </linearGradient>

        {/* D curve loop gradient: Blue -> Cyan -> Emerald Green */}
        <linearGradient id="md-d-loop" x1="288" y1="20" x2="492" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="25%" stopColor="#0088FF" />
          <stop offset="55%" stopColor="#00B4D8" />
          <stop offset="78%" stopColor="#00C49F" />
          <stop offset="100%" stopColor="#00D285" />
        </linearGradient>

        {/* Inner right chevron green gradient */}
        <linearGradient id="md-green-bracket" x1="324" y1="120" x2="384" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="50%" stopColor="#00C49F" />
          <stop offset="100%" stopColor="#00D285" />
        </linearGradient>
      </defs>

      {/* Left < Chevron Bracket */}
      <path
        d="M 88 116 L 24 176 L 88 236"
        stroke="url(#md-blue-bracket)"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Origami M - Left Leg */}
      <path
        d="M 106 24 L 160 76 L 160 296 L 106 296 Z"
        fill="url(#md-m-left-leg)"
      />

      {/* The Origami M - Center Left Diagonal Ribbon */}
      <path
        d="M 106 24 L 248 168 L 198 296 L 160 76 Z"
        fill="url(#md-m-ribbon)"
      />

      {/* The Origami M - Center Right Diagonal */}
      <path
        d="M 248 168 L 288 24 L 288 296 L 198 296 Z"
        fill="url(#md-m-right-leg)"
      />

      {/* The Letter D Sweeping Outer Curve */}
      <path
        d="M 288 24 C 396 24 492 90 492 176 C 492 262 396 296 288 296 L 288 248 C 368 248 436 218 436 176 C 436 134 368 72 288 72 Z"
        fill="url(#md-d-loop)"
      />

      {/* Right > Chevron Bracket (Inside D) */}
      <path
        d="M 326 128 L 376 176 L 326 224"
        stroke="url(#md-green-bracket)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Complete Myanmar Developers Brand Logo with Typography
 */
export function MyanmarDevLogo({
  className = 'h-10',
  showText = true,
  isLight = true,
}: MyanmarDevLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
        <MyanmarDevEmblem className="w-full h-full object-contain" />
      </div>
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1.5 font-extrabold tracking-wider text-xs sm:text-sm font-sans uppercase">
            <span className={isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}>
              Myanmar
            </span>
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D285] bg-clip-text text-transparent">
              Developers
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-tight text-stone-500 dark:text-[#94A3B8]">
            myanmardev.com
          </span>
        </div>
      )}
    </div>
  );
}
