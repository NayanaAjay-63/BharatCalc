import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<'weak' | 'fair' | 'good' | 'strong'>('strong');
  const { toast } = useToast();

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous]);

  const generatePassword = () => {
    let chars = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const ambiguous = 'l1IO0';

    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (excludeAmbiguous) {
      chars = chars.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (chars.length === 0) {
      setPassword('');
      return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) setStrength('weak');
    else if (score <= 4) setStrength('fair');
    else if (score <= 6) setStrength('good');
    else setStrength('strong');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: 'Copied!',
        description: 'Password copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy password.',
        variant: 'destructive',
      });
    }
  };

  const strengthColors = {
    weak: 'bg-red-500',
    fair: 'bg-yellow-500',
    good: 'bg-blue-500',
    strong: 'bg-green-500',
  };

  const strengthWidth = {
    weak: '25%',
    fair: '50%',
    good: '75%',
    strong: '100%',
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Generated Password</Label>
        <div className="flex gap-2">
          <Input
            value={password}
            readOnly
            className="font-mono text-lg"
          />
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={generatePassword}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Strength indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Password Strength</span>
          <span className="capitalize">{strength}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${strengthColors[strength]}`}
            style={{ width: strengthWidth[strength] }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Password Length</Label>
            <span className="text-sm text-muted-foreground">{length} characters</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={(v) => setLength(v[0])}
            min={4}
            max={64}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <Label>Character Types</Label>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(v) => setIncludeUppercase(v as boolean)}
            />
            <label htmlFor="uppercase" className="text-sm cursor-pointer">
              Uppercase letters (A-Z)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(v) => setIncludeLowercase(v as boolean)}
            />
            <label htmlFor="lowercase" className="text-sm cursor-pointer">
              Lowercase letters (a-z)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(v) => setIncludeNumbers(v as boolean)}
            />
            <label htmlFor="numbers" className="text-sm cursor-pointer">
              Numbers (0-9)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(v) => setIncludeSymbols(v as boolean)}
            />
            <label htmlFor="symbols" className="text-sm cursor-pointer">
              Symbols (!@#$%^&*...)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ambiguous"
              checked={excludeAmbiguous}
              onCheckedChange={(v) => setExcludeAmbiguous(v as boolean)}
            />
            <label htmlFor="ambiguous" className="text-sm cursor-pointer">
              Exclude ambiguous characters (l, 1, I, O, 0)
            </label>
          </div>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full" variant="swiss">
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate New Password
      </Button>
    </div>
  );
};
