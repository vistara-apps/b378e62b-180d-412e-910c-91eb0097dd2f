// App configuration
export const APP_CONFIG = {
  name: 'PantryPal AI',
  tagline: 'Your AI-powered kitchen assistant that turns groceries into meals and waste into savings.',
  version: '1.0.0',
  supportEmail: 'support@pantrypal.ai',
} as const;

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Basic receipt scanning',
      'Pantry tracking',
      'Limited recipe suggestions (5/month)',
      'Basic expiration alerts',
    ],
    limits: {
      receiptsPerMonth: 10,
      recipeSuggestionsPerMonth: 5,
      pantryItems: 50,
    },
  },
  PREMIUM: {
    name: 'Premium',
    price: 7,
    features: [
      'Unlimited receipt scanning',
      'Advanced AI meal planning',
      'Personalized dietary filters',
      'Smart expiration alerts',
      'Waste analytics',
      'Family sharing',
      'Priority support',
    ],
    limits: {
      receiptsPerMonth: -1, // unlimited
      recipeSuggestionsPerMonth: -1, // unlimited
      pantryItems: -1, // unlimited
    },
  },
} as const;

// Food categories
export const FOOD_CATEGORIES = [
  'Dairy',
  'Meat & Poultry',
  'Seafood',
  'Fruits',
  'Vegetables',
  'Grains & Cereals',
  'Bakery',
  'Pantry Staples',
  'Frozen Foods',
  'Beverages',
  'Snacks',
  'Condiments & Sauces',
  'Herbs & Spices',
  'Other',
] as const;

// Dietary preferences
export const DIETARY_PREFERENCES = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Low-Carb',
  'Keto',
  'Paleo',
  'Mediterranean',
  'Low-Sodium',
  'Diabetic-Friendly',
  'Heart-Healthy',
] as const;

// Common allergens
export const COMMON_ALLERGENS = [
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soybeans',
  'Sesame',
] as const;

// Cooking skill levels
export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Simple recipes with basic techniques' },
  { value: 'intermediate', label: 'Intermediate', description: 'Moderate complexity with some advanced techniques' },
  { value: 'advanced', label: 'Advanced', description: 'Complex recipes requiring advanced skills' },
] as const;

// Cooking time preferences
export const COOKING_TIME_PREFERENCES = [
  { value: 'quick', label: 'Quick (< 30 min)', maxTime: 30 },
  { value: 'moderate', label: 'Moderate (30-60 min)', maxTime: 60 },
  { value: 'extended', label: 'Extended (> 60 min)', maxTime: 999 },
] as const;

// Recipe difficulty levels
export const RECIPE_DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

// Measurement units
export const MEASUREMENT_UNITS = {
  WEIGHT: ['oz', 'lb', 'g', 'kg'],
  VOLUME: ['tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'ml', 'l'],
  COUNT: ['piece', 'pieces', 'item', 'items', 'each'],
  PACKAGE: ['package', 'packages', 'bag', 'bags', 'box', 'boxes', 'can', 'cans', 'jar', 'jars'],
} as const;

// Expiration urgency thresholds (in days)
export const EXPIRATION_THRESHOLDS = {
  EXPIRED: 0,
  URGENT: 1,
  WARNING: 3,
  GOOD: 7,
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  EXPIRATION: 'expiration',
  LOW_STOCK: 'low_stock',
  MEAL_SUGGESTION: 'meal_suggestion',
  SHOPPING_REMINDER: 'shopping_reminder',
} as const;

// API endpoints (for external services)
export const API_ENDPOINTS = {
  GOOGLE_VISION: 'https://vision.googleapis.com/v1/images:annotate',
  OPENAI_CHAT: 'https://api.openai.com/v1/chat/completions',
  NUTRITION_API: 'https://api.nutritionix.com/v1_1/search',
} as const;

// Default expiration estimates (in days)
export const DEFAULT_EXPIRATION_DAYS: Record<string, number> = {
  // Dairy
  'milk': 7,
  'yogurt': 14,
  'cheese': 21,
  'butter': 30,
  'cream': 7,
  'sour cream': 14,
  
  // Produce - Fruits
  'bananas': 5,
  'apples': 14,
  'oranges': 14,
  'berries': 3,
  'grapes': 7,
  'avocado': 3,
  'tomatoes': 7,
  
  // Produce - Vegetables
  'lettuce': 7,
  'spinach': 5,
  'carrots': 21,
  'celery': 14,
  'broccoli': 7,
  'potatoes': 30,
  'onions': 30,
  'garlic': 90,
  
  // Meat & Poultry
  'chicken': 3,
  'beef': 5,
  'pork': 4,
  'turkey': 3,
  'ground meat': 2,
  
  // Seafood
  'fish': 2,
  'salmon': 2,
  'shrimp': 2,
  'crab': 2,
  
  // Bakery
  'bread': 7,
  'bagels': 7,
  'muffins': 5,
  'croissants': 3,
  
  // Pantry staples
  'eggs': 21,
  'rice': 365,
  'pasta': 730,
  'flour': 365,
  'sugar': 730,
  'oil': 365,
  'vinegar': 730,
  'canned goods': 730,
  
  // Default fallback
  'default': 7,
} as const;

// Recipe cuisines
export const RECIPE_CUISINES = [
  'American',
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'Indian',
  'Thai',
  'French',
  'Mediterranean',
  'Greek',
  'Spanish',
  'Korean',
  'Vietnamese',
  'Middle Eastern',
  'British',
  'German',
  'Russian',
  'Brazilian',
  'Moroccan',
  'Ethiopian',
] as const;

// Meal types
export const MEAL_TYPES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Dessert',
  'Appetizer',
  'Side Dish',
  'Beverage',
] as const;

// Shopping list priorities
export const SHOPPING_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'text-gray-600 bg-gray-50' },
  { value: 'medium', label: 'Medium', color: 'text-orange-600 bg-orange-50' },
  { value: 'high', label: 'High', color: 'text-red-600 bg-red-50' },
] as const;

// Color palette (matching design system)
export const COLORS = {
  PRIMARY: 'hsl(220, 80%, 40%)',
  ACCENT: 'hsl(140, 70%, 50%)',
  BG: 'hsla(220, 30%, 95%, 1)',
  SURFACE: 'hsl(0, 0%, 100%)',
  TEXT_SECONDARY: 'hsl(220, 20%, 50%)',
  BORDER: 'hsl(220, 20%, 90%)',
} as const;

// Animation durations (in ms)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  BASE: 250,
  SLOW: 400,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'pantrypal_user_preferences',
  PANTRY_ITEMS: 'pantrypal_pantry_items',
  MEAL_PLANS: 'pantrypal_meal_plans',
  SHOPPING_LISTS: 'pantrypal_shopping_lists',
  NOTIFICATIONS: 'pantrypal_notifications',
  ONBOARDING_COMPLETED: 'pantrypal_onboarding_completed',
} as const;
