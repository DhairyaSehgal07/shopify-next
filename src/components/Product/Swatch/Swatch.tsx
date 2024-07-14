import { FC } from 'react';
import { Check } from '@/components/icons';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  active?: boolean;
  variant?: 'size' | 'color' | string;
  onClick: () => void;
  className?: string;
}

const Swatch: FC<Props> = ({ color, label, variant, active, size = 'md', className, ...rest }) => {
  label = label?.toLowerCase();
  variant = variant?.toLocaleLowerCase();

  // Determine text color based on background color for better contrast
  const textColor = color ? (isDark(color) ? 'text-white' : 'text-black') : 'text-black';

  const baseClasses = 'cursor-pointer leading-6 font-semibold uppercase inline-flex items-center justify-center transition duration-150 ease-in-out border box-border relative';
  const sizeClasses = size === 'sm' ? 'h-7 w-7' : 'h-12 w-12';
  const activeClasses = active && variant ? 'border-black border-2' : '';
  const hoverClasses = 'hover:transform hover:scale-110 hover:text-primary hover:border-gray-200';
  const focusClasses = 'focus:outline-none focus:border-black';

  const rootClassName = `${baseClasses} ${sizeClasses} ${activeClasses} ${hoverClasses} ${focusClasses} ${textColor} ${className}`;

  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className={rootClassName}
      {...rest}
    >
      {variant === 'color' && active && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check className={textColor} />
        </span>
      )}
      {variant === 'size' && (
        <span className={textColor}>{label}</span>
      )}
    </button>
  );
};

// Helper function to determine if a color is dark
const isDark = (color: string): boolean => {
  const rgb = parseInt(color.substring(1), 16); // Convert hex to RGB
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 140; // A threshold to determine dark colors
};

export default Swatch;
