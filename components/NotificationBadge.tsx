'use client';

import { AlertTriangle, Info, X } from 'lucide-react';

interface NotificationBadgeProps {
  variant?: 'urgent' | 'info';
  title: string;
  message: string;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export function NotificationBadge({
  variant = 'info',
  title,
  message,
  onDismiss,
  actionLabel,
  onAction,
}: NotificationBadgeProps) {
  const isUrgent = variant === 'urgent';
  
  const bgColor = isUrgent ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200';
  const iconColor = isUrgent ? 'text-red-600' : 'text-blue-600';
  const textColor = isUrgent ? 'text-red-800' : 'text-blue-800';
  const buttonColor = isUrgent ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800';

  return (
    <div className={`${bgColor} border rounded-lg p-4 animate-fade-in`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {isUrgent ? (
            <AlertTriangle className={`w-5 h-5 ${iconColor}`} />
          ) : (
            <Info className={`w-5 h-5 ${iconColor}`} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${textColor} mb-1`}>{title}</h3>
          <p className={`text-sm ${textColor.replace('800', '700')}`}>{message}</p>
          
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className={`text-sm font-medium ${buttonColor} mt-2 hover:underline`}
            >
              {actionLabel}
            </button>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${iconColor} hover:opacity-70 transition-opacity duration-200`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
