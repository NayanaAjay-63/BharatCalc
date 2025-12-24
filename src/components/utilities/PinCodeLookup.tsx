import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Loader2, MapPin, Building, Info } from 'lucide-react';

interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  State: string;
  Country: string;
}

interface APIResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
}

export const PinCodeLookup: React.FC = () => {
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<PostOffice[]>([]);

  const validatePinCode = (value: string) => {
    if (!/^\d*$/.test(value)) return 'Only numbers allowed';
    if (value.length > 0 && value.length !== 6) return 'PIN must be exactly 6 digits';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 6);
    if (/^\d*$/.test(value)) {
      setPinCode(value);
      setError(validatePinCode(value));
    }
  };

  const lookupPinCode = async () => {
    if (pinCode.length !== 6) {
      setError('PIN must be exactly 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data: APIResponse[] = await response.json();

      if (data[0].Status === 'Success' && data[0].PostOffice) {
        setResults(data[0].PostOffice);
      } else {
        setError('No results found for this PIN code');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Look up details for any Indian PIN code instantly.
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="pinCode" className="sr-only">PIN Code</Label>
          <Input
            id="pinCode"
            type="text"
            inputMode="numeric"
            placeholder="Enter 6-digit PIN code"
            value={pinCode}
            onChange={handleInputChange}
            className={error && pinCode.length > 0 ? 'border-destructive' : ''}
          />
          {error && pinCode.length > 0 && (
            <p className="text-sm text-destructive mt-1">{error}</p>
          )}
        </div>
        <Button
          variant="swiss"
          onClick={lookupPinCode}
          disabled={loading || pinCode.length !== 6}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Lookup'}
        </Button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-secondary rounded-lg p-4">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay
              label="District"
              value={results[0].District}
              highlight
            />
            <ResultDisplay
              label="State"
              value={results[0].State}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Post Offices ({results.length})</p>
            {results.map((office, index) => (
              <div
                key={index}
                className="bg-secondary/50 rounded-lg p-4 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{office.Name}</p>
                  <p className="text-sm text-muted-foreground">{office.Description || 'Post Office'}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="swiss-badge">{office.BranchType}</span>
                    <span className="swiss-badge">{office.DeliveryStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && pinCode.length === 0 && (
        <div className="bg-accent/50 rounded-lg p-6 text-center">
          <MapPin className="w-10 h-10 mx-auto text-primary mb-3" />
          <p className="font-medium">Enter a PIN Code</p>
          <p className="text-sm text-muted-foreground mt-1">
            Get district, state, and post office details for any Indian PIN code
          </p>
        </div>
      )}
    </div>
  );
};
