'use client';

import { Package2, Calendar, AlertCircle } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  purchaseDate: string;
  estimatedExpirationDate: string;
  daysUntilExpiration: number;
}

interface PantryListProps {
  variant?: 'compact' | 'detailed';
}

// Mock data for demonstration
const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Organic Milk',
    quantity: 1,
    unit: 'gallon',
    category: 'Dairy',
    purchaseDate: '2024-01-15',
    estimatedExpirationDate: '2024-01-22',
    daysUntilExpiration: 2,
  },
  {
    id: '2',
    name: 'Bananas',
    quantity: 6,
    unit: 'pieces',
    category: 'Fruits',
    purchaseDate: '2024-01-14',
    estimatedExpirationDate: '2024-01-21',
    daysUntilExpiration: 3,
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'lbs',
    category: 'Meat',
    purchaseDate: '2024-01-13',
    estimatedExpirationDate: '2024-01-25',
    daysUntilExpiration: 7,
  },
  {
    id: '4',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    purchaseDate: '2024-01-16',
    estimatedExpirationDate: '2024-01-23',
    daysUntilExpiration: 5,
  },
];

export function PantryList({ variant = 'compact' }: PantryListProps) {
  const getExpirationColor = (days: number) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  const getExpirationIcon = (days: number) => {
    if (days <= 1) return <AlertCircle className="w-4 h-4 text-red-600" />;
    if (days <= 3) return <Calendar className="w-4 h-4 text-orange-600" />;
    return <Calendar className="w-4 h-4 text-green-600" />;
  };

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 px-2">Recent Items</h3>
        <div className="space-y-2">
          {mockPantryItems.slice(0, 4).map((item) => (
            <div key={item.id} className="card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package2 className="w-5 h-5 text-textSecondary" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="caption">{item.quantity} {item.unit}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getExpirationIcon(item.daysUntilExpiration)}
                  <span className={`text-xs font-medium ${getExpirationColor(item.daysUntilExpiration)}`}>
                    {item.daysUntilExpiration}d
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 px-2">All Pantry Items</h3>
      <div className="space-y-2">
        {mockPantryItems.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Package2 className="w-6 h-6 text-textSecondary" />
                <div>
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="caption">{item.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{item.quantity} {item.unit}</div>
                <div className={`text-xs font-medium ${getExpirationColor(item.daysUntilExpiration)}`}>
                  {item.daysUntilExpiration} days left
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-textSecondary">
              <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
              <span>Expires: {new Date(item.estimatedExpirationDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
