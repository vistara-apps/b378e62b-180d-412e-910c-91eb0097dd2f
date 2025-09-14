'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { googleVisionService } from '../lib/google-vision';
import { aiService } from '../lib/ai-service';
import { useAuth } from '../lib/auth';

interface ReceiptScannerProps {
  variant?: 'camera' | 'upload';
  onScanComplete?: (items: any[]) => void;
}

export function ReceiptScanner({ variant = 'camera', onScanComplete }: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const processReceiptImage = async (imageData: string) => {
    try {
      // Extract text using Google Vision API
      const ocrText = await googleVisionService.extractTextFromImage(imageData);

      // Parse receipt items using AI
      const parsedItems = await aiService.parseReceiptText(ocrText);

      return parsedItems;
    } catch (err) {
      console.error('Error processing receipt:', err);
      throw new Error('Failed to process receipt image');
    }
  };

  const handleCameraCapture = async () => {
    setIsScanning(true);
    setError(null);

    try {
      // In a real implementation, this would open the camera
      // For now, we'll show an error asking user to use file upload
      throw new Error('Camera functionality requires additional setup. Please use file upload instead.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan receipt. Please try again.');
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
      // Convert file to base64
      const base64Data = await googleVisionService.fileToBase64(file);

      // Process the receipt
      const parsedItems = await processReceiptImage(base64Data);

      setScanResult(parsedItems);
      onScanComplete?.(parsedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process receipt. Please try again.');
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

  const handleAddToPantry = async () => {
    if (!scanResult || !user) return;

    try {
      setIsScanning(true);

      // Send receipt data to API
      const response = await fetch('/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          ocrText: 'Processed via Google Vision API', // We already processed it
          parsedItems: scanResult,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save receipt');
      }

      // Reset scanner
      resetScanner();

      // Show success message (you could add a toast notification here)
      alert('Items added to pantry successfully!');
    } catch (err) {
      setError('Failed to add items to pantry. Please try again.');
    } finally {
      setIsScanning(false);
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
                <div className="caption text-textSecondary">
                  {item.quantity} {item.unit} • {item.category}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">${item.price.toFixed(2)}</div>
                <div className="caption text-textSecondary">
                  {item.confidence ? `${(item.confidence * 100).toFixed(0)}%` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddToPantry}
          disabled={isScanning}
          className="btn-primary w-full disabled:opacity-50"
        >
          {isScanning ? 'Adding to Pantry...' : 'Add to Pantry'}
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
