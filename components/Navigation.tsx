'use client';

import { Home, Camera, Calendar, User, ChefHat } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'scan', icon: Camera, label: 'Scan' },
  { id: 'pantry', icon: ChefHat, label: 'Pantry' },
  { id: 'planner', icon: Calendar, label: 'Planner' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-textSecondary hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
