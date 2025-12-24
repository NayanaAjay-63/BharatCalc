import React from 'react';
import { Link } from 'react-router-dom';

const SwissLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 bg-primary rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background rounded-sm rotate-45" />
    </div>
    <span className="font-bold text-lg tracking-tight">CalcSuite</span>
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <SwissLogo />
            <p className="mt-4 text-sm text-muted-foreground">
              One platform for all your calculation needs. Fast, accurate, and beautifully designed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/calculator/emi" className="text-muted-foreground hover:text-foreground transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/bmi" className="text-muted-foreground hover:text-foreground transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/percentage" className="text-muted-foreground hover:text-foreground transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/age" className="text-muted-foreground hover:text-foreground transition-colors">
                  Age Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="font-semibold mb-4">Utilities</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/utility/pin-lookup" className="text-muted-foreground hover:text-foreground transition-colors">
                  PIN Code Lookup
                </Link>
              </li>
              <li>
                <Link to="/utility/ifsc-lookup" className="text-muted-foreground hover:text-foreground transition-colors">
                  IFSC Lookup
                </Link>
              </li>
              <li>
                <Link to="/converter/length" className="text-muted-foreground hover:text-foreground transition-colors">
                  Unit Converters
                </Link>
              </li>
              <li>
                <Link to="/calculator/qr-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                  QR Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CalcSuite. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with Swiss precision ✦
          </p>
        </div>
      </div>
    </footer>
  );
};
