import React from 'react';
import { AlertTriangle, HelpCircle, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import restaurantData from '@/data/restaurant.json';

export interface InvalidTablePageProps {
  scannedToken?: string;
}

export const InvalidTablePage: React.FC<InvalidTablePageProps> = ({ scannedToken }) => {
  return (
    <div className="max-w-lg mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      <Card className="border-rose-200/80 shadow-soft overflow-hidden">
        {/* Visual Header */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto mb-4 ring-8 ring-white/10 shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <Badge variant="danger" size="sm" className="bg-white/20 text-white border-white/30 mb-2">
            Unrecognized QR Code
          </Badge>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Table Not Recognized
          </h2>
          <p className="text-rose-100 text-xs sm:text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
            The QR code scanned or URL entered does not correspond to any active dining table stand.
          </p>
        </div>

        {/* Content Body */}
        <CardContent className="space-y-4 pt-6">
          {/* Debug/Scanned Token Box */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
            <span className="text-stone-500 font-medium">Scanned Code:</span>
            <code className="font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              {scannedToken || 'Missing QR Token'}
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <p className="font-bold text-[#181D23] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F47738]" />
              How to connect to your table:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600 text-[11px] leading-relaxed">
              <li>Each physical table at <strong>{restaurantData.name}</strong> has a dedicated acrylic QR code stand.</li>
              <li>Open your phone's camera app and point it directly at the QR code on your table.</li>
              <li>If you need help or the stand is damaged, please ask your server for assistance.</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="outline"
            size="md"
            className="w-full"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => window.location.reload()}
          >
            Rescan Table QR
          </Button>
          <a
            href={`tel:${restaurantData.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-[#181D23] text-white hover:bg-stone-800 transition-colors gap-2"
          >
            <Phone className="w-4 h-4 text-[#F47738]" />
            <span>Call Server ({restaurantData.phone})</span>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};
