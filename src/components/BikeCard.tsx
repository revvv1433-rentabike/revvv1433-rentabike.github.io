import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Bike } from '../types';

interface BikeCardProps {
  bike: Bike;
  /**
   * new signature:
   * onAddToCart(bike, durationString, startDate, priceSnapshot, totalPrice)
   *
   * durationString examples:
   *  - '5hours'
   *  - '1day'
   *  - '2days'
   */
  onAddToCart: (bike: Bike, duration: string, startDate: string, priceSnapshot: number, totalPrice: number) => void;
}

type Toast = { id: string; message: string; type?: 'success' | 'error' | 'info' };

export default function BikeCard({ bike, onAddToCart }: BikeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState<'5hours' | '1day' | '2days'>('1day');
  const [startDate, setStartDate] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- simple toast helpers (local to the card) ---
  const pushToast = (message: string, type: Toast['type'] = 'info') => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((s) => [...s, { id, message, type }]);
    setTimeout(() => setToasts((s) => s.filter(t => t.id !== id)), 4200);
  };

  // --- image controls ---
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bike.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bike.images.length) % bike.images.length);
  };

  // --- pricing logic (keeps parity with Fleet computePriceDetails) ---
  // returns { unitPrice, totalPrice } for the chosen quick duration (quantity assumed 1)
  const computeQuickPrice = (duration: '5hours' | '1day' | '2days') => {
    if (!bike) return { unitPrice: 0, totalPrice: 0 };

    if (duration === '5hours') {
      // treat price5Hours as total for 5 hours => per-hour = price5Hours/5
      const perHour = bike.price5Hours ? Math.round(bike.price5Hours / 5) : Math.round((bike.price1Day || 0) / 8);
      const unitPrice = perHour; // unit used when displayed as per-hour
      const totalPrice = perHour * 5; // show total for 5 hours
      return { unitPrice, totalPrice };
    }

    if (duration === '1day') {
      const unitPrice = bike.price1Day || 0;
      const totalPrice = unitPrice * 1;
      return { unitPrice, totalPrice };
    }

    // duration === '2days'
    const totalFor2 = bike.price2Days || (bike.price1Day || 0) * 2;
    const unitPrice = Math.round(totalFor2 / 2); // average per day
    const totalPrice = totalFor2;
    return { unitPrice, totalPrice };
  };

  const getPriceDisplay = () => {
    const { totalPrice } = computeQuickPrice(selectedDuration);
    return totalPrice;
  };

  const getDurationLabel = () => {
    const labels: Record<string,string> = {
      '5hours': '5 Hours',
      '1day': '1 Day (24 Hrs)',
      '2days': '2 Days (48 Hrs)',
    };
    return labels[selectedDuration];
  };

  // add to cart handler (validates startDate and dispatches price details)
  const handleAdd = () => {
    if (!startDate) {
      pushToast('Please select a start date', 'error');
      return;
    }

    const { unitPrice, totalPrice } = computeQuickPrice(selectedDuration);

    // duration string we pass to cart (same format used across app)
    const durationString = selectedDuration; // e.g. '5hours' / '1day' / '2days'

    // call parent handler with priceSnapshot (unitPrice) and totalPrice
    onAddToCart(bike, durationString, startDate, unitPrice, totalPrice);

    pushToast(`${bike.name} added — ₹${totalPrice}`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={bike.images[currentImageIndex]}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          loading="lazy"
        />

        {bike.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {bike.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition ${index === currentImageIndex ? 'bg-yellow-400 w-6' : 'bg-white/60'}`}
            />
          ))}
        </div>

        <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${bike.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {bike.available ? 'Available' : 'Not Available'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{bike.name}</h3>
        <p className="text-gray-600 mb-4">{bike.model} • {bike.color}</p>

        <div className="bg-yellow-50 rounded-lg p-3 mb-4 text-sm">
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div><span className="font-semibold">Type:</span> {bike.features?.[0] || 'Standard'}</div>
            <div><span className="font-semibold">Color:</span> {bike.color}</div>
            <div><span className="font-semibold">Model:</span> {bike.model}</div>
            <div><span className="font-semibold">Status:</span> <span className="text-green-600">{bike.available ? 'Available' : 'Unavailable'}</span></div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            {(['5hours','1day','2days'] as const).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  selectedDuration === duration ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {duration === '5hours' ? '5H' : duration === '1day' ? '1D' : '2D'}
              </button>
            ))}
          </div>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900">₹{getPriceDisplay()}</div>
            <div className="text-xs text-gray-500">{getDurationLabel()}</div>
            <div className="text-xs text-gray-500">Extra km: ₹{bike.extraKmCharge}/km</div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!bike.available}
            className="px-4 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
            aria-disabled={!bike.available}
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {bike.features && bike.features.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Features:</p>
            <div className="flex flex-wrap gap-2">
              {bike.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">{feature}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toasts (card-local) */}
      <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className={`max-w-sm w-full rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 ${t.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-white border'}`}>
            <div className="flex-1 text-sm text-gray-800">{t.message}</div>
            <button onClick={() => setToasts((s) => s.filter(x => x.id !== t.id))} className="text-xs text-gray-500 hover:text-gray-700 ml-2">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
