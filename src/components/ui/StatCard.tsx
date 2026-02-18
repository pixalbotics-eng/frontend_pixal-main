import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

export default function StatCard({ label, value, className = '' }: StatCardProps) {
  return (
    <div className={`bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <div className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">{label}</div>
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FF6B35] leading-none">{value}</div>
    </div>
  );
}

