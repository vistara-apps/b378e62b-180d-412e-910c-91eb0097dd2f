'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

interface ReceiptScannerProps {
  variant?: 'camera' | 'upload';
  onScanComplete?: (items: any[]) => void;
}

export function ReceiptScanner({ variant = 'camera', onScanComplete }: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      // Simulate camera capture and OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock scan result
      const mockItems = [
        { name: 'Organic Milk', quantity: 1, unit: 'gallon', price: 4.99 },
        { name: 'Bananas', quantity: 2, unit: 'lbs', price: 2.48 },
        { name: 'Chicken Breast', quantity: 1.5, unit: 'lbs', price: 8.97 },
      ];
      
      setScanResult(mockItems);
      onScanComplete?.(mockItems);
    } catch (err) {
      setError('Failed to scan receipt. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock scan result
      const mockItems = [
        { name: 'Bread', quantity: 1, unit: 'loaf', price: 3.49 },
        { name: 'Eggs', quantity: 1, unit: 'dozen', price: 2.99 },
        { name: 'Yogurt', quantity: 4, unit: 'cups', price: 5.96 },
      ];
      
      setScanResult(mockItems);
      onScanComplete?.(mockItems);
    } catch (err) {
      setError('Failed to process receipt. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (scanResult) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Check className="w-6 h-6 text-accent" />
            <h3 className="headline text-gray-900">Scan Complete</h3>
          </div>
          <button onClick={resetScanner} className="text-textSecondary hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          {scanResult.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <div>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="caption">{item.quantity} {item.unit}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">${item.price}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="btn-primary w-full">
          Add to Pantry
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="headline text-gray-900 mb-4 text-center">
        {variant === 'camera' ? 'Scan Receipt' : 'Upload Receipt'}
      </h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {isScanning ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="body text-textSecondary">
            {variant === 'camera' ? 'Processing image...' : 'Analyzing receipt...'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {variant === 'camera' ? (
            <button
              onClick={handleCameraCapture}
              className="w-full bg-primary text-white p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity duration-200"
            >
              <Camera className="w-6 h-6" />
              <span className="font-medium">Take Photo</span>
            </button>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-accent text-white p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity duration-200"
              >
                <Upload className="w-6 h-6" />
                <span className="font-medium">Choose File</span>
              </button>
            </>
          )}
          
          <p className="caption text-center">
            {variant === 'camera' 
              ? 'Position your receipt clearly in the camera view'
              : 'Select a clear image of your receipt from your device'
            }
          </p>
        </div>
      )}
    </div>
  );
}
