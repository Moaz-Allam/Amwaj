import { forwardRef } from 'react';

const AkisLogo = forwardRef<HTMLDivElement, { className?: string }>(({ className = '' }, ref) => (
  <div ref={ref} className={`flex items-center gap-2 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d={`M16 16 Q${16 + 8 * Math.cos(((angle - 30) * Math.PI) / 180)} ${16 + 8 * Math.sin(((angle - 30) * Math.PI) / 180)}, ${16 + 12 * Math.cos((angle * Math.PI) / 180)} ${16 + 12 * Math.sin((angle * Math.PI) / 180)} Q${16 + 8 * Math.cos(((angle + 30) * Math.PI) / 180)} ${16 + 8 * Math.sin(((angle + 30) * Math.PI) / 180)}, 16 16`}
          fill={i % 2 === 0 ? 'hsl(200, 80%, 34%)' : 'hsl(240, 33%, 30%)'}
          opacity={0.9}
        />
      ))}
    </svg>
    <span className="text-lg font-bold tracking-tight text-foreground">
      AKIS <span className="font-medium text-muted-foreground">STUDIO</span>
    </span>
  </div>
));

AkisLogo.displayName = 'AkisLogo';

export default AkisLogo;
