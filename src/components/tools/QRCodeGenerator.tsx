import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState('200');
  const [qrUrl, setQrUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    generateQR();
  }, [text, size]);

  const generateQR = () => {
    if (!text.trim()) {
      setQrUrl('');
      return;
    }
    
    // Using QR Server API (free, no key required)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrUrl(url);
  };

  const downloadQR = async () => {
    if (!qrUrl) return;

    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Downloaded!',
        description: 'QR code saved to your device.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download QR code.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy text.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text">Text or URL</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL to encode"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Size</Label>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">100 × 100 px</SelectItem>
            <SelectItem value="150">150 × 150 px</SelectItem>
            <SelectItem value="200">200 × 200 px</SelectItem>
            <SelectItem value="300">300 × 300 px</SelectItem>
            <SelectItem value="400">400 × 400 px</SelectItem>
            <SelectItem value="500">500 × 500 px</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {qrUrl && (
        <div className="space-y-4">
          <div className="flex justify-center p-6 bg-white rounded-lg">
            <img
              src={qrUrl}
              alt="Generated QR Code"
              className="max-w-full"
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          </div>

          <div className="flex gap-2 justify-center">
            <Button onClick={downloadQR} variant="swiss">
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p className="font-medium mb-2">Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>For URLs, include https:// for best compatibility</li>
          <li>Larger sizes are better for printing</li>
          <li>Keep text short for easier scanning</li>
          <li>Test your QR code before distributing</li>
        </ul>
      </div>
    </div>
  );
};
