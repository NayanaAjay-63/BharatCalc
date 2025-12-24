import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ChevronRight, Calculator, Shield, Zap, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">About</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">About CalcSuite</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            CalcSuite is a comprehensive online calculator platform designed to help you with everyday calculations, 
            financial planning, health metrics, and more. Our mission is to provide accurate, easy-to-use tools 
            that save you time and effort.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">50+ Calculators</h3>
              <p className="text-muted-foreground text-sm">
                From basic math to complex financial calculations, we've got you covered.
              </p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                All calculations happen in your browser. We don't store your data.
              </p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Real-time calculations with instant results. No page reloads needed.
              </p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">For Everyone</h3>
              <p className="text-muted-foreground text-sm">
                Designed for students, professionals, and anyone who needs quick calculations.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Calculators</h2>
          <p className="text-muted-foreground">
            We offer calculators across multiple categories including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
            <li><strong>Basic Calculators:</strong> Simple math, percentages, averages</li>
            <li><strong>Finance:</strong> EMI, SIP, compound interest, loans</li>
            <li><strong>Health:</strong> BMI, BMR, calorie needs</li>
            <li><strong>Date & Time:</strong> Age calculator, days between dates</li>
            <li><strong>Unit Converters:</strong> Length, weight, temperature, data</li>
            <li><strong>API Utilities:</strong> PIN code, IFSC lookup for India</li>
            <li><strong>Tools:</strong> QR code generator, password generator</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or suggestions? We'd love to hear from you.{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
