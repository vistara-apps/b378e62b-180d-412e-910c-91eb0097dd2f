// Simple in-memory database for demo purposes
// In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.

import {
  User,
  PantryItem,
  Receipt,
  MealPlan,
  Recipe,
  ShoppingList,
  Notification,
  WasteAnalytics
} from './types';

// In-memory storage
const storage = {
  users: new Map<string, User>(),
  pantryItems: new Map<string, PantryItem[]>(),
  receipts: new Map<string, Receipt[]>(),
  mealPlans: new Map<string, MealPlan[]>(),
  recipes: new Map<string, Recipe>(),
  shoppingLists: new Map<string, ShoppingList[]>(),
  notifications: new Map<string, Notification[]>(),
  wasteAnalytics: new Map<string, WasteAnalytics>(),
};

// Database operations
export class Database {
  // User operations
  static async createUser(user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.users.set(user.userId, newUser);
    return newUser;
  }

  static async getUser(userId: string): Promise<User | null> {
    return storage.users.get(userId) || null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const user = storage.users.get(userId);
    if (!user) return null;

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    storage.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Pantry operations
  static async getPantryItems(userId: string): Promise<PantryItem[]> {
    return storage.pantryItems.get(userId) || [];
  }

  static async addPantryItem(userId: string, item: Omit<PantryItem, 'itemId' | 'createdAt' | 'updatedAt'>): Promise<PantryItem> {
    const items = storage.pantryItems.get(userId) || [];
    const newItem: PantryItem = {
      ...item,
      itemId: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newItem);
    storage.pantryItems.set(userId, items);
    return newItem;
  }

  static async updatePantryItem(userId: string, itemId: string, updates: Partial<PantryItem>): Promise<PantryItem | null> {
    const items = storage.pantryItems.get(userId) || [];
    const itemIndex = items.findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) return null;

    items[itemIndex] = {
      ...items[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    storage.pantryItems.set(userId, items);
    return items[itemIndex];
  }

  static async deletePantryItem(userId: string, itemId: string): Promise<boolean> {
    const items = storage.pantryItems.get(userId) || [];
    const filteredItems = items.filter(item => item.itemId !== itemId);
    if (filteredItems.length === items.length) return false;

    storage.pantryItems.set(userId, filteredItems);
    return true;
  }

  // Receipt operations
  static async createReceipt(userId: string, receipt: Omit<Receipt, 'receiptId' | 'createdAt'>): Promise<Receipt> {
    const receipts = storage.receipts.get(userId) || [];
    const newReceipt: Receipt = {
      ...receipt,
      receiptId: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    receipts.push(newReceipt);
    storage.receipts.set(userId, receipts);
    return newReceipt;
  }

  static async getReceipts(userId: string): Promise<Receipt[]> {
    return storage.receipts.get(userId) || [];
  }

  static async getReceipt(userId: string, receiptId: string): Promise<Receipt | null> {
    const receipts = storage.receipts.get(userId) || [];
    return receipts.find(receipt => receipt.receiptId === receiptId) || null;
  }

  // Meal Plan operations
  static async createMealPlan(userId: string, mealPlan: Omit<MealPlan, 'mealPlanId' | 'generatedDate'>): Promise<MealPlan> {
    const mealPlans = storage.mealPlans.get(userId) || [];
    const newMealPlan: MealPlan = {
      ...mealPlan,
      mealPlanId: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      generatedDate: new Date().toISOString(),
    };
    mealPlans.push(newMealPlan);
    storage.mealPlans.set(userId, mealPlans);
    return newMealPlan;
  }

  static async getMealPlans(userId: string): Promise<MealPlan[]> {
    return storage.mealPlans.get(userId) || [];
  }

  static async getMealPlan(userId: string, mealPlanId: string): Promise<MealPlan | null> {
    const mealPlans = storage.mealPlans.get(userId) || [];
    return mealPlans.find(plan => plan.mealPlanId === mealPlanId) || null;
  }

  // Recipe operations
  static async createRecipe(recipe: Omit<Recipe, 'recipeId' | 'createdAt'>): Promise<Recipe> {
    const newRecipe: Recipe = {
      ...recipe,
      recipeId: `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    storage.recipes.set(newRecipe.recipeId, newRecipe);
    return newRecipe;
  }

  static async getRecipe(recipeId: string): Promise<Recipe | null> {
    return storage.recipes.get(recipeId) || null;
  }

  static async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(storage.recipes.values());
  }

  // Shopping List operations
  static async createShoppingList(userId: string, shoppingList: Omit<ShoppingList, 'listId' | 'createdAt' | 'updatedAt'>): Promise<ShoppingList> {
    const lists = storage.shoppingLists.get(userId) || [];
    const newList: ShoppingList = {
      ...shoppingList,
      listId: `list_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    lists.push(newList);
    storage.shoppingLists.set(userId, lists);
    return newList;
  }

  static async getShoppingLists(userId: string): Promise<ShoppingList[]> {
    return storage.shoppingLists.get(userId) || [];
  }

  static async updateShoppingList(userId: string, listId: string, updates: Partial<ShoppingList>): Promise<ShoppingList | null> {
    const lists = storage.shoppingLists.get(userId) || [];
    const listIndex = lists.findIndex(list => list.listId === listId);
    if (listIndex === -1) return null;

    lists[listIndex] = {
      ...lists[listIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    storage.shoppingLists.set(userId, lists);
    return lists[listIndex];
  }

  // Notification operations
  static async createNotification(userId: string, notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const notifications = storage.notifications.get(userId) || [];
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    notifications.push(newNotification);
    storage.notifications.set(userId, notifications);
    return newNotification;
  }

  static async getNotifications(userId: string): Promise<Notification[]> {
    return storage.notifications.get(userId) || [];
  }

  static async markNotificationRead(userId: string, notificationId: string): Promise<boolean> {
    const notifications = storage.notifications.get(userId) || [];
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return false;

    notification.read = true;
    storage.notifications.set(userId, notifications);
    return true;
  }

  // Analytics operations
  static async updateWasteAnalytics(userId: string, analytics: WasteAnalytics): Promise<void> {
    storage.wasteAnalytics.set(userId, analytics);
  }

  static async getWasteAnalytics(userId: string): Promise<WasteAnalytics | null> {
    return storage.wasteAnalytics.get(userId) || null;
  }
}

