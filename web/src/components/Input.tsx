import React, { InputHTMLAttributes } from 'react';

import '../styles/components/input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  setInput(value: string): void;
}

const Input: React.FC<InputProps> = ({ label, value, setInput, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor="name">{label}</label>
      <input
        value={value}
        onChange={(event) => setInput(event.target.value)}
        {...rest}
      />
    </div>
  );
};

export default Input;
