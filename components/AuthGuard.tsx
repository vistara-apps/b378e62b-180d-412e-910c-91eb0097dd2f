'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isAuthenticated) {
        await signIn();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [isAuthenticated, signIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="headline text-gray-900 mb-4">Welcome to PantryPal AI</h2>
          <p className="body text-textSecondary mb-6">
            Connect your wallet to get started with smart meal planning.
          </p>
          <button
            onClick={signIn}
            className="btn-primary"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

