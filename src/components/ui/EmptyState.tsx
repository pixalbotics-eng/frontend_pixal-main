'use client';

import React from 'react';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  message?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  className?: string;
}

export default function EmptyState({
  message = 'No data yet.',
  subtitle = 'Check back later or add content from admin.',
  showSubtitle = true,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
        <FiInbox className="text-blue-500" size={40} strokeWidth={1.5} />
      </div>
      <p className="text-gray-600 font-medium text-lg">{message}</p>
      {showSubtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
