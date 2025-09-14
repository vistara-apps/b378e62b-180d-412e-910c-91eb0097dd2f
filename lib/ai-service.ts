import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export interface RecipeGenerationParams {
  availableIngredients: string[];
  dietaryRestrictions: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  maxCookTime: number;
  servings: number;
  cuisinePreference?: string;
  mealType?: string;
}

export interface GeneratedRecipe {
  name: string;
  description: string;
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
    optional?: boolean;
  }>;
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietaryTags: string[];
  tips?: string[];
}

export interface MealPlanParams {
  availableIngredients: string[];
  dietaryRestrictions: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  maxCookTimePerMeal: number;
  householdSize: number;
  daysToPlan: number;
  preferredCuisines: string[];
  avoidRepeats: boolean;
  prioritizeExpiringItems: boolean;
  expiringIngredients: Array<{ name: string; daysUntilExpiration: number }>;
}

export interface GeneratedMealPlan {
  days: Array<{
    date: string;
    meals: {
      breakfast?: GeneratedRecipe;
      lunch?: GeneratedRecipe;
      dinner?: GeneratedRecipe;
    };
  }>;
  shoppingList: Array<{
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }>;
  nutritionSummary: {
    totalCalories: number;
    avgCaloriesPerDay: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
}

export class AIService {
  private static instance: AIService;

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateRecipe(params: RecipeGenerationParams): Promise<GeneratedRecipe> {
    const prompt = this.buildRecipePrompt(params);

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and nutritionist. Generate detailed, practical recipes based on available ingredients and dietary requirements. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(response) as GeneratedRecipe;
    } catch (error) {
      console.error('Error generating recipe:', error);
      throw new Error('Failed to generate recipe. Please try again.');
    }
  }

  async generateMealPlan(params: MealPlanParams): Promise<GeneratedMealPlan> {
    const prompt = this.buildMealPlanPrompt(params);

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a professional meal planning nutritionist. Create comprehensive meal plans that optimize ingredient usage, minimize waste, and meet dietary requirements. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 4000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(response) as GeneratedMealPlan;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw new Error('Failed to generate meal plan. Please try again.');
    }
  }

  async parseReceiptText(ocrText: string): Promise<Array<{
    name: string;
    quantity: number;
    unit: string;
    price: number;
    category: string;
    confidence: number;
  }>> {
    const prompt = `
Parse this grocery receipt OCR text and extract items with their details. 
Return a JSON array of items with name, quantity, unit, price, category, and confidence (0-1).

OCR Text:
${ocrText}

Requirements:
- Normalize item names (e.g., "BANANAS ORG" -> "Organic Bananas")
- Estimate quantities and units if not explicit
- Categorize items (Dairy, Meat & Poultry, Fruits, Vegetables, etc.)
- Assign confidence based on text clarity
- Only include food items, exclude non-food items

Example output:
[
  {
    "name": "Organic Milk",
    "quantity": 1,
    "unit": "gallon",
    "price": 4.99,
    "category": "Dairy",
    "confidence": 0.95
  }
]
`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at parsing grocery receipts. Extract and normalize food items with high accuracy. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(response);
    } catch (error) {
      console.error('Error parsing receipt:', error);
      throw new Error('Failed to parse receipt. Please try again.');
    }
  }

  async suggestRecipesForExpiringItems(
    expiringItems: Array<{ name: string; daysUntilExpiration: number }>,
    allPantryItems: string[],
    dietaryRestrictions: string[] = []
  ): Promise<GeneratedRecipe[]> {
    const prompt = `
Suggest 3 recipes that prioritize using these expiring ingredients:
${expiringItems.map(item => `- ${item.name} (expires in ${item.daysUntilExpiration} days)`).join('\n')}

Available pantry items: ${allPantryItems.join(', ')}
Dietary restrictions: ${dietaryRestrictions.join(', ') || 'None'}

Requirements:
- Prioritize ingredients expiring soonest
- Use as many expiring items as possible per recipe
- Provide practical, achievable recipes
- Include prep and cook times
- Return as JSON array of recipe objects

Each recipe should have: name, description, ingredients (with quantities), instructions, prepTime, cookTime, servings, difficulty, dietaryTags.
`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a chef specializing in reducing food waste. Create recipes that maximize the use of expiring ingredients. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(response) as GeneratedRecipe[];
    } catch (error) {
      console.error('Error suggesting recipes for expiring items:', error);
      throw new Error('Failed to suggest recipes. Please try again.');
    }
  }

  private buildRecipePrompt(params: RecipeGenerationParams): string {
    return `
Generate a recipe using these parameters:

Available ingredients: ${params.availableIngredients.join(', ')}
Dietary restrictions: ${params.dietaryRestrictions.join(', ') || 'None'}
Skill level: ${params.skillLevel}
Max cooking time: ${params.maxCookTime} minutes
Servings: ${params.servings}
${params.cuisinePreference ? `Cuisine preference: ${params.cuisinePreference}` : ''}
${params.mealType ? `Meal type: ${params.mealType}` : ''}

Requirements:
- Use as many available ingredients as possible
- Respect dietary restrictions
- Match skill level complexity
- Stay within time limit
- Provide exact quantities and clear instructions
- Include helpful cooking tips

Return as JSON with this structure:
{
  "name": "Recipe Name",
  "description": "Brief description",
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": number,
      "unit": "unit",
      "optional": boolean
    }
  ],
  "instructions": ["step 1", "step 2", ...],
  "prepTime": minutes,
  "cookTime": minutes,
  "servings": number,
  "difficulty": "Easy|Medium|Hard",
  "dietaryTags": ["tag1", "tag2"],
  "tips": ["tip1", "tip2"]
}
`;
  }

  private buildMealPlanPrompt(params: MealPlanParams): string {
    return `
Create a ${params.daysToPlan}-day meal plan with these parameters:

Available ingredients: ${params.availableIngredients.join(', ')}
Expiring soon: ${params.expiringIngredients.map(item => `${item.name} (${item.daysUntilExpiration} days)`).join(', ')}
Dietary restrictions: ${params.dietaryRestrictions.join(', ') || 'None'}
Skill level: ${params.skillLevel}
Max cook time per meal: ${params.maxCookTimePerMeal} minutes
Household size: ${params.householdSize}
Preferred cuisines: ${params.preferredCuisines.join(', ') || 'Any'}
Avoid repeats: ${params.avoidRepeats}
Prioritize expiring items: ${params.prioritizeExpiringItems}

Requirements:
- Plan breakfast, lunch, and dinner for each day
- Prioritize expiring ingredients if requested
- Minimize food waste
- Provide variety across days
- Include shopping list for missing ingredients
- Calculate nutrition summary

Return as JSON with this structure:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "meals": {
        "breakfast": { recipe object },
        "lunch": { recipe object },
        "dinner": { recipe object }
      }
    }
  ],
  "shoppingList": [
    {
      "name": "item name",
      "quantity": number,
      "unit": "unit",
      "category": "category"
    }
  ],
  "nutritionSummary": {
    "totalCalories": number,
    "avgCaloriesPerDay": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fat": number
    }
  }
}
`;
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
