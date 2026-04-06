interface MosqueSVGProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function MosqueSVG({ className, style }: MosqueSVGProps) {
  return (
    <svg
      viewBox="0 0 320 140"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Left minaret */}
      <rect
        x="20"
        y="20"
        width="18"
        height="100"
        rx="2"
        fill="oklch(0.22 0.08 147)"
      />
      <rect
        x="16"
        y="18"
        width="26"
        height="8"
        rx="2"
        fill="oklch(0.22 0.08 147)"
      />
      {/* Left minaret balcony */}
      <rect
        x="13"
        y="55"
        width="32"
        height="5"
        rx="1"
        fill="oklch(0.22 0.08 147)"
      />
      {/* Left minaret top dome */}
      <ellipse cx="29" cy="18" rx="9" ry="5" fill="oklch(0.22 0.08 147)" />
      <line
        x1="29"
        y1="8"
        x2="29"
        y2="0"
        stroke="oklch(0.72 0.12 78)"
        strokeWidth="2"
      />
      <polygon points="27,1 29,-4 31,1" fill="oklch(0.72 0.12 78)" />

      {/* Right minaret */}
      <rect
        x="282"
        y="20"
        width="18"
        height="100"
        rx="2"
        fill="oklch(0.22 0.08 147)"
      />
      <rect
        x="278"
        y="18"
        width="26"
        height="8"
        rx="2"
        fill="oklch(0.22 0.08 147)"
      />
      {/* Right minaret balcony */}
      <rect
        x="275"
        y="55"
        width="32"
        height="5"
        rx="1"
        fill="oklch(0.22 0.08 147)"
      />
      {/* Right minaret top dome */}
      <ellipse cx="291" cy="18" rx="9" ry="5" fill="oklch(0.22 0.08 147)" />
      <line
        x1="291"
        y1="8"
        x2="291"
        y2="0"
        stroke="oklch(0.72 0.12 78)"
        strokeWidth="2"
      />
      <polygon points="289,1 291,-4 293,1" fill="oklch(0.72 0.12 78)" />

      {/* Main building base */}
      <rect
        x="55"
        y="70"
        width="210"
        height="50"
        rx="4"
        fill="oklch(0.22 0.08 147)"
      />

      {/* Side smaller domes */}
      <ellipse cx="95" cy="70" rx="30" ry="20" fill="oklch(0.22 0.08 147)" />
      <ellipse cx="225" cy="70" rx="30" ry="20" fill="oklch(0.22 0.08 147)" />

      {/* Main central dome */}
      <ellipse cx="160" cy="55" rx="50" ry="35" fill="oklch(0.22 0.08 147)" />
      {/* Dome highlight */}
      <path
        d="M130 55 Q160 30 190 55"
        fill="none"
        stroke="oklch(0.72 0.12 78)"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Central crescent & star */}
      <line
        x1="160"
        y1="22"
        x2="160"
        y2="10"
        stroke="oklch(0.72 0.12 78)"
        strokeWidth="2"
      />
      <path
        d="M155 10 Q160 5 165 10 Q168 13 165 16 Q163 11 155 10Z"
        fill="oklch(0.72 0.12 78)"
      />

      {/* Windows on main building */}
      <ellipse cx="110" cy="82" rx="10" ry="13" fill="oklch(0.30 0.10 147)" />
      <ellipse cx="160" cy="82" rx="12" ry="15" fill="oklch(0.30 0.10 147)" />
      <ellipse cx="210" cy="82" rx="10" ry="13" fill="oklch(0.30 0.10 147)" />

      {/* Door */}
      <path
        d="M148 120 L148 95 Q160 88 172 95 L172 120 Z"
        fill="oklch(0.72 0.12 78)"
        opacity="0.7"
      />

      {/* Ground line */}
      <line
        x1="0"
        y1="120"
        x2="320"
        y2="120"
        stroke="oklch(0.22 0.08 147)"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}
