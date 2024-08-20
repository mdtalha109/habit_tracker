import React, { FC, ReactNode } from 'react';
import {cva} from 'class-variance-authority'
import { cn } from 'application/lib/util';


interface ButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

const buttonVariants = cva(
  `p-2  inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold outline-2 outline-offset-2 focus:outline-black focus:outline-none text-sm`,
  {
    variants: {
      variant: {
        'primary-raised': "text-white bg-primary-gradient hover:bg-bg-primary-gradient duration-150",
        'primary': 'text-dark hover:bg-primary-gradient hover:text-white border border-primary duration-150',

        'save-raised': "bg-green-600 text-white",
        'save': "text-green-600 bg-transparent hover:bg-slate-200 duration-150",
        "save-outline": "text-green-600 border border-green-600 hover:text-white hover:bg-green-600 duration-150",

        'danger': "text-white bg-red-500  duration-150",
        "danger-outline": "border border-red-500 hover:text-white hover:bg-red-500 duration-150",

        secondary: "text-primary hover:bg-slate-200",
      },
      size: {
        sm: "py-2 px-2 text-sm",
        md: "py-2 px-3 text-md",
        lg: "py-3 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);


const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant="primary",
  className = '',
  type = 'submit',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants({ className, variant }))}

      {...rest}
    >
      {children}
    </button>
  );
};

export default Button