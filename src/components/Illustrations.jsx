export function PaperPlane({ className = '', size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M10 50L90 15L55 85L45 55L10 50Z" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#e2e8f0"/>
      <path d="M45 55L90 15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M45 55L55 85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 45C20 48 35 52 45 55" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4"/>
      <path d="M3 52C18 53 33 54 45 55" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4"/>
    </svg>
  )
}

export function Pencil({ className = '', size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <rect x="20" y="10" width="14" height="65" rx="2" transform="rotate(15 27 42)" fill="#fbbf24" stroke="#94a3b8" strokeWidth="2"/>
      <polygon points="20,75 27,95 34,75" transform="rotate(15 27 82)" fill="#f9fafb" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="20" y="10" width="14" height="10" rx="2" transform="rotate(15 27 15)" fill="#fb923c" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="23" y1="90" x2="31" y2="90" transform="rotate(15 27 82)" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function Motor({ className = '', size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="22" stroke="#94a3b8" strokeWidth="2.5" fill="#e2e8f0"/>
      <circle cx="50" cy="50" r="8" fill="#94a3b8" opacity="0.3" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="50" cy="50" r="3" fill="#94a3b8"/>
      <line x1="50" y1="28" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="72" x2="50" y2="85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="50" x2="15" y2="50" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="72" y1="50" x2="85" y2="50" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M42 35C46 32 54 32 58 35" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 65C46 68 54 68 58 65" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function Gear({ className = '', size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M50 10L55 20L65 15L62 27L75 28L68 38L80 45L70 50L80 55L68 62L75 72L62 73L65 85L55 80L50 90L45 80L35 85L38 73L25 72L32 62L20 55L30 50L20 45L32 38L25 28L38 27L35 15L45 20L50 10Z" stroke="#94a3b8" strokeWidth="2" fill="#e2e8f0" strokeLinejoin="round"/>
      <circle cx="50" cy="50" r="12" fill="#f9fafb" stroke="#94a3b8" strokeWidth="2"/>
    </svg>
  )
}

export function Lightbulb({ className = '', size = 55 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M50 10C35 10 22 22 22 38C22 50 32 58 38 65L38 75L62 75L62 65C68 58 78 50 78 38C78 22 65 10 50 10Z" stroke="#94a3b8" strokeWidth="2.5" fill="#fef3c7" strokeLinejoin="round"/>
      <line x1="38" y1="80" x2="62" y2="80" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="85" x2="60" y2="85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="42" y1="90" x2="58" y2="90" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 10V5" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 38L22 33" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M70 38L78 33" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 38V28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

export function Chip({ className = '', size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <rect x="25" y="25" width="50" height="50" rx="6" stroke="#94a3b8" strokeWidth="2.5" fill="#e2e8f0"/>
      <rect x="35" y="35" width="30" height="30" rx="3" stroke="#94a3b8" strokeWidth="2" fill="#f9fafb"/>
      <circle cx="50" cy="50" r="5" fill="#94a3b8" opacity="0.3"/>
      {[35, 50, 65].map(x => (
        <g key={`t${x}`}>
          <line x1={x} y1="25" x2={x} y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
          <line x1={x} y1="75" x2={x} y2="85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        </g>
      ))}
      {[35, 50, 65].map(y => (
        <g key={`l${y}`}>
          <line x1="25" y1={y} x2="15" y2={y} stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
          <line x1="75" y1={y} x2="85" y2={y} stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  )
}

export function Wrench({ className = '', size = 55 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M75 25C65 15 48 18 42 28L28 42L58 72L72 58L82 42C88 48 85 65 75 75" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="80" cy="20" r="12" stroke="#94a3b8" strokeWidth="2" fill="#e2e8f0"/>
      <path d="M75 14L85 26M85 14L75 26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
