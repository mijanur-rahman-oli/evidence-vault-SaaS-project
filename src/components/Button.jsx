import React from 'react';

const Button = ({ children, variant = 'primary', disabled = false, onClick, className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300'
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;