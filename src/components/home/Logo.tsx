export default function Logo({ className = "h-32 md:h-48" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 1250 370" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#glow)">
        <text x="0" y="250" fontFamily="Arial Black, sans-serif" fontSize="280" fontWeight="900" fill="#FF8C42" letterSpacing="-10">
          ЮР
        </text>
        
        <rect x="520" y="0" width="10" height="370" fill="#FF8C42"/>
        
        <text x="580" y="160" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="700" fill="#FF8C42">
          ЮРИСТ
        </text>
        <text x="580" y="280" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="700" fill="#FF8C42">
          РИЭЛТОР
        </text>
        
        <path d="M 180 120 L 280 80 L 380 120 L 380 180 L 280 220 L 180 180 Z" 
              fill="none" 
              stroke="#FF8C42" 
              strokeWidth="8"
              opacity="0.6"/>
        
        <rect x="270" y="190" width="20" height="30" fill="#FF8C42" opacity="0.6"/>
      </g>
    </svg>
  );
}
