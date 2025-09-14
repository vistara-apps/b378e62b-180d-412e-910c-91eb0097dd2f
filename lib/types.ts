// User types
export interface User {
  userId: string;
  farcasterId?: string;
  preferences: UserPreferences;
  subscriptionStatus: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  dietary: string[]; // e.g., ['vegetarian', 'gluten-free']
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  cookingTime: 'quick' | 'moderate' | 'extended'; // <30min, 30-60min, >60min
  householdSize: number;
  allergies: string[];
  dislikedIngredients: string[];
}

// Pantry types
export interface PantryItem {
  itemId: string;
  userId: string;
  name: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  estimatedExpirationDate: string;
  category: string;
  brand?: string;
  price?: number;
  nutritionInfo?: NutritionInfo;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

// Receipt types
export interface Receipt {
  receiptId: string;
  userId: string;
  uploadDate: string;
  storeName?: string;
  storeAddress?: string;
  totalAmount?: number;
  parsedItems: ParsedReceiptItem[];
  rawText?: string;
  imageUrl?: string;
  processingStatus: 'pending' | 'completed' | 'failed';
}

export interface ParsedReceiptItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category?: string;
  confidence: number; // OCR confidence score
}

// Recipe types
export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietaryTags: string[];
  nutritionInfo?: NutritionInfo;
  imageUrl?: string;
  sourceUrl?: string;
  rating?: number;
  createdAt: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
  substitutes?: string[];
}

// Meal Plan types
export interface MealPlan {
  mealPlanId: string;
  userId: string;
  startDate: string;
  endDate: string;
  meals: MealPlanDay[];
  generatedDate: string;
  preferences: MealPlanPreferences;
  status: 'active' | 'completed' | 'cancelled';
}

export interface MealPlanDay {
  date: string;
  breakfast?: PlannedMeal;
  lunch?: PlannedMeal;
  dinner?: PlannedMeal;
  snacks?: PlannedMeal[];
}

export interface PlannedMeal {
  recipeId: string;
  recipeName: string;
  servings: number;
  ingredientsFromPantry: string[];
  missingIngredients: string[];
  estimatedCookTime: number;
}

export interface MealPlanPreferences {
  maxCookTimePerMeal: number;
  preferredCuisines: string[];
  avoidRepeats: boolean;
  prioritizeExpiringItems: boolean;
  budgetConstraint?: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'expiration' | 'low_stock' | 'meal_suggestion' | 'shopping_reminder';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

// Analytics types
export interface WasteAnalytics {
  userId: string;
  period: 'week' | 'month' | 'year';
  itemsWasted: number;
  estimatedValue: number;
  topWastedCategories: CategoryWaste[];
  wasteReduction: number; // percentage compared to previous period
}

export interface CategoryWaste {
  category: string;
  itemsWasted: number;
  estimatedValue: number;
}

// Shopping List types
export interface ShoppingList {
  listId: string;
  userId: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed';
}

export interface ShoppingListItem {
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
  purchased: boolean;
  estimatedPrice?: number;
  notes?: string;
}
