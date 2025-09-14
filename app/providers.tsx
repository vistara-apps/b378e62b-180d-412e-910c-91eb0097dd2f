'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
    >
      {children}
    </OnchainKitProvider>
  );
}
