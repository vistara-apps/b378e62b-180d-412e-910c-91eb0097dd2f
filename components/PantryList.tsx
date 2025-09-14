'use client';

import { useState } from 'react';
import { Package2, Calendar, AlertCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { PantryItem } from '../lib/types';
import { categorizeExpirationUrgency, getDaysUntilExpiration } from '../lib/utils';
import { useAuth } from '../lib/auth';

interface PantryListProps {
  items: PantryItem[];
  variant?: 'compact' | 'detailed';
  onItemUpdate?: () => void;
  onItemDelete?: () => void;
}

export function PantryList({ items, variant = 'compact', onItemUpdate, onItemDelete }: PantryListProps) {
  const { user } = useAuth();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PantryItem>>({});

  const getExpirationColor = (days: number) => {
    const urgency = categorizeExpirationUrgency(days);
    switch (urgency) {
      case 'expired': return 'text-red-600';
      case 'urgent': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  const getExpirationIcon = (days: number) => {
    const urgency = categorizeExpirationUrgency(days);
    switch (urgency) {
      case 'expired':
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      default:
        return <Calendar className="w-4 h-4 text-green-600" />;
    }
  };

  const handleEdit = (item: PantryItem) => {
    setEditingItem(item.itemId);
    setEditForm({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingItem || !user) return;

    try {
      const response = await fetch(`/api/pantry/${editingItem}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          ...editForm,
        }),
      });

      if (response.ok) {
        setEditingItem(null);
        setEditForm({});
        onItemUpdate?.();
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!user) return;

    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/pantry/${itemId}?userId=${user.userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onItemDelete?.();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const processedItems = items.map(item => ({
    ...item,
    daysUntilExpiration: getDaysUntilExpiration(item.estimatedExpirationDate),
  }));

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="headline text-gray-900">Pantry Items</h3>
          <span className="caption text-textSecondary">{items.length} items</span>
        </div>
        <div className="space-y-2">
          {processedItems.slice(0, 6).map((item) => (
            <div key={item.itemId} className="card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package2 className="w-5 h-5 text-textSecondary" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="caption text-textSecondary">{item.quantity} {item.unit}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getExpirationIcon(item.daysUntilExpiration)}
                  <span className={`text-xs font-medium ${getExpirationColor(item.daysUntilExpiration)}`}>
                    {item.daysUntilExpiration <= 0 ? 'Expired' : `${item.daysUntilExpiration}d`}
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="headline text-gray-900">All Pantry Items</h3>
        <span className="caption text-textSecondary">{items.length} items</span>
      </div>
      <div className="space-y-3">
        {processedItems.map((item) => (
          <div key={item.itemId} className="card p-4">
            {editingItem === item.itemId ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="px-3 py-2 border border-border rounded-md"
                    placeholder="Item name"
                  />
                  <input
                    type="text"
                    value={editForm.category || ''}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="px-3 py-2 border border-border rounded-md"
                    placeholder="Category"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={editForm.quantity || ''}
                    onChange={(e) => setEditForm({ ...editForm, quantity: parseFloat(e.target.value) })}
                    className="px-3 py-2 border border-border rounded-md"
                    placeholder="Quantity"
                  />
                  <input
                    type="text"
                    value={editForm.unit || ''}
                    onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                    className="px-3 py-2 border border-border rounded-md"
                    placeholder="Unit"
                  />
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="btn-primary flex-1">
                    Save
                  </button>
                  <button onClick={() => setEditingItem(null)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Package2 className="w-6 h-6 text-textSecondary" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="caption text-textSecondary">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-textSecondary hover:text-gray-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.itemId)}
                      className="text-textSecondary hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-900">
                    {item.quantity} {item.unit}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getExpirationIcon(item.daysUntilExpiration)}
                    <span className={`text-xs font-medium ${getExpirationColor(item.daysUntilExpiration)}`}>
                      {item.daysUntilExpiration <= 0 ? 'Expired' : `${item.daysUntilExpiration} days left`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-textSecondary mt-2">
                  <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                  <span>Expires: {new Date(item.estimatedExpirationDate).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
