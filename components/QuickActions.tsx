'use client';

import { Camera, Upload, Utensils, Calendar } from 'lucide-react';

const actions = [
  {
    id: 'scan-receipt',
    icon: Camera,
    title: 'Scan Receipt',
    description: 'Add items to pantry',
    color: 'bg-primary',
  },
  {
    id: 'upload-receipt',
    icon: Upload,
    title: 'Upload Receipt',
    description: 'From gallery',
    color: 'bg-accent',
  },
  {
    id: 'find-recipes',
    icon: Utensils,
    title: 'Find Recipes',
    description: 'Based on pantry',
    color: 'bg-orange-500',
  },
  {
    id: 'meal-plan',
    icon: Calendar,
    title: 'Meal Plan',
    description: 'Weekly planner',
    color: 'bg-purple-500',
  },
];

export function QuickActions() {
  const handleAction = (actionId: string) => {
    console.log(`Action triggered: ${actionId}`);
    // TODO: Implement action handlers
  };

  return (
    <div className="space-y-4">
      <h2 className="headline text-gray-900 px-2">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className="card p-4 hover:shadow-lg transition-shadow duration-200 text-left"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="caption">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
