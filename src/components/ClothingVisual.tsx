import React from 'react';

interface ClothingVisualProps {
  category: 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory';
  subCategory: string;
  color: string;
  imageUrl?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ClothingVisual: React.FC<ClothingVisualProps> = ({
  category,
  subCategory,
  color,
  imageUrl,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    xs: 'w-10 h-10 rounded-xl',
    sm: 'w-14 h-14 rounded-2xl',
    md: 'w-20 h-20 rounded-2xl',
    lg: 'w-28 h-28 rounded-3xl',
    xl: 'w-40 h-40 rounded-4xl'
  };

  // Safe color for drawing icons
  const itemColor = color || '#a1a1aa';

  const renderIcon = () => {
    switch (category) {
      case 'top':
        if (subCategory.includes('Camisa')) {
          // Collared button shirt
          return (
            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 35 L30 15 L40 22 L50 15 L60 22 L70 15 L85 35 L75 80 L25 80 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M30 15 L50 30 L70 15" stroke="#3f3f46" strokeWidth="1.5" />
              <path d="M40 22 L50 30 L60 22" stroke="#3f3f46" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="50" y2="80" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="1,5" />
              <path d="M15 35 L25 45" stroke="#3f3f46" strokeWidth="1.5" />
              <path d="M85 35 L75 45" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          );
        } else if (subCategory.includes('Camiseta')) {
          // Classic T-shirt
          return (
            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 25 L35 15 L50 20 L65 15 L80 25 L80 40 L70 40 L70 85 L30 85 L30 40 L20 40 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M35 15 C40 22, 60 22, 65 15" stroke="#3f3f46" strokeWidth="2" />
              <line x1="20" y1="40" x2="30" y2="40" stroke="#3f3f46" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="70" y2="40" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          );
        } else {
          // Sweater / Suéter
          return (
            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 28 L30 18 L50 22 L70 18 L85 28 L85 55 L75 55 L75 85 L25 85 L25 55 L15 55 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M30 18 C35 24, 65 24, 70 18" stroke="#3f3f46" strokeWidth="2" />
              <line x1="25" y1="80" x2="75" y2="80" stroke="#3f3f46" strokeWidth="2" />
              <line x1="15" y1="52" x2="25" y2="52" stroke="#3f3f46" strokeWidth="1.5" />
              <line x1="85" y1="52" x2="75" y2="52" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          );
        }

      case 'bottom':
        if (subCategory.includes('Saia')) {
          return (
            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M35 15 L65 15 L85 85 C85 85, 50 90, 15 85 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M35 15 C45 17, 55 17, 65 15" stroke="#3f3f46" strokeWidth="2" />
              <path d="M40 16 L30 83" stroke="#3f3f46" strokeWidth="1.2" strokeOpacity="0.4" />
              <path d="M50 16 L50 86" stroke="#3f3f46" strokeWidth="1.2" strokeOpacity="0.4" />
              <path d="M60 16 L70 83" stroke="#3f3f46" strokeWidth="1.2" strokeOpacity="0.4" />
            </svg>
          );
        } else {
          // Trousers / Jeans
          return (
            <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 12 L72 12 L72 88 L54 88 L50 48 L46 88 L28 88 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M28 18 L72 18" stroke="#3f3f46" strokeWidth="1.5" />
              <circle cx="50" cy="15" r="2.5" fill="#3f3f46" stroke="none" />
              <path d="M50 18 L50 35 C48 35, 46 32, 46 30" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          );
        }

      case 'shoes':
        if (subCategory.includes('Tênis')) {
          return (
            <svg viewBox="0 0 100 100" className="w-[55%] h-[55%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 75 L30 45 L55 45 L88 62 L88 78 L12 78 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M12 72 L88 72 L88 78 L12 78 Z" fill="#ffffff" stroke="#3f3f46" strokeWidth="1.5" />
              <path d="M35 48 L48 58 M40 45 L52 54" stroke="#ffffff" strokeWidth="2.2" />
              <path d="M65 52 C70 54, 76 60, 80 68" stroke="#3f3f46" strokeWidth="1.3" />
            </svg>
          );
        } else if (subCategory.includes('Scarpin')) {
          return (
            <svg viewBox="0 0 100 100" className="w-[55%] h-[55%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M25 60 L45 60 L75 72 L88 72 L88 50 C80 50, 70 60, 50 60 L38 48 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <line x1="82" y1="72" x2="82" y2="90" stroke="#3f3f46" strokeWidth="3" />
              <line x1="81" y1="90" x2="84" y2="90" stroke="#3f3f46" strokeWidth="3" />
            </svg>
          );
        } else {
          return (
            <svg viewBox="0 0 100 100" className="w-[55%] h-[55%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 75 L45 55 L82 62 L82 78 L12 78 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
              <path d="M12 75 L82 75 L82 78 L12 78 Z" fill="#78350f" stroke="#3f3f46" strokeWidth="1.2" />
              <path d="M42 57 C30 63, 20 70, 15 75" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          );
        }

      case 'outerwear':
        return (
          <svg viewBox="0 0 100 100" className="w-[50%] h-[50%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20 L35 12 L50 20 L65 12 L80 20 L84 85 L50 88 L16 85 Z" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
            <path d="M35 12 L43 45 L50 35 L57 45 L65 12" stroke="#3f3f46" strokeWidth="2" fill="#3f3f46" fillOpacity="0.1" />
            <line x1="50" y1="40" x2="50" y2="88" stroke="#3f3f46" strokeWidth="1.8" />
            <circle cx="46" cy="52" r="2.2" fill="#fbbf24" stroke="#3f3f46" strokeWidth="1" />
            <circle cx="54" cy="52" r="2.2" fill="#fbbf24" stroke="#3f3f46" strokeWidth="1" />
          </svg>
        );

      case 'accessory':
        return (
          <svg viewBox="0 0 100 100" className="w-[45%] h-[45%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="25" y="40" width="50" height="42" rx="4" fill={itemColor} stroke="#3f3f46" strokeWidth="2.5" />
            <path d="M38 40 C38 22, 62 22, 62 40" stroke="#3f3f46" strokeWidth="2.2" />
            <path d="M25 48 H75" stroke="#3f3f46" strokeWidth="1.5" />
            <polygon points="45,48 55,48 50,56" fill="#fbbf24" stroke="#3f3f46" strokeWidth="1" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-lg">
            👚
          </div>
        );
    }
  };

  return (
    <div className={`relative bg-stone-50 overflow-hidden flex items-center justify-center shadow-xs border border-stone-200/50 hover:scale-[1.03] transition-all shrink-0 ${sizeClasses[size]} ${className}`}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={subCategory} 
          className="w-full h-full object-cover rounded-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // If the image fails to load, fallback to vector drawing
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        renderIcon()
      )}
      
      {/* Corner color family dot */}
      <div 
        className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white shadow-2xs z-10"
        style={{ backgroundColor: color }}
        title={subCategory}
      />
    </div>
  );
};
