import { AuthGuard } from '../components/AuthGuard';
import { AppShell } from '../components/AppShell';
import { PantryOverview } from '../components/PantryOverview';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';

export default function HomePage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h1 className="display text-gray-900 mb-2">Smart Meal Planner</h1>
            <p className="body text-textSecondary max-w-md mx-auto">
              Your AI-powered kitchen assistant that turns groceries into meals and waste into savings.
            </p>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Pantry Overview */}
          <PantryOverview />

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </AppShell>
    </AuthGuard>
  );
}
