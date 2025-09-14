# PantryPal AI - Smart Kitchen Assistant

Your AI-powered kitchen assistant that turns groceries into meals and waste into savings.

## Features

- **Receipt Scanning & Pantry Automation**: Upload grocery receipts and automatically populate your pantry inventory
- **Smart Expiration Tracking**: Get notified before items expire to reduce food waste
- **Ingredient-First Recipe Suggestions**: Find recipes based on what you already have
- **Personalized Weekly Meal Plans**: AI-generated meal plans tailored to your preferences
- **Base Mini App Integration**: Built for the Base ecosystem with wallet connectivity

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via MiniKit
- **AI**: OpenAI/OpenRouter for recipe generation and meal planning
- **OCR**: Google Vision API for receipt scanning
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for:
  - MiniKit (Base)
  - OnchainKit (Coinbase)
  - OpenAI/OpenRouter
  - Google Vision API (optional, for OCR)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pantrypal-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
GOOGLE_VISION_API_KEY=your_google_vision_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error boundary
│   ├── globals.css        # Global styles
│   └── providers.tsx      # MiniKit provider setup
├── components/            # React components
│   ├── AppShell.tsx       # Main app layout
│   ├── Navigation.tsx     # Bottom navigation
│   ├── QuickActions.tsx   # Action buttons
│   ├── PantryOverview.tsx # Pantry stats and items
│   ├── PantryList.tsx     # Pantry item list
│   ├── ReceiptScanner.tsx # Receipt upload/scan
│   ├── RecipeCard.tsx     # Recipe display
│   ├── MealPlannerCalendar.tsx # Meal planning
│   ├── RecentActivity.tsx # Activity feed
│   └── NotificationBadge.tsx # Notifications
├── lib/                   # Utilities and services
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   ├── constants.ts      # App constants
│   └── ai-service.ts     # AI integration service
├── public/               # Static assets
└── README.md
```

## Key Components

### AppShell
Main application layout with navigation and content area. Supports glass and default variants.

### ReceiptScanner
Handles receipt upload and OCR processing. Supports both camera capture and file upload modes.

### PantryOverview
Displays pantry statistics, expiring items alerts, and pantry item management.

### MealPlannerCalendar
Weekly and monthly meal planning interface with drag-and-drop functionality.

### AI Service
Integrates with OpenAI/OpenRouter for:
- Recipe generation based on available ingredients
- Meal plan creation
- Receipt text parsing and item extraction
- Expiring ingredient recipe suggestions

## Design System

The app uses a custom design system with:

- **Colors**: Primary blue, accent green, neutral grays
- **Typography**: Display, headline, body, and caption styles
- **Components**: Card-based layout with consistent spacing
- **Motion**: Smooth transitions with cubic-bezier easing
- **Mobile-first**: Responsive design optimized for mobile

## API Integration

### MiniKit (Base)
- User authentication via Base wallet
- Transaction handling for premium features
- Identity management

### OnchainKit (Coinbase)
- Wallet connection and management
- Transaction components
- Identity verification

### AI Services
- Recipe generation and meal planning
- Receipt parsing and item extraction
- Personalized recommendations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Prettier for code formatting
- Consistent naming conventions

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js.

1. Build the application:
```bash
npm run build
```

2. Set environment variables in your deployment platform

3. Deploy using your preferred method

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@pantrypal.ai or create an issue in the repository.
