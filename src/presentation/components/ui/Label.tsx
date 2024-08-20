import React, { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <label className="block mb-2 text-sm font-bold" {...rest}>
      {children}
    </label>
  );
};

export default Label;
