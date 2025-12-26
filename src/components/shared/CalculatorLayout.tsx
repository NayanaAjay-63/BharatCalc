import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdPlaceholder } from './AdPlaceholder';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryHref?: string;
  children: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  category,
  categoryHref,
  children,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const navigate = useNavigate();
  const backHref = categoryHref || '/calculators';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link to={backHref} className="hover:text-foreground transition-colors">{category}</Link>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </div>

      {/* Top Ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder size="leaderboard" />
      </div>

      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calculator Content */}
          <div className="swiss-card">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AdPlaceholder size="sidebar" className="sticky top-24" />
        </aside>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};
