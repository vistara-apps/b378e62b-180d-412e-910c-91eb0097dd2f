'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';

interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
}

interface MealPlannerCalendarProps {
  variant?: 'weekly' | 'monthly';
}

export function MealPlannerCalendar({ variant = 'weekly' }: MealPlannerCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Mock meal plans
  const mockMealPlans: MealPlan[] = [
    {
      id: '1',
      date: '2024-01-18',
      meals: {
        breakfast: 'Oatmeal with Berries',
        lunch: 'Chicken Salad',
        dinner: 'Pasta Primavera',
      },
    },
    {
      id: '2',
      date: '2024-01-19',
      meals: {
        breakfast: 'Scrambled Eggs',
        lunch: 'Turkey Sandwich',
        dinner: 'Stir Fry',
      },
    },
  ];

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMealPlanForDate = (date: string) => {
    return mockMealPlans.find(plan => plan.date === date);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  if (variant === 'weekly') {
    const weekDays = getWeekDays();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="headline text-gray-900">Weekly Meal Plan</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-textSecondary" />
            </button>
            <span className="font-medium text-gray-900 min-w-[120px] text-center">
              {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {weekDays.map((day) => {
            const dateStr = formatDate(day);
            const mealPlan = getMealPlanForDate(dateStr);
            const isToday = dateStr === formatDate(new Date());
            
            return (
              <div
                key={dateStr}
                className={`card p-4 ${isToday ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {day.toLocaleDateString('en-US', { weekday: 'long' })}
                    </h3>
                    <p className="caption">
                      {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {isToday && <span className="text-primary ml-1">(Today)</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDate(dateStr)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 text-textSecondary" />
                  </button>
                </div>

                {mealPlan ? (
                  <div className="space-y-2">
                    {mealPlan.meals.breakfast && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          Breakfast
                        </span>
                        <span className="text-sm text-gray-900">{mealPlan.meals.breakfast}</span>
                      </div>
                    )}
                    {mealPlan.meals.lunch && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          Lunch
                        </span>
                        <span className="text-sm text-gray-900">{mealPlan.meals.lunch}</span>
                      </div>
                    )}
                    {mealPlan.meals.dinner && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          Dinner
                        </span>
                        <span className="text-sm text-gray-900">{mealPlan.meals.dinner}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="caption">No meals planned</p>
                    <button className="text-sm text-primary font-medium mt-1">
                      Add meals
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Monthly view would be implemented here
  return (
    <div className="card p-6">
      <p className="text-center text-textSecondary">Monthly view coming soon...</p>
    </div>
  );
}
