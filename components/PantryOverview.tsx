'use client';

import { useState } from 'react';
import { AlertTriangle, Package, Clock } from 'lucide-react';
import { PantryList } from './PantryList';

// Mock data for demonstration
const mockPantryStats = {
  totalItems: 24,
  expiringItems: 3,
  lowStockItems: 5,
};

const mockExpiringItems = [
  { id: '1', name: 'Milk', expiresIn: '2 days', category: 'Dairy' },
  { id: '2', name: 'Bananas', expiresIn: '3 days', category: 'Fruits' },
  { id: '3', name: 'Yogurt', expiresIn: '1 day', category: 'Dairy' },
];

export function PantryOverview() {
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="headline text-gray-900">Pantry Overview</h2>
        <button
          onClick={() => setViewMode(viewMode === 'compact' ? 'detailed' : 'compact')}
          className="text-sm text-primary font-medium"
        >
          {viewMode === 'compact' ? 'View Details' : 'Compact View'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <Package className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900">{mockPantryStats.totalItems}</div>
          <div className="caption">Total Items</div>
        </div>
        
        <div className="card p-3 text-center">
          <AlertTriangle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900">{mockPantryStats.expiringItems}</div>
          <div className="caption">Expiring Soon</div>
        </div>
        
        <div className="card p-3 text-center">
          <Clock className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900">{mockPantryStats.lowStockItems}</div>
          <div className="caption">Low Stock</div>
        </div>
      </div>

      {/* Expiring Items Alert */}
      {mockExpiringItems.length > 0 && (
        <div className="card p-4 border-l-4 border-orange-500">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="font-semibold text-gray-900">Items Expiring Soon</h3>
          </div>
          <div className="space-y-2">
            {mockExpiringItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{item.name}</span>
                <span className="text-xs text-orange-600 font-medium">{item.expiresIn}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pantry List */}
      <PantryList variant={viewMode} />
    </div>
  );
}
