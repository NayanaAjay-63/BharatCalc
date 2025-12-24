import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Loader2, Building2, MapPin, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BankDetails {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  DISTRICT: string;
  CENTRE: string;
  CONTACT: string;
  IMPS: boolean;
  RTGS: boolean;
  NEFT: boolean;
  UPI: boolean;
}

export const IFSCLookup: React.FC = () => {
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BankDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const validateIFSC = (value: string) => {
    if (value.length === 0) return '';
    if (value.length !== 11) return 'IFSC must be exactly 11 characters';
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      return 'Invalid format. Expected: 4 letters + 0 + 6 alphanumerics';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 11);
    if (/^[A-Z0-9]*$/.test(value)) {
      setIfscCode(value);
      setError(validateIFSC(value));
    }
  };

  const lookupIFSC = async () => {
    const validationError = validateIFSC(ifscCode);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
      
      if (!response.ok) {
        throw new Error('IFSC code not found');
      }

      const data: BankDetails = await response.json();
      setResult(data);
    } catch (err) {
      setError('IFSC code not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Look up bank details using IFSC code.
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="ifscCode" className="sr-only">IFSC Code</Label>
          <Input
            id="ifscCode"
            type="text"
            placeholder="Enter IFSC code (e.g., SBIN0001234)"
            value={ifscCode}
            onChange={handleInputChange}
            className={error && ifscCode.length > 0 ? 'border-destructive' : 'uppercase'}
          />
          {error && ifscCode.length > 0 && (
            <p className="text-sm text-destructive mt-1">{error}</p>
          )}
        </div>
        <Button
          variant="swiss"
          onClick={lookupIFSC}
          disabled={loading || ifscCode.length !== 11 || !!error}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Lookup'}
        </Button>
      </div>

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="bg-secondary rounded-lg p-4">
            <div className="h-6 bg-muted rounded w-1/2 mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-4 h-20" />
            <div className="bg-secondary rounded-lg p-4 h-20" />
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-accent/50 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{result.BANK}</h3>
                  <p className="text-muted-foreground">{result.BRANCH}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(result.IFSC)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay label="IFSC Code" value={result.IFSC} highlight />
            <ResultDisplay label="City" value={result.CITY} />
            <ResultDisplay label="District" value={result.DISTRICT} />
            <ResultDisplay label="State" value={result.STATE} />
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Full Address</p>
                <p className="text-sm text-muted-foreground">{result.ADDRESS}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.NEFT && <span className="swiss-badge">NEFT Enabled</span>}
            {result.RTGS && <span className="swiss-badge">RTGS Enabled</span>}
            {result.IMPS && <span className="swiss-badge">IMPS Enabled</span>}
            {result.UPI && <span className="swiss-badge">UPI Enabled</span>}
          </div>
        </div>
      )}

      {!loading && !error && !result && ifscCode.length === 0 && (
        <div className="bg-accent/50 rounded-lg p-6 text-center">
          <Building2 className="w-10 h-10 mx-auto text-primary mb-3" />
          <p className="font-medium">Enter an IFSC Code</p>
          <p className="text-sm text-muted-foreground mt-1">
            Get bank name, branch details, and supported services
          </p>
        </div>
      )}
    </div>
  );
};
