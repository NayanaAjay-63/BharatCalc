import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight, User, Heart, History, LogOut, Trash2 } from 'lucide-react';

// Mock data - in real app this would come from auth context/API
const mockUser = null; // Set to { email: 'user@example.com' } to simulate logged in state

const mockFavorites = [
  { title: 'EMI Calculator', href: '/calculators/finance/emi' },
  { title: 'BMI Calculator', href: '/calculators/health/bmi' },
];

const mockHistory = [
  { title: 'EMI Calculator', result: '₹45,000/month', date: '2024-12-20' },
  { title: 'SIP Calculator', result: '₹25,00,000', date: '2024-12-19' },
  { title: 'Age Calculator', result: '25 years, 3 months', date: '2024-12-18' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  // Redirect to login if not authenticated
  if (!mockUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Profile</span>
        </nav>

        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">{mockUser}</p>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'favorites' ? 'swiss' : 'outline'}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </Button>
          <Button
            variant={activeTab === 'history' ? 'swiss' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'favorites' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold">Saved Calculators</h2>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
            {mockFavorites.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No favorites yet. Save calculators to access them quickly.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {mockFavorites.map((fav) => (
                  <li key={fav.href}>
                    <Link
                      to={fav.href}
                      className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium">{fav.title}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold">Calculation History</h2>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
            {mockHistory.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No history yet. Your calculations will appear here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {mockHistory.map((item, index) => (
                  <li key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-primary font-semibold">{item.result}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
