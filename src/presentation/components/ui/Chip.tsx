import React, { ReactNode, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'application/lib/util';

const ChipVariants = cva(
  'rounded-lg border p-2 cursor-pointer', 
  {
    variants: {
      variant: {
        default: 'text-black',
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
      },
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-lg',
      },
      selected: {
        true: 'bg-secondary text-white', 
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      selected: false, 
    },
  }
);

type OmittedHTMLAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'size'>;

interface ChipProps extends OmittedHTMLAttributes, VariantProps<typeof ChipVariants> {
  children: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  [key: string]: any;
}

const Chip: React.FC<ChipProps> = ({ 
    children, 
    className, 
    size, 
    variant = 'default',
    selected = false,
    onSelect,
    ...rest 
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div 
      className={cn(ChipVariants({ variant, size, selected }), className)} 
      onClick={handleSelect} 
      {...rest}
    >
      {children}
    </div>
  );
};

export default Chip;
