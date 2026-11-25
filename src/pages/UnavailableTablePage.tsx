import React from 'react';
import { Ban, Clock, HelpCircle, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { TableInfo } from '@/types';
import restaurantData from '@/data/restaurant.json';

export interface UnavailableTablePageProps {
  table: TableInfo | null;
  scannedToken?: string;
}

export const UnavailableTablePage: React.FC<UnavailableTablePageProps> = ({
  table,
  scannedToken,
}) => {
  return (
    <div className="max-w-lg mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      <Card className="border-amber-200/80 shadow-soft overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto mb-4 ring-8 ring-white/10 shadow-lg">
            <Ban className="w-8 h-8 text-white" />
          </div>
          <Badge variant="warning" size="sm" className="bg-white/20 text-white border-white/30 mb-2">
            Table Temporarily Inactive
          </Badge>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Table Currently Unavailable
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
            This dining table is currently marked as inactive or reserved for private service.
          </p>
        </div>

        {/* Content Body */}
        <CardContent className="space-y-4 pt-6">
          {/* Table Details */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Table Identifier:</span>
              <span className="font-extrabold text-[#181D23] text-sm">
                {table?.tableName || table?.tableNumber || scannedToken}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Table QR Code:</span>
              <span className="font-mono text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                {table?.tableNumber || scannedToken}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-medium">Section:</span>
              <span className="text-stone-800 font-medium">{table?.section || 'Dining Area'}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-stone-200">
              <span className="text-stone-500 font-medium">Current Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Clock className="w-3 h-3" />
                Inactive / Not In Service
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs space-y-1.5">
            <p className="font-bold text-[#181D23] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F47738]" />
              Need to place an order?
            </p>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Each dining table is assigned its own unique physical QR code. If you were seated at this table by our staff, please notify a server to activate ordering for this table stand.
            </p>
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
            Retry QR Scan
          </Button>
          <a
            href={`tel:${restaurantData.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-[#181D23] text-white hover:bg-stone-800 transition-colors gap-2"
          >
            <Phone className="w-4 h-4 text-[#F47738]" />
            <span>Call Hostess ({restaurantData.phone})</span>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};
