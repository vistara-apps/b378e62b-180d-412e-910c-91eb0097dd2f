'use client';

import { Camera, ChefHat, Calendar, ShoppingCart } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'scan' | 'recipe' | 'meal-plan' | 'shopping';
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'scan',
    title: 'Receipt Scanned',
    description: 'Added 8 items to pantry from Whole Foods',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'recipe',
    title: 'Recipe Suggested',
    description: 'Chicken Stir Fry using expiring vegetables',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    type: 'meal-plan',
    title: 'Meal Plan Created',
    description: 'Weekly plan for Jan 15-21 generated',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    type: 'shopping',
    title: 'Shopping List',
    description: 'Created list for missing ingredients',
    timestamp: '3 days ago',
  },
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'scan':
      return <Camera className="w-5 h-5 text-primary" />;
    case 'recipe':
      return <ChefHat className="w-5 h-5 text-accent" />;
    case 'meal-plan':
      return <Calendar className="w-5 h-5 text-purple-500" />;
    case 'shopping':
      return <ShoppingCart className="w-5 h-5 text-orange-500" />;
    default:
      return <Camera className="w-5 h-5 text-gray-500" />;
  }
};

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <h2 className="headline text-gray-900 px-2">Recent Activity</h2>
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="card p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 mb-1">
                  {activity.title}
                </div>
                <div className="body text-textSecondary mb-2">
                  {activity.description}
                </div>
                <div className="caption">
                  {activity.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
