import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  rest?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, placeholder, value, onChange, className = '', style, type = 'text', ...rest }, ref) => {
    const inputStyle = {
      ...style,
    };

    return (
      <div className={`input ${className}`} style={inputStyle}>
        {label && (
          <label className="block mb-2 text-sm font-bold" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`py-3 px-4 bg-white block w-full border outline-none rounded-md text-sm border-[#cacbce] focus:border-2 ${className}`}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
