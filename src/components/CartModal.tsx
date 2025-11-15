import React, { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [guestData, setGuestData] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // fallback price by duration (per-item total, not unit)
  const fallbackPriceForItem = (item: typeof cart[0]) => {
    const qty = item.quantity ?? 1;
    switch (item.duration) {
      case '5hours':
        // treat price5Hours as total for 5 hours
        return (item.bike.price5Hours ?? 0) * qty;
      case '1day':
        return (item.bike.price1Day ?? 0) * qty;
      case '2days':
        return (item.bike.price2Days ?? (item.bike.price1Day ?? 0) * 2) * qty;
      default:
        return 0;
    }
  };

  // compute price for a cart item with fallbacks:
  // priority: item.totalPrice -> (item.priceSnapshot * qty) -> fallback by duration
  const computeItemPrice = (item: typeof cart[0]) => {
    const qty = item.quantity ?? 1;

    if (typeof item.totalPrice === 'number' && !Number.isNaN(item.totalPrice)) {
      // assume totalPrice already accounts for quantity (most convenient)
      return item.totalPrice;
    }

    if (typeof item.priceSnapshot === 'number' && !Number.isNaN(item.priceSnapshot)) {
      // priceSnapshot is a unit price (per hour or per day depending on how you saved it)
      // We need to decide whether this snapshot is per-unit-of-duration or per-day/ per-hour unit.
      // Best effort: if duration includes 'hours' treat snapshot as per-hour; otherwise treat as per-day unit.
      const dur = item.duration || '';
      if (dur.includes('hour') || dur.includes('h')) {
        // item.duration might be like "5hours" or "10h"
        // extract numeric hours if present
        const hoursMatch = dur.match(/\d+/);
        const hours = hoursMatch ? Number(hoursMatch[0]) : 1;
        return Math.round((item.priceSnapshot * hours) * qty);
      } else {
        // treat snapshot as per-day/ per-unit day price
        const daysMatch = dur.match(/\d+/);
        const days = daysMatch ? Number(daysMatch[0]) : 1;
        return Math.round((item.priceSnapshot * days) * qty);
      }
    }

    // fallback to original duration-based pricing stored on bike object
    return fallbackPriceForItem(item);
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + computeItemPrice(item), 0);

  const getDurationLabel = (duration: string) => {
    if (duration.includes('hour')) {
      // e.g. "5hours" or "10h" -> extract numeric
      const n = duration.match(/\d+/)?.[0] ?? 'hrs';
      return `${n} Hours`;
    }
    if (duration.includes('day')) {
      const n = duration.match(/\d+/)?.[0] ?? '1';
      return `${n} Day${n === '1' ? '' : 's'}`;
    }
    // fallback common labels
    switch (duration) {
      case '5hours':
        return '5 Hours';
      case '1day':
        return '1 Day';
      case '2days':
        return '2 Days';
      default:
        return duration;
    }
  };

  const handleCheckout = () => {
    const bookingData = user ? user : guestData;
    if (!bookingData.name || !bookingData.phone) {
      setError('Please enter your name and phone number to proceed.');
      // auto-clear after a short time
      setTimeout(() => setError(null), 4200);
      return;
    }

    const cartDetails = cart
      .map((item) => {
        const price = computeItemPrice(item);
        const durationLabel = getDurationLabel(item.duration || '');
        return `${item.bike.name} (${durationLabel}) - Start: ${item.startDate} - ₹${price}`;
      })
      .join('%0A');

    const total = calculateTotalPrice();

    const message = `Hi, I would like to book:%0A%0A${cartDetails}%0A%0ATotal: ₹${total} , For Payment details : 9393936773 %0A%0AName: ${bookingData.name}%0APhone: ${bookingData.phone}%0AEmail: ${bookingData.email || 'N/A'}`;

    window.open(`https://wa.me/919393936773?text=${message}`, '_blank');

    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.bikeId}-${item.duration}-${item.startDate ?? ''}`}
                className="flex gap-4 items-center bg-gray-50 border rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.bike.images?.[0]}
                  alt={item.bike.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.bike.name}</h3>
                  <p className="text-sm text-gray-600">{item.bike.model} • {item.bike.color}</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      {getDurationLabel(item.duration || '')}
                    </span>
                    <span className="text-gray-500 text-sm">Start: {item.startDate}</span>
                    {item.quantity && item.quantity > 1 && (
                      <span className="text-gray-500 text-sm">• Qty: {item.quantity}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => removeFromCart(item.bikeId)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded-lg"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>

                  <p className="font-bold text-gray-900 text-lg mt-2">₹{computeItemPrice(item)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom fixed section */}
        <div className="border-t bg-gray-50 shadow-inner p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {!user && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Guest Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={guestData.name}
                  onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  value={guestData.phone}
                  onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={guestData.email}
                  onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                  className="sm:col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center font-semibold text-lg text-gray-900">
            <span>Total:</span>
            <span>₹{calculateTotalPrice()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckout}
              className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition"
            >
              Proceed to WhatsApp Booking
            </button>
            <button
              onClick={clearCart}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
            >
              Clear Cart
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Booking details will be shared via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
