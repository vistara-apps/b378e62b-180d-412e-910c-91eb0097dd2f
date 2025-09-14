import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}

// Date utilities
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = target.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`;
  } else if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Tomorrow';
  } else {
    return `In ${diffInDays} days`;
  }
}

export function getDaysUntilExpiration(expirationDate: string | Date): number {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diffInMs = expiry.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

// Pantry utilities
export function categorizeExpirationUrgency(daysUntilExpiration: number): 'expired' | 'urgent' | 'warning' | 'good' {
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 1) return 'urgent';
  if (daysUntilExpiration <= 3) return 'warning';
  return 'good';
}

export function estimateExpirationDate(itemName: string, purchaseDate: string): string {
  // Simple estimation based on common food items
  // In a real app, this would use a comprehensive database
  const expirationDays: Record<string, number> = {
    // Dairy
    'milk': 7,
    'yogurt': 14,
    'cheese': 21,
    'butter': 30,
    
    // Produce
    'bananas': 5,
    'apples': 14,
    'lettuce': 7,
    'carrots': 21,
    'potatoes': 30,
    
    // Meat
    'chicken': 3,
    'beef': 5,
    'fish': 2,
    'pork': 4,
    
    // Pantry staples
    'bread': 7,
    'eggs': 21,
    'rice': 365,
    'pasta': 730,
  };

  const itemKey = itemName.toLowerCase();
  const defaultDays = 7; // Default to 1 week if unknown
  
  let estimatedDays = defaultDays;
  for (const [key, days] of Object.entries(expirationDays)) {
    if (itemKey.includes(key)) {
      estimatedDays = days;
      break;
    }
  }

  const purchaseDateTime = new Date(purchaseDate);
  const expirationDate = new Date(purchaseDateTime);
  expirationDate.setDate(purchaseDateTime.getDate() + estimatedDays);
  
  return expirationDate.toISOString().split('T')[0];
}

// Recipe utilities
export function calculateTotalTime(prepTime: number, cookTime: number): number {
  return prepTime + cookTime;
}

export function formatCookingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function getDifficultyColor(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-50';
    case 'Medium':
      return 'text-orange-600 bg-orange-50';
    case 'Hard':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Nutrition utilities
export function calculateCaloriesPerServing(totalCalories: number, servings: number): number {
  return Math.round(totalCalories / servings);
}

// Price utilities
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculatePricePerUnit(price: number, quantity: number): number {
  return price / quantity;
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidQuantity(quantity: number): boolean {
  return quantity > 0 && Number.isFinite(quantity);
}

// Array utilities
export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], keyFn: (item: T) => number | string, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = keyFn(a);
    const bVal = keyFn(b);
    
    if (order === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
}

// Local storage utilities
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}
