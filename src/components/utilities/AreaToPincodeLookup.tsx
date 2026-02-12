import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Loader2, MapPin, Hash } from 'lucide-react';

interface PostOffice {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
}

interface APIResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
}

export const AreaToPincodeLookup: React.FC = () => {
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<PostOffice[]>([]);

  const lookupArea = async () => {
    if (area.trim().length < 3) {
      setError('Enter at least 3 characters');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch(
        `https://api.postalpincode.in/postoffice/${encodeURIComponent(area)}`
      );
      const data: APIResponse[] = await res.json();

      if (data[0].Status === 'Success' && data[0].PostOffice) {
        setResults(data[0].PostOffice);
      } else {
        setError('No PIN codes found for this area');
      }
    } catch {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Find Indian PIN codes by area, locality, or city.
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="area" className="sr-only">Area</Label>
          <Input
            id="area"
            placeholder="Enter Area / Locality / City"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <Button variant="swiss" onClick={lookupArea} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay label="District" value={results[0].District} />
            <ResultDisplay label="State" value={results[0].State} />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">
              PIN Codes ({results.length})
            </p>

            {results.map((r, i) => (
              <div
                key={i}
                className="bg-secondary/50 rounded-lg p-4 flex items-center gap-3"
              >
                <Hash className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{r.Pincode}</p>
                  <p className="text-sm text-muted-foreground">{r.Name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="bg-accent/50 rounded-lg p-6 text-center">
          <MapPin className="w-10 h-10 mx-auto text-primary mb-3" />
          <p className="font-medium">Enter an Area</p>
          <p className="text-sm text-muted-foreground">
            Example: Whitefield, Andheri, Gachibowli
          </p>
        </div>
      )}
    </div>
  );
};
