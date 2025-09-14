'use client';

import { Clock, Users, ChefHat, Heart } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  imageUrl?: string;
  dietaryTags: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'withImage' | 'basic';
  onSelect?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, variant = 'withImage', onSelect }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {variant === 'withImage' && recipe.imageUrl && (
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{recipe.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="body text-textSecondary mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center space-x-4 mb-3 text-sm text-textSecondary">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{totalTime}m</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.ingredients.length} ingredients</span>
          </div>
        </div>
        
        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.dietaryTags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                {tag}
              </span>
            ))}
            {recipe.dietaryTags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                +{recipe.dietaryTags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <button
          onClick={() => onSelect?.(recipe)}
          className="btn-primary w-full"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
