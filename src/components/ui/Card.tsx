import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature';
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all';
  
  const variants = {
    default: 'hover:shadow-xl',
    feature: 'hover:shadow-2xl hover:border-blue-200',
  };

  // Simple class merging without tailwind-merge
  const mergedClassName = `${baseStyles} ${variants[variant]} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
