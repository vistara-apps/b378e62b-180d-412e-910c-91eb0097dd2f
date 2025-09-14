'use client';

import { useMiniKit } from '@coinbase/minikit';
import { Database } from './database';
import { User } from './types';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signIn(): Promise<User | null> {
    try {
      // This would integrate with MiniKit for wallet authentication
      // For now, we'll create a mock user based on wallet address
      const mockUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Check if user exists, create if not
      let user = await Database.getUser(mockUserId);
      if (!user) {
        user = await Database.createUser({
          userId: mockUserId,
          farcasterId: undefined, // Would come from MiniKit
          preferences: {
            dietary: [],
            skillLevel: 'beginner',
            cookingTime: 'moderate',
            householdSize: 2,
            allergies: [],
            dislikedIngredients: [],
          },
          subscriptionStatus: 'free',
        });
      }

      this.currentUser = user;
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = AuthService.getInstance();

// React hook for authentication
export function useAuth() {
  const { walletAddress } = useMiniKit();

  const signIn = async () => {
    return await authService.signIn();
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
    walletAddress,
  };
}

