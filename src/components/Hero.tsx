// HeroWithToasts.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Plus,
  ChevronRight as CR,
  ChevronLeft as CL,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Bike } from '../types';

interface HeroProps { onBookNowClick?: () => void; }
type Temple = { id: string; name: string; distance: string; location: string; description: string; openingHours: string; image: string; };

/* ---------------- SAMPLE DATA ---------------- */
const SAMPLE_BIKES: Bike[] = [
  // Scooters
  { _id: '1', name: 'Activa 6G', model: 'Automatic Scooter', images: ['https://images.drivespark.com/ph-big/2020/01/honda-activa-6g-6.jpg'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic'], color: 'Black & Red' },
  { _id: 'j110', name: 'Jupiter 110cc', model: 'Scooty', images: ['https://imgd.aeplcdn.com/1056x594/n/ahvh7eb_1768799.jpg?q=80'], price5Hours: 250, price1Day: 500, price2Days: 950, extraKmCharge: 3, available: true, features: ['Automatic'], color: 'Gray' },

  { _id: '2', name: 'Jupiter 125cc', model: 'Scooty', images: ['https://cdn.bikedekho.com/processedimages/tvs/jupiter-125/source/jupiter-125683832695bac3.jpg'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic'], color: 'Blue' },
  { _id: '3', name: 'Fascino 125cc', model: 'Scooty', images: ['https://www.yamaha-motor-india.com/theme/v3/image/fascino125fi-new/color/Disc/YELLOW-COCKTAIL-STD.png'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic'], color: 'Yellow' },
  { _id: 'd1', name: 'Dio 125', model: '125cc Scooter', images: ['https://acko-cms.ackoassets.com/Honda_Dio_125_932a6fe56e.jpg'], price5Hours: 320, price1Day: 650, price2Days: 1200, extraKmCharge: 3, available: true, features: ['Automatic', 'Peppy'], color: 'Matte Black' },
  { _id: 'd2', name: 'Aprilia SR 160', model: '160cc Sport Scooter', images: ['https://apriliaindia.com/images/SR_160_Race.jpg'], price5Hours: 500, price1Day: 1200, price2Days: 2200, extraKmCharge: 4, available: true, features: ['Sporty', 'Powerful'], color: 'Racing Black' },

  // Geared / Sports
  { _id: '4', name: 'Honda Shine', model: '125cc Geared', images: ['https://images.91wheels.com/assets/b_images/gallery/honda/shine/honda-shine-8-1718024474.jpg?w=480&q=80'], price5Hours: 450, price1Day: 700, price2Days: 1300, extraKmCharge: 5, available: true, features: ['Geared'], color: 'Silver & Black' },
  { _id: '5', name: 'Passion Pro', model: '125cc Geared', images: ['https://imgd.aeplcdn.com/1280x720/bw/ec/32066/Hero-Passion-PRO-i3s-Front-threequarter-113490.jpg?wm=0'], price5Hours: 450, price1Day: 700, price2Days: 1300, extraKmCharge: 5, available: true, features: ['Geared'], color: 'Black' },
  { _id: '6', name: 'Bajaj Pulsar', model: '150cc Sport', images: ['https://wallpapercave.com/wp/wp4728474.jpg'], price5Hours: 450, price1Day: 800, price2Days: 1500, extraKmCharge: 5, available: true, features: ['Sporty'], color: 'Black & Red' },
  { _id: '7', name: 'Royal Enfield Bullet', model: '350cc Classic', images: ['https://media.zigcdn.com/media/model/2025/Jun/lest-side-view-183942663_930x620.jpg'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Classic'], color: 'Red & Black' },
  { _id: 'f1', name: 'Yamaha FZ', model: '150cc Street', images: ['https://wallpapercat.com/w/full/5/0/6/1753801-2048x1286-desktop-hd-yamaha-fz-fi-wallpaper-image.jpg'], price5Hours: 600, price1Day: 1400, price2Days: 2700, extraKmCharge: 5, available: true, features: ['Naked Bike', 'Torque'], color: 'Matte Black' },
  { _id: 'm1', name: 'Yamaha MT-15', model: '155cc Naked', images: ['https://i.pinimg.com/736x/e6/c6/cd/e6c6cd3a5a9665b1f5c7c17695aea5b4.jpg'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Aggressive Styling'], color: 'Dark Matte' },
  { _id: 'r1', name: 'Yamaha R15 V3', model: '155cc Sport', images: ['https://imgd.aeplcdn.com/1056x594/n/cw/ec/209893/r15-right-side-view.jpeg?isig=0&q=80'], price5Hours: 900, price1Day: 2200, price2Days: 4200, extraKmCharge: 6, available: true, features: ['Race Inspired'], color: 'Racing Blue' },
  { _id: 'g1', name: 'Suzuki Gixxer 250', model: '250cc Sport', images: ['https://imgd.aeplcdn.com/1280x720/n/cw/ec/195419/gixxer-sf-250-right-side-view.jpeg?isig=0'], price5Hours: 700, price1Day: 1600, price2Days: 3100, extraKmCharge: 6, available: true, features: ['Powerful'], color: 'Pearl White' },
  { _id: 'gt650', name: 'GT 650', model: '650cc Sport', images: ['https://imgd.aeplcdn.com/1056x594/n/cw/ec/49656/continental-gt-right-side-view-12.png?isig=0&q=80'], price5Hours: 1250, price1Day: 3500, price2Days: 6000, extraKmCharge: 12, available: true, features: ['GT','Powerful','Heritage'], color: 'Silver & Black' },
  { _id: '15', name: 'KTM Duke 200', model: '200cc Sport', images: ['https://www.ktmindia.com/-/media/images/ktm/booking/ktm-pngs-and-webps/ktm-200-duke/electronic-orange-webp.webp'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Sporty'], color: 'Orange & Black' },

  // Cars
  { _id: '8', name: 'Swift Dzire', model: 'Sedan Car', images: ['https://mda.spinny.com/sp-file-system/public/2025-04-21/7a016e96505c41849d52c11137d5d06d/raw/file.JPG'], price5Hours: 1000, price1Day: 2300, price2Days: 4500, extraKmCharge: 10, available: true, features: ['4-Seater'], color: 'Silver' },
  { _id: '9', name: 'Maruti Ertiga', model: '7-Seater MUV', images: ['https://static-cdn.cars24.com/prod/new-car-cms/Ertiga_Tour_Feature_Image_80388009fd.png'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['7-Seater'], color: 'White' },
  { _id: '10', name: 'Kia Carens', model: 'Premium MUV', images: ['https://imgd.aeplcdn.com/664x374/n/cw/ec/174325/carens-exterior-left-front-three-quarter.jpeg?isig=0&q=80'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['7-Seater'], color: 'Black' },
  { _id: '11', name: 'Innova Crysta', model: 'Luxury MUV', images: ['https://www.v3cars.com/media/model-imgs/1666248141-Innova%20Crysta-Exterior.webp'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['8-Seater'], color: 'Black Pearl' },
  { _id: 'victoris', name: 'Maruti Victoris', model: 'Premium SUV', images: ['https://content.carlelo.com/uploads/model/victoris-model-image.webp'], price5Hours: 1600, price1Day: 4200, price2Days: 8000, extraKmCharge: 18, available: true, features: ['Premium SUV'], color: 'Dark Blue' },
  { _id: 'c1', name: 'Maruti Baleno', model: 'Hatchback', images: ['https://images.drivespark.com/ph-big/2019/01/maruti-baleno-exterior-2.jpg'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Hatchback'], color: 'Pearl White' },
  { _id: 'c2', name: 'Toyota Glanza', model: 'Hatchback', images: ['https://i.pinimg.com/736x/c4/5c/49/c45c491a2b03ea5ae3ed35ab25c5826f.jpg'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Hatchback'], color: 'Silver' },
  { _id: 'c3', name: 'Maruti Swift', model: 'Hatchback', images: ['https://i.pinimg.com/736x/9d/54/ff/9d54ff0b722180b73da61ca9f68f9bf5.jpg'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Compact'], color: 'Red' },
  { _id: 'c4', name: 'Hyundai i20', model: 'Premium Hatchback', images: ['https://c4.wallpaperflare.com/wallpaper/1005/256/47/hyundai-i20-wallpaper-preview.jpg'], price5Hours: 950, price1Day: 2200, price2Days: 4200, extraKmCharge: 10, available: true, features: ['Premium'], color: 'Ocean Blue' },
  { _id: 'c5', name: 'Hyundai i10', model: 'Hatchback', images: ['https://stimg.cardekho.com/images/car-images/large/Hyundai/Hyundai-i10/pure-white.jpg?impolicy=resize&imwidth=420'], price5Hours: 800, price1Day: 1800, price2Days: 3400, extraKmCharge: 10, available: true, features: ['City Car'], color: 'White' },
  { _id: 'c6', name: 'Maruti Brezza', model: 'Compact SUV', images: ['https://images.jdmagicbox.com/quickquotes/images_main/maruti-suzuki-vitara-brezza-zdi-diesel-pearl-arctic-white-82811386-ktiq7.png'], price5Hours: 1200, price1Day: 3000, price2Days: 5800, extraKmCharge: 15, available: true, features: ['SUV'], color: 'Pearl White' },
];

/* ------------------ Temples ------------------ */
const TEMPLES: Temple[] = [
  { id: '1', name: 'Sri Venkateswara Temple', distance: '20 km', location: 'Tirumala Hills, Tirupati', description: 'Famous Tirumala Venkateswara Temple.', openingHours: 'Open 24 hours', image: 'https://media.istockphoto.com/id/1268716417/photo/misty-tirupathi.jpg?s=612x612&w=0&k=20&c=6tcFZEteaY9mOhZADzIRo8b8NmUqCEmsO6ZIgbfjGW0=' },
  { id: '2', name: 'Sri Govindaraja Swamy Temple', distance: '2 km', location: 'Main City, Tirupati', description: 'Ancient temple dedicated to Lord Vishnu.', openingHours: '6:00 AM - 9:00 PM', image: 'https://c9admin.cottage9.com/uploads/2216/Architectural-Magnificence-of-Govindaraja-Swamy-Temple-Tirupati.jpg' },
  { id: '3', name: 'Sri Kapileswara Swamy Temple', distance: '5 km', location: 'Kapilatheertham, Tirupati', description: 'Temple dedicated to Lord Shiva with waterfalls.', openingHours: '6:00 AM - 6:00 PM', image: 'https://kalyangeetha.wordpress.com/wp-content/uploads/2021/11/srinivasamangapuram.jpg?w=1024' },
  { id: '4', name: 'Sri Kalyana Venkateswara Temple', distance: '12 km', location: 'Srinivasa Mangapuram', description: 'Where Lord Venkateswara married Goddess Padmavathi.', openingHours: '6:00 AM - 8:00 PM', image: 'https://tirumalahills.wordpress.com/wp-content/uploads/2016/02/srinivasa-mangapuram-2.jpg?w=1000' },
  { id: '5', name: 'Sri Padmavathi Ammavari Temple', distance: '15 km', location: 'Tiruchanur, Tirupati', description: 'Dedicated to Goddess Padmavathi.', openingHours: '5:30 AM - 9:00 PM', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3c/61/9a/sri-padmavathi-ammavari.jpg?w=800&h=-1&s=1' },
  { id: '6', name: 'ISKCON Tirupati', distance: '8 km', location: 'Renigunta Road, Tirupati', description: 'Modern temple complex with gardens.', openingHours: '4:30 AM - 1:00 PM, 4:00 PM - 8:30 PM', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/78/3e/b1/good-temple-located-near.jpg?w=1200&h=-1&s=1' },
  { id: '7', name: 'Japali Teertham', distance: '18 km', location: 'Tirumala foothills', description: 'Scenic viewpoint in Tirumala foothills.', openingHours: '6:00 AM - 6:00 PM', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/2a/48/c8/japali-teertham.jpg?w=900&h=500&s=1' },
  { id: '8', name: 'Akasaganga', distance: '22 km', location: 'Tirumala Hills', description: 'Sacred waterfall on Tirumala range.', openingHours: '6:00 AM - 5:30 PM', image: 'https://i0.wp.com/hindupad.com/wp-content/uploads/Akasa-Ganga-Tirumala.png?fit=620%2C376&ssl=1' },
];

/* ------------------ Small Toast system ------------------ */
type ToastType = 'success' | 'error' | 'info';
function useToasts() {
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts(s => [...s, { id, message, type }]);
    setTimeout(() => setToasts(s => s.filter(t => t.id !== id)), 4500);
  };
  const removeToast = (id: string) => setToasts(s => s.filter(t => t.id !== id));
  const ToastContainer = () => (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className={`max-w-sm w-full rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 ${t.type === 'success' ? 'bg-green-50 border border-green-200' : t.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-white border'}`}>
          <div className="flex-1 text-sm text-gray-800">{t.message}</div>
          <button onClick={() => removeToast(t.id)} className="text-xs text-gray-500 hover:text-gray-700 ml-2">✕</button>
        </div>
      ))}
    </div>
  );
  return { showToast, ToastContainer };
}

/* ------------------ BikeCard (no Custom) ------------------ */
function BikeCard({ bike, onAddToCart, showToast }: { bike: Bike; onAddToCart: (bike: Bike, duration: string, startDate: string, priceSnapshot: number, totalPrice: number) => void; showToast: (msg: string, type?: ToastType) => void; }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState<'5hours' | '1day' | '2days'>('1day');
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => setCurrentImageIndex(0), [bike]);

  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % bike.images.length);
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + bike.images.length) % bike.images.length);

  const getPrice = (): number => {
    if (selectedDuration === '5hours') return bike.price5Hours ?? 0;
    if (selectedDuration === '2days') return bike.price2Days ?? (bike.price1Day ?? 0) * 2;
    return bike.price1Day ?? 0;
  };

  const getDurationLabel = () => {
    return selectedDuration === '5hours' ? '5 Hours' : selectedDuration === '2days' ? '2 Days' : '1 Day';
  };

  const handleAddToCart = () => {
    if (!startDate) { showToast('Please select a start date', 'error'); return; }
    const priceSnapshot = selectedDuration === '5hours' ? (bike.price5Hours ?? 0) : selectedDuration === '2days' ? (bike.price2Days ?? (bike.price1Day ?? 0) * 2) : (bike.price1Day ?? 0);
    const totalPrice = priceSnapshot;
    onAddToCart(bike, selectedDuration, startDate, priceSnapshot, totalPrice);
    // showToast is called at parent sometimes — but having an immediate positive toast here helps feedback
    showToast(`Added ${bike.name} — ₹${totalPrice} to cart`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <div className="relative h-64 overflow-hidden">
        <img src={bike.images[ currentImageIndex ]} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        {bike.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"><CL size={20} /></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"><CR size={20} /></button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {bike.images.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === currentImageIndex ? 'bg-yellow-400 w-6' : 'bg-white/60'}`} />)}
        </div>

        {bike.available ? (
          <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Available</div>
        ) : (
          <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Not Available</div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{bike.name}</h3>
        <p className="text-gray-600 mb-4">{bike.model} • {bike.color}</p>

        <div className="bg-yellow-50 rounded-lg p-3 mb-4 text-sm">
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div><span className="font-semibold">Type:</span> {bike.features?.[0] || 'Standard'}</div>
            <div><span className="font-semibold">Color:</span> {bike.color}</div>
            <div><span className="font-semibold">Model:</span> {bike.model}</div>
            <div><span className="font-semibold">Status:</span> <span className="text-green-600">Available</span></div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            {['5hours', '1day', '2days'].map(d => (
              <button key={d} onClick={() => setSelectedDuration(d as any)} className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium ${selectedDuration === d ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {d === '5hours' ? '5H' : d === '1day' ? '1D' : '2D'}
              </button>
            ))}
          </div>

          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900">₹{getPrice()}</div>
            <div className="text-xs text-gray-500">{getDurationLabel()}</div>
            <div className="text-xs text-gray-500">Extra km: ₹{bike.extraKmCharge}/km</div>
          </div>

          <button onClick={handleAddToCart} disabled={!bike.available} className="px-4 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed">
            <Plus size={18} /> Add
          </button>
        </div>

        {bike.features && bike.features.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Features:</p>
            <div className="flex flex-wrap gap-2">
              {bike.features.map((f, i) => <span key={i} className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">{f}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ Hero (page) ------------------ */
export default function Hero({ onBookNowClick }: HeroProps) {
  const { addToCart } = useCart();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const { showToast, ToastContainer } = useToasts();

  useEffect(() => setBikes(SAMPLE_BIKES), []);

  // Custom booking modal state (kept for larger bookings)
  const [customOpen, setCustomOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [isHourly, setIsHourly] = useState(false);
  const [hours, setHours] = useState<number>(5);
  const [days, setDays] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const computePriceDetails = (bike: Bike | null, hourly: boolean, hoursVal: number, daysVal: number, qty: number) => {
    if (!bike) return { unitPrice: 0, totalPrice: 0, durationString: '' };
    if (hourly) {
      const perHour = bike.price5Hours ? Math.round(bike.price5Hours / 5) : Math.round((bike.price1Day || 0) / 8);
      const unitPrice = perHour;
      const totalPrice = unitPrice * Math.max(1, hoursVal) * Math.max(1, qty);
      return { unitPrice, totalPrice, durationString: `${hoursVal}hours` };
    } else {
      let totalForDays = 0;
      if (daysVal <= 1) totalForDays = bike.price1Day || 0;
      else if (daysVal === 2) totalForDays = bike.price2Days || (bike.price1Day || 0) * 2;
      else totalForDays = (bike.price2Days || (bike.price1Day || 0) * 2) + (bike.price1Day || 0) * (daysVal - 2);
      const unitPrice = Math.round(totalForDays / daysVal);
      const totalPrice = totalForDays * Math.max(1, qty);
      return { unitPrice, totalPrice, durationString: `${daysVal}days` };
    }
  };

  // Quick add from BikeCard
  const handleQuickAddFromCard = (bikeItem: Bike, duration: string, start: string, priceSnapshot: number, totalPrice: number) => {
    addToCart({
      bikeId: bikeItem._id!,
      bike: bikeItem,
      duration,
      startDate: start,
      quantity: 1,
      priceSnapshot,
      totalPrice,
    } as any);
    showToast(`Added ${bikeItem.name} — ₹${totalPrice} to cart`, 'success');
  };

  const openCustom = (bike: Bike) => {
    setSelectedBike(bike);
    setIsHourly(false);
    setHours(5);
    setDays(1);
    setStartDate(new Date().toISOString().split('T')[0]);
    setQuantity(1);
    setCustomOpen(true);
  };

  const handleAddCustomToCart = () => {
    if (!selectedBike) return;
    if (!startDate) { showToast('Please select a start date.', 'error'); return; }
    if (isHourly && hours <= 0) { showToast('Enter valid hours.', 'error'); return; }
    if (!isHourly && days <= 0) { showToast('Enter valid days.', 'error'); return; }

    const { unitPrice, totalPrice, durationString } = computePriceDetails(selectedBike, isHourly, hours, days, quantity);

    addToCart({
      bikeId: selectedBike._id!,
      bike: selectedBike,
      duration: durationString as any,
      startDate,
      quantity,
      priceSnapshot: unitPrice,
      totalPrice,
    } as any);

    setCustomOpen(false);
    showToast(`Added ${selectedBike.name} — ₹${totalPrice} to cart`, 'success');
  };

  const handleSimpleOneDayAdd = (bike: Bike) => {
    const unitPrice = bike.price1Day || 0;
    const total = unitPrice;
    addToCart({
      bikeId: bike._id!,
      bike,
      duration: '1day' as any,
      startDate: new Date().toISOString().split('T')[0],
      quantity: 1,
      priceSnapshot: unitPrice,
      totalPrice: total,
    } as any);
    showToast('Bike added to cart!', 'success');
  };

  const categoryBikes = useMemo(() => ({
    scooters: bikes.filter(b => ['Activa 6G','Jupiter 110cc', 'Jupiter 125cc', 'Fascino 125cc', 'Dio 125', 'Aprilia SR 160'].includes(b.name)),
    bikes: bikes.filter(b => ['Honda Shine', 'Passion Pro', 'Bajaj Pulsar', 'Royal Enfield Bullet', 'KTM Duke 200', 'GT 650', 'Yamaha FZ', 'Yamaha MT-15', 'Yamaha R15 V3', 'Suzuki Gixxer 250'].includes(b.name)),
    cars: bikes.filter(b => ['Swift Dzire', 'Maruti Ertiga', 'Kia Carens', 'Innova Crysta', 'Maruti Baleno', 'Toyota Glanza', 'Maruti Swift', 'Hyundai i20', 'Hyundai i10', 'Maruti Brezza','Maruti Victoris'].includes(b.name)),
  }), [bikes]);

  /* ------------------ RENDER ------------------ */
  return (
    <div className="w-full">
      {/* Top contact strip */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-xs text-gray-800">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">Rent A Bike</span>
            <span className="hidden sm:inline">• Near Railway Station</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-end">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="hidden sm:block" />
              <span className="truncate text-sm">Near Railway Station, Tirupati</span>
            </div>
            <div className="flex items-center gap-2">
              <a className="underline text-sm" href="mailto:info@rentabike.com">revvv143@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <a className="font-semibold text-sm" href="tel:+919393936773">+91 93939 36773</a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="relative">
        <div className="w-full min-h-[65vh] md:min-h-[72vh] lg:min-h-[76vh] relative overflow-hidden rounded-b-2xl py-[80px]">

          <img src="https://i.postimg.cc/7LbWtmpC/Chat-GPT-Image-Nov-10-2025-10-03-05-PM.png" alt="Bikes" className="absolute inset-0 w-full h-full object-cover brightness-90" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col lg:flex-row items-start lg:items-center gap-8 py-10">
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Explore Tirupati <span className="block text-yellow-500">On Your Own Terms</span></h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 max-w-xl">Rent well-maintained bikes and vehicles with transparent pricing and 24/7 support. Perfect for pilgrim trips and sightseeing.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={onBookNowClick} className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 transition font-semibold shadow"><ArrowRight size={16} /> Book Now</button>
                <a href="https://wa.me/919393936773?text=Hi, I would like to inquire about bike rentals" target="_blank" rel="noreferrer" className="inline-flex items-center px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 hover:shadow-sm transition">WhatsApp Us</a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-700 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">🛠️</div>
                  <div><div className="font-semibold">Well Maintained</div><div className="text-xs">Serviced before every rental</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">⏱️</div>
                  <div><div className="font-semibold">Flexible Hours</div><div className="text-xs">Hourly / Daily options</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">📞</div>
                  <div><div className="font-semibold">24/7 Support</div><div className="text-xs">Assistance on road</div></div>
                </div>
              </div>
            </div>

            <aside className="w-full lg:w-1/3">
              <div className="bg-white/95 rounded-2xl p-6 shadow-lg sticky top-6">
                <h4 className="font-semibold text-lg mb-3">Quick Facts</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>• Helmets provided</div>
                  <div>• Security deposit required</div>
                  <div>• No petrol/diesel included</div>
                  <div>• 24/7 roadside support</div>
                </div>
                <div className="mt-4"><button onClick={onBookNowClick} className="w-full py-2 bg-yellow-400 rounded-md font-semibold">Rent Now</button></div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-8"><div className="h-4 bg-white rounded-xl shadow-sm" /></div>

      {/* Fleet Section */}
      <section id="fleet" className="py-12 bg-gradient-to-b from-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-yellow-400/90 rounded-full mb-4 text-sm font-semibold">OUR FLEET</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Choose Your Ride</h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">Browse scooters, geared bikes and cars — all serviced, insured and ready to go.</p>
          </div>

          <CategorySection title="Scooters (Automatic)" hintText="150km/day • ₹3/km extra • ₹100/hr extra" bikes={categoryBikes.scooters} onQuickAdd={handleQuickAddFromCard} onCustomOpen={openCustom} onSimpleAdd={handleSimpleOneDayAdd} showToast={showToast} />
          <CategorySection title="Geared Bikes & Sports" hintText="200km/day • ₹5/km extra • ₹150/hr extra" bikes={categoryBikes.bikes} onQuickAdd={handleQuickAddFromCard} onCustomOpen={openCustom} onSimpleAdd={handleSimpleOneDayAdd} showToast={showToast} />
          <CategorySection title="Cars & SUVs" hintText="250km/day • ₹10-18/km extra • ₹250/hr extra" bikes={categoryBikes.cars} onQuickAdd={handleQuickAddFromCard} onCustomOpen={openCustom} onSimpleAdd={handleSimpleOneDayAdd} showToast={showToast} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold">What our customers from Andhra Pradesh say</h3>
            <p className="text-sm text-gray-600 mt-2">Real reviews from recent rentals — honest experiences, high satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial name="Srinivas Reddy" city="Tirupati, AP" rating={5} comment="Great service — bike was clean and well maintained. Roadside support was quick. Highly recommended for temple trips." />
            <Testimonial name="Sravani Devi" city="Tirupati, AP" rating={5} comment="Affordable and transparent pricing. Loved the helmets and the friendly staff. Will rent again." />
            <Testimonial name="Karthik Kumar" city="Nellore, AP" rating={5} comment="Smooth booking, punctual pickup. The Pulsar was a joy for longer rides. Excellent experience overall." />
            <Testimonial name="Anjali Prasad" city="Vijayawada, AP" rating={4} comment="Good value for money and helpful staff. Minor issue with phone connectivity but resolved fast." />
            <Testimonial name="Venkatesh Naidu" city="Tirupati, AP" rating={5} comment="Perfect for sightseeing. Clean helmets, neat paperwork, and courteous service. Five stars!" />
          </div>
        </div>
      </section>

      {/* Terms & Why choose */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-xl text-white">
            <h3 className="text-xl font-bold mb-4">General Terms & Conditions</h3>
            <div className="text-sm">
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="space-y-2 list-inside list-disc"><li>Valid Driver's License & Aadhar Card</li><li>2nd Person's Aadhar Card</li><li>Age Minimum: 18 years</li><li>Security Deposit Required</li></ul>
              <h4 className="font-semibold mt-4 mb-2">Important Notes</h4>
              <ul className="space-y-2 list-inside list-disc"><li>No petrol/diesel included</li><li>No FastTag included</li><li>Helmets provided</li><li>24/7 Roadside Assistance</li></ul>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Why Choose Rent A Bike?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div><div className="text-3xl font-bold text-yellow-500">30,000+</div><div className="text-sm text-gray-700">Happy Customers</div></div>
              <div><div className="text-3xl font-bold text-yellow-500">50+</div><div className="text-sm text-gray-700">Vehicles</div></div>
              <div><div className="text-3xl font-bold text-yellow-500">24/7</div><div className="text-sm text-gray-700">Support</div></div>
              <div><div className="text-3xl font-bold text-yellow-500">100%</div><div className="text-sm text-gray-700">Safe & Insured</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom booking modal */}
      {customOpen && selectedBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCustomOpen(false)} />
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={selectedBike.images?.[0] ?? ''} alt={selectedBike.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold">{selectedBike.name}</h3>
                  <p className="text-sm text-gray-600">{selectedBike.model}</p>
                </div>
              </div>

              <div className="text-right">
                <button onClick={() => setCustomOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${!isHourly ? 'text-gray-800' : 'text-gray-500'}`}>Day-wise</span>

                  <div className="relative inline-flex items-center cursor-pointer" onClick={() => setIsHourly(p => !p)} role="button" aria-pressed={isHourly}>
                    <input type="checkbox" checked={isHourly} onChange={() => setIsHourly(p => !p)} className="sr-only" />
                    <div className={`w-14 h-7 rounded-full transition-colors ${isHourly ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isHourly ? 'translate-x-7' : 'translate-x-0'}`} />
                  </div>

                  <span className={`text-sm font-medium ${isHourly ? 'text-gray-800' : 'text-gray-500'}`}>Hourly</span>
                </label>

                <div className="mt-4">
                  {isHourly ? (
                    <>
                      <label className="block text-sm font-semibold mb-1">Hours</label>
                      <div className="flex items-center gap-2">
                        <input type="number" min={1} value={hours} onChange={(e) => setHours(Math.max(1, Number(e.target.value) || 1))} className="w-28 px-3 py-2 border rounded-md text-sm" />
                        <div className="text-sm text-gray-600">hrs</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-semibold mb-1">Days</label>
                      <div className="flex items-center gap-2">
                        <input type="number" min={1} value={days} onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))} className="w-28 px-3 py-2 border rounded-md text-sm" />
                        <div className="text-sm text-gray-600">days</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-1">Select Date</label>
                  <div className="flex gap-2 items-center">
                    <Calendar size={18} />
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 border rounded-md text-sm flex-1" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-1">Quantity</label>
                  <input type="number" value={quantity} min={1} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-28 px-3 py-2 border rounded-md text-sm" />
                </div>
              </div>

              <div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <Clock size={16} />
                    <div className="text-xs">Pricing preview (estimated)</div>
                  </div>

                  <div className="text-3xl font-bold text-gray-900">
                    ₹{computePriceDetails(selectedBike, isHourly, hours, days, quantity).totalPrice}
                  </div>

                  <div className="mt-3 text-sm text-gray-600 space-y-2">
                    <div>
                      <span className="font-semibold">Rate:</span>{' '}
                      {isHourly
                        ? `₹${selectedBike?.price5Hours ?? 0}/5hrs (≈₹${selectedBike && selectedBike.price5Hours ? Math.round(selectedBike.price5Hours / 5) : 0}/hr)`
                        : `₹${selectedBike?.price1Day ?? 0}/day`}
                    </div>
                    <div><span className="font-semibold">Extra km charge:</span> ₹{selectedBike?.extraKmCharge ?? '-'} /km</div>
                    <div><span className="font-semibold">Start:</span> {startDate || 'Not selected'}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button onClick={handleAddCustomToCart} className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold">Add Customely</button>
                </div>

                <div className="mt-3">
                  <button onClick={() => setCustomOpen(false)} className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TemplesNearby */}
      <TemplesNearby />

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function CategorySection({ title, hintText, bikes, onQuickAdd, onCustomOpen, onSimpleAdd, showToast }:
  { title: string; hintText: string; bikes: Bike[]; onQuickAdd: (b: Bike, d: string, s: string, priceSnapshot: number, totalPrice: number) => void; onCustomOpen: (b: Bike) => void; onSimpleAdd: (b: Bike) => void; showToast: (msg: string, type?: ToastType) => void; }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4"><div className="w-1.5 h-10 bg-yellow-400 rounded" /><h3 className="text-2xl font-bold">{title}</h3></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bikes.map(b => (
          <div key={b._id} className="relative">
            <BikeCard bike={b} onAddToCart={(bikeItem, duration, startDate, priceSnapshot, totalPrice) => onQuickAdd(bikeItem, duration, startDate, priceSnapshot, totalPrice)} showToast={showToast} />
            <div className="flex gap-2 mt-3">
              <button onClick={() => onCustomOpen(b)} className="flex-1 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-800 hover:bg-gray-50 transition">Custom Book</button>
              <button onClick={() => onSimpleAdd(b)} className="flex-1 py-2 bg-yellow-400 rounded-md text-sm font-semibold hover:bg-yellow-500 transition">Book Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-4"><span className="text-sm text-blue-900 font-semibold">{hintText}</span></div>
    </div>
  );
}

function TemplesNearby() {
  const items = TEMPLES;
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(window.innerWidth * 0.7);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-2 bg-yellow-400/80 rounded-full mb-4"><span className="text-sm font-semibold text-gray-900">SPIRITUAL DESTINATIONS</span></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Temples Nearby</h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">Explore the sacred temples around Tirupati. Use the slider below to browse popular spots.</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 mb-8 shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Plan Your Spiritual Journey</h3>
            <p className="text-gray-800 text-sm md:text-base">Book a bike and visit these temples at your pace. Comfortable rides and secure parking available.</p>
          </div>
          <a href="https://wa.me/919393936773?text=Hi, I would like to book a bike for temple visits" target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 font-semibold">Book Now</a>
        </div>

        <div className="relative">
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
            <button aria-label="Scroll left" onClick={() => scroll('left')} className="p-2 bg-white rounded-full shadow hover:bg-gray-100"><ChevronLeft size={18} /></button>
          </div>

          <div ref={trackRef} tabIndex={0} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
            {items.map(t => <TempleCard key={t.id} temple={t} />)}
          </div>

          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
            <button aria-label="Scroll right" onClick={() => scroll('right')} className="p-2 bg-white rounded-full shadow hover:bg-gray-100"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Temple Visit Tips</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Best Time to Visit</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Early morning (5-8 AM) for peaceful darshan</li>
                <li>Avoid weekends & festival days</li>
                <li>Plan 2-3 hours for major temples</li>
                <li>Check temple timings before visiting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">What to Carry</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Valid ID proof (mandatory)</li>
                <li>Comfortable traditional clothing</li>
                <li>Water bottle and light snacks</li>
                <li>Umbrella or raincoat (during monsoon)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TempleCard({ temple }: { temple: Temple }) {
  return (
    <div className="min-w-[260px] max-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden group">
      <div className="relative h-44 overflow-hidden">
        <img src={temple.image} alt={temple.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full flex items-center gap-2"><Navigation size={14} /><span>{temple.distance}</span></div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{temple.name}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{temple.description}</p>
        <div className="flex items-start gap-3 text-sm text-gray-700 mb-3"><MapPin size={14} /><div><div className="font-semibold text-xs">{temple.location}</div><div className="text-gray-500 text-xs">{temple.openingHours}</div></div></div>
        <a href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name + ' ' + temple.location)}`} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-3 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold text-sm">Get Directions</a>
      </div>
    </div>
  );
}

function Testimonial({ name, city, rating, comment }: { name: string; city: string; rating: number; comment: string; }) {
  return (
    <div className="bg-yellow-50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-600">{city}</div>
        </div>
        <div className="text-yellow-500 font-bold">
          {Array.from({length: rating}).map((_, i) => '★').join('')}{Array.from({length: 5-rating}).map((_, i) => '☆').join('')}
        </div>
      </div>
      <p className="text-sm text-gray-700">"{comment}"</p>
    </div>
  );
}
