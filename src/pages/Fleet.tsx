import React, { useEffect, useMemo, useState } from 'react';
import BikeCard from '../components/BikeCard';
import { Bike } from '../types';
import { useCart } from '../context/CartContext';
import { Calendar, Clock } from 'lucide-react';

/* --------------------- Small Toast system (self-contained) --------------------- */
type ToastType = 'success' | 'error' | 'info';
function useToasts() {
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((s) => [...s, { id, message, type }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 4500);
  };
  const removeToast = (id: string) => setToasts((s) => s.filter((t) => t.id !== id));
  const ToastContainer = () => (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm w-full rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 ${
            t.type === 'success' ? 'bg-green-50 border border-green-200' : t.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-white border'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex-1 text-sm text-gray-800">{t.message}</div>
          <button onClick={() => removeToast(t.id)} className="text-xs text-gray-500 hover:text-gray-700 ml-2">✕</button>
        </div>
      ))}
    </div>
  );
  return { showToast, ToastContainer };
}

/* -------------------------------- Fleet ------------------------------------- */
export default function Fleet() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const { addToCart } = useCart();
  const { showToast, ToastContainer } = useToasts();

  // Custom modal state
  const [customOpen, setCustomOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  // booking form state
  const [isHourly, setIsHourly] = useState(false); // false = day-wise
  const [hours, setHours] = useState<number>(5);
  const [days, setDays] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const sampleBikes: Bike[] = [
      { _id: '1', name: 'Activa 6G', model: 'Automatic Scooter', images: ['https://images.drivespark.com/ph-big/2020/01/honda-activa-6g-6.jpg','https://cdn.bikedekho.com/processedimages/honda/activa-6g/source/activa-6g67ff4b458ea89.jpg?imwidth=360&impolicy=resize'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic', 'Fuel Efficient', 'Comfortable'], color: 'Black & Red' },
        { _id: '2', name: 'Jupiter 110cc', model: 'Scooty', images: ['https://imgd.aeplcdn.com/1056x594/n/ahvh7eb_1768799.jpg?q=80'], price5Hours: 250, price1Day: 500, price2Days: 1000, extraKmCharge: 3, available: true, features: ['Automatic'], color: 'Blue' },

      { _id: 'c2', name: 'Jupiter 125cc', model: 'Scooty', images: ['https://cdn.bikedekho.com/processedimages/tvs/jupiter-125/source/jupiter-125683832695bac3.jpg','https://www.tvsmotor.com/tvs-jupiter-125/-/media/TVS-Jupiter-125/CompareSection/nav_red.webp'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic', 'Stylish', 'Reliable'], color: 'Blue' },
      { _id: '3', name: 'Fascino 125cc', model: 'Scooty', images: ['https://www.yamaha-motor-india.com/theme/v3/image/fascino125fi-new/color/Disc/YELLOW-COCKTAIL-STD.png'], price5Hours: 300, price1Day: 600, price2Days: 1100, extraKmCharge: 3, available: true, features: ['Automatic', 'Sporty', 'Modern'], color: 'Yellow' },
      { _id: '12', name: 'Dio 125', model: '125cc Scooter', images: ['https://acko-cms.ackoassets.com/Honda_Dio_125_932a6fe56e.jpg','https://imgd.aeplcdn.com/1280x720/n/cw/ec/152781/dio-125-right-side-view.jpeg?isig=0&q=100'], price5Hours: 320, price1Day: 650, price2Days: 1200, extraKmCharge: 3, available: true, features: ['Automatic', 'Peppy', 'Tech Features'], color: 'Matte Black' },
      { _id: '13', name: 'Aprilia SR 160', model: '160cc Sport Scooter', images: ['https://apriliaindia.com/images/SR_160_Race.jpg','https://www.otocapital.in/_next/image?url=https%3A%2F%2Fassets.otocapital.in%2Fproduction%2Faprilia-sr-160.png&w=1024&q=75'], price5Hours: 500, price1Day: 1200, price2Days: 2200, extraKmCharge: 4, available: true, features: ['Sporty', 'Powerful', 'Performance Oriented'], color: 'Racing Black' },

      { _id: '4', name: 'Honda Shine', model: '125cc Geared', images: ['https://images.91wheels.com/assets/b_images/gallery/honda/shine/honda-shine-8-1718024474.jpg?w=480&q=80','https://i.pinimg.com/736x/a4/12/69/a41269b4e38505e5f0c3a70433da971f.jpg'], price5Hours: 450, price1Day: 700, price2Days: 1300, extraKmCharge: 5, available: true, features: ['Geared', 'Powerful', 'Long Distance'], color: 'Silver & Black' },
      { _id: '5', name: 'Passion Pro', model: '125cc Geared', images: ['https://imgd.aeplcdn.com/1280x720/bw/ec/32066/Hero-Passion-PRO-i3s-Front-threequarter-113490.jpg?wm=0','https://www.motownindia.com/images/Auto-Pit-Bikes/Hero-Motorcorp-unveils-three-motorcycles---new-Passion-PRO-110cc-Passion-XPRO-110cc--Super-Splendor-125cc-Motown-India-Bureau-2-445.jpg'], price5Hours: 450, price1Day: 700, price2Days: 1300, extraKmCharge: 5, available: true, features: ['Geared', 'Fuel Efficient', 'Reliable'], color: 'Black' },
      { _id: '6', name: 'Bajaj Pulsar', model: '150cc Sport', images: ['https://wallpapercave.com/wp/wp4728474.jpg','https://5.imimg.com/data5/YU/EP/GLADMIN-24849411/bajaj-pulsar-150-motorcycle-500x500.png'], price5Hours: 450, price1Day: 800, price2Days: 1500, extraKmCharge: 5, available: true, features: ['Sporty', 'Powerful Engine', 'Stylish'], color: 'Black & Red' },
      { _id: '14', name: 'Yamaha FZ', model: '150cc Sport', images: ['https://wallpapercat.com/w/full/5/0/6/1753801-2048x1286-desktop-hd-yamaha-fz-fi-wallpaper-image.jpg','https://w0.peakpx.com/wallpaper/702/646/HD-wallpaper-fz-motorcycle-sky-stylish-bike-thumbnail.jpg'], price5Hours: 600, price1Day: 1400, price2Days: 2700, extraKmCharge: 5, available: true, features: ['Naked Bike', 'Torque', 'City Friendly'], color: 'Matte Black' },
      { _id: '17', name: 'Yamaha MT-15', model: '155cc Sport', images: ['https://i.pinimg.com/736x/e6/c6/cd/e6c6cd3a5a9665b1f5c7c17695aea5b4.jpg','https://images.unsplash.com/photo-1695013147209-1516a20f0cdd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFtYWhhJTIwbXQxNXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Aggressive Styling', 'High Torque', 'Urban Performance'], color: 'Dark Matte' },
      { _id: '18', name: 'Yamaha R15 V3', model: '155cc Sport Bike', images: ['https://imgd.aeplcdn.com/1056x594/n/cw/ec/209893/r15-right-side-view.jpeg?isig=0&q=80', ' https://imgd.aeplcdn.com/424x424/bw/ec/34973/Yamaha-YZF-R15-V3-Front-threequarter-130087.jpg?wm=2&q=80'], price5Hours: 900, price1Day: 2200, price2Days: 4200, extraKmCharge: 6, available: true, features: ['Race Inspired', 'Fairing', 'High Revving'], color: 'Racing Blue' },
      { _id: '19', name: 'Suzuki Gixxer 250', model: '250cc Sport', images: ['https://imgd.aeplcdn.com/1280x720/n/cw/ec/195419/gixxer-sf-250-right-side-view.jpeg?isig=0','https://gaadiwaadi.com/wp-content/uploads/2016/11/Suzuki-GSX-250R-India-10.jpg'], price5Hours: 700, price1Day: 1600, price2Days: 3100, extraKmCharge: 6, available: true, features: ['Powerful', 'Cruiser Friendly', 'Comfortable'], color: 'Pearl White' },
      { _id: '7', name: 'Royal Enfield Bullet', model: '350cc Classic', images: ['https://media.zigcdn.com/media/model/2025/Jun/lest-side-view-183942663_930x620.jpg','https://images.unsplash.com/photo-1622185135505-2d795003994a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm95YWwlMjBlbmZpZWxkfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Classic', 'Powerful', 'Heritage'], color: 'Red & Black' },
      { _id: '16', name: 'GT 650', model: '650cc Sport', images: ['https://imgd.aeplcdn.com/1056x594/n/cw/ec/49656/continental-gt-right-side-view-12.png?isig=0&q=80','https://i.pinimg.com/736x/f5/9f/16/f59f160b9a28e63883c6a7423140fc79.jpg'], price5Hours: 1250, price1Day: 3500, price2Days: 6000, extraKmCharge: 5, available: true, features: ['GT', 'Powerful', 'Heritage'], color: 'Silver & Black' },
      { _id: '15', name: 'KTM Duke 200', model: '200cc Sport', images: ['https://www.ktmindia.com/-/media/images/ktm/booking/ktm-pngs-and-webps/ktm-200-duke/electronic-orange-webp.webp','https://s1.cdn.autoevolution.com/images/moto_gallery/ktm-200-duke-2021-14598_18.jpg'], price5Hours: 650, price1Day: 1500, price2Days: 2900, extraKmCharge: 5, available: true, features: ['Classic', 'Powerful', 'Heritage'], color: 'Orange & Black' },

      { _id: '8', name: 'Swift Dzire', model: 'Sedan Car', images: ['https://mda.spinny.com/sp-file-system/public/2025-04-21/7a016e96505c41849d52c11137d5d06d/raw/file.JPG'], price5Hours: 1000, price1Day: 2300, price2Days: 4500, extraKmCharge: 10, available: true, features: ['4-Seater', 'Automatic', 'Air Conditioned'], color: 'Silver' },
      { _id: '9', name: 'Maruti Ertiga', model: '7-Seater MUV', images: ['https://static-cdn.cars24.com/prod/new-car-cms/Ertiga_Tour_Feature_Image_80388009fd.png'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['7-Seater', 'Family Vehicle', 'Spacious'], color: 'White' },
      { _id: '10', name: 'Kia Carens', model: 'Premium MUV', images: ['https://imgd.aeplcdn.com/664x374/n/cw/ec/174325/carens-exterior-left-front-three-quarter.jpeg?isig=0&q=80'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['7-Seater', 'Premium', 'Advanced Features'], color: 'Black' },
      { _id: '11', name: 'Innova Crysta', model: 'Luxury MUV', images: ['https://www.v3cars.com/media/model-imgs/1666248141-Innova%20Crysta-Exterior.webp'], price5Hours: 1500, price1Day: 4000, price2Days: 7500, extraKmCharge: 18, available: true, features: ['8-Seater', 'Luxury', 'Spacious Interior'], color: 'Black Pearl' },
      { _id: '20', name: 'Maruti Baleno', model: 'Hatchback', images: ['https://images.drivespark.com/ph-big/2019/01/maruti-baleno-exterior-2.jpg','https://stimg.cardekho.com/images/car-images/large/Rolls-Royce/Ghost-Series-II/12399/1739005503453/Pearl-Arctic-White_ffffff.jpg?impolicy=resize&imwidth=420'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Hatchback', 'Comfortable', 'Fuel Efficient'], color: 'Pearl White' },
      { _id: '21', name: 'Toyota Glanza', model: 'Hatchback', images: ['https://i.pinimg.com/736x/c4/5c/49/c45c491a2b03ea5ae3ed35ab25c5826f.jpg','https://www.galaxytoyota.in/public/storage/1028/car-light-grey.png'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Hatchback', 'Reliable', 'AC'], color: 'Silver' },
      { _id: '22', name: 'Maruti Swift', model: 'Hatchback', images: ['https://i.pinimg.com/736x/9d/54/ff/9d54ff0b722180b73da61ca9f68f9bf5.jpg','https://www.autovista.in/assets/img/new_cars_colour_variants/swift-colour-solid-fire-red.jpg'], price5Hours: 900, price1Day: 2000, price2Days: 3800, extraKmCharge: 10, available: true, features: ['Compact', 'Fuel Efficient', 'Easy Parking'], color: 'Red' },
      { _id: '23', name: 'Hyundai i20', model: 'Premium Hatchback', images: ['https://c4.wallpaperflare.com/wallpaper/1005/256/47/hyundai-i20-wallpaper-preview.jpg','https://www.motorbeam.com/wp-content/uploads/2020-Hyundai-i20-Rear.jpg'], price5Hours: 950, price1Day: 2200, price2Days: 4200, extraKmCharge: 10, available: true, features: ['Premium', 'Comfort', 'Tech Packed'], color: 'Ocean Blue' },
      { _id: '24', name: 'Hyundai i10', model: 'Hatchback', images: ['https://stimg.cardekho.com/images/car-images/large/Hyundai/Hyundai-i10/pure-white.jpg?impolicy=resize&imwidth=420','https://www.vertumotors.com/new/vertu/car/hyundai/i10/_0004s_0001s_0001_i10-premium-02%5E780x585%5E.jpg'], price5Hours: 800, price1Day: 1800, price2Days: 3400, extraKmCharge: 10, available: true, features: ['City Car', 'Easy Drive', 'Economical'], color: 'White' },
      { _id: '25', name: 'Maruti Brezza', model: 'Compact SUV', images: ['https://images.jdmagicbox.com/quickquotes/images_main/maruti-suzuki-vitara-brezza-zdi-diesel-pearl-arctic-white-82811386-ktiq7.png','https://rushlane.com/wp-content/uploads/2021/11/2022-maruti-brezza-white-suv-petrol-launch-price-3-600x338.jpg'], price5Hours: 1200, price1Day: 3000, price2Days: 5800, extraKmCharge: 15, available: true, features: ['SUV', 'Spacious', 'Comfortable'], color: 'Pearl White' },
      { _id: 'b25', name: 'Maruti Victoris', model: 'Compact SUV', images: ['https://content.carlelo.com/uploads/model/victoris-model-image.webp','https://img.autocarindia.com/askautocaranything/Maruti-Victoris-090920251040.jpeg?w=700&q=90&c=1'], price5Hours: 1200, price1Day: 3000, price2Days: 5800, extraKmCharge: 15, available: true, features: ['SUV', 'Spacious', 'Comfortable'], color: 'Pearl White' }
    ];
    
    setBikes(sampleBikes);
  }, []);

  // categories grouped for display
  const categoryBikes = useMemo(
    () => ({
      scooters: bikes.filter((b) => ['Activa 6G', 'Jupiter 110cc','Jupiter 125cc', 'Fascino 125cc', 'Dio 125', 'Aprilia SR 160'].includes(b.name)),
      bikes: bikes.filter((b) => ['Honda Shine', 'Passion Pro', 'Bajaj Pulsar', 'Royal Enfield Bullet', 'GT 650','KTM Duke 200', 'Yamaha FZ', 'Yamaha MT-15', 'Yamaha R15 V3', 'Suzuki Gixxer 250'].includes(b.name)),
      cars: bikes.filter((b) => ['Swift Dzire', 'Maruti Ertiga', 'Kia Carens', 'Innova Crysta', 'Maruti Baleno', 'Toyota Glanza', 'Maruti Swift', 'Hyundai i20', 'Hyundai i10', 'Maruti Brezza','Maruti Victoris'].includes(b.name)),
    }),
    [bikes],
  );

  // Pricing logic used by modal (keeps parity with BikeCard)
  const computePriceDetails = (bike: Bike, hourly: boolean, hoursVal: number, daysVal: number, qty: number) => {
    if (!bike) return { unitPrice: 0, totalPrice: 0, durationString: '' };
    if (hourly) {
      const perHour = bike.price5Hours ? Math.round(bike.price5Hours / 5) : Math.round((bike.price1Day || 0) / 8);
      const unitPrice = perHour;
      const totalPrice = unitPrice * Math.max(1, hoursVal) * Math.max(1, qty);
      return { unitPrice, totalPrice, durationString: `${hoursVal}hours` };
    } else {
      // daily pricing
      let totalForDays = 0;
      if (daysVal <= 1) totalForDays = bike.price1Day || 0;
      else if (daysVal === 2) totalForDays = bike.price2Days || (bike.price1Day || 0) * 2;
      else totalForDays = (bike.price2Days || (bike.price1Day || 0) * 2) + (bike.price1Day || 0) * (daysVal - 2);
      const unitPrice = Math.round(totalForDays / daysVal);
      const totalPrice = totalForDays * Math.max(1, qty);
      return { unitPrice, totalPrice, durationString: `${daysVal}days` };
    }
  };

  // Quick add (from BikeCard) - BikeCard will call this with priceSnapshot & totalPrice
  const handleQuickAddFromCard = (bikeItem: Bike, duration: string, start: string, priceSnapshot: number, totalPrice: number) => {
    // push to cart using the fields cart expects
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

  // Open custom modal
  const openCustom = (bike: Bike) => {
    setSelectedBike(bike);
    setIsHourly(false);
    setHours(5);
    setDays(1);
    setStartDate(new Date().toISOString().split('T')[0]);
    setQuantity(1);
    setCustomOpen(true);
  };

  // Add custom booking to cart (from modal)
  const handleAddCustomToCart = () => {
    if (!selectedBike) return showToast('No bike selected', 'error');
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

  // Simple one-day add for non-card flows (keeps parity)
  const handleAddOneDay = (bike: Bike) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-400/80 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-900">OUR FLEET</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Rent A Bike - Our Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse fleet of scooters, bikes, and cars. All vehicles are well-maintained and ready for your journey.
          </p>
        </div>

        {/* Scooters */}
        <Section
          title="Scooters (Automatic)"
          bikes={categoryBikes.scooters}
          onQuickAdd={handleQuickAddFromCard}
          onCustomOpen={openCustom}
          onSimpleAdd={handleAddOneDay}
        />

        {/* Geared Bikes */}
        <Section
          title="Geared Bikes & Sports"
          bikes={categoryBikes.bikes}
          onQuickAdd={handleQuickAddFromCard}
          onCustomOpen={openCustom}
          onSimpleAdd={handleAddOneDay}
        />

        {/* Cars */}
        <Section
          title="Cars & SUVs"
          bikes={categoryBikes.cars}
          onQuickAdd={handleQuickAddFromCard}
          onCustomOpen={openCustom}
          onSimpleAdd={handleAddOneDay}
        />

        {/* Terms & Why choose */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">General Terms & Conditions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Requirements</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>• Valid Driver's License & Aadhar Card</li>
                <li>• 2nd Person's Aadhar Card</li>
                <li>• Age Minimum: 18 years</li>
                <li>• Security Deposit Required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>• No petrol/diesel included</li>
                <li>• No FastTag included</li>
                <li>• Helmets provided</li>
                <li>• 24/7 Roadside Assistance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Charges</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>• Extra hour charges apply</li>
                <li>• Damage costs paid by customer</li>
                <li>• Late return: ₹100-250/hour</li>
                <li>• Basic insurance included</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>• Call: +91 9393936773</li>
                <li>• Available 24/7</li>
                <li>• WhatsApp Support</li>
                <li>• Near Railway Station</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Rent A Bike?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">30000+</div>
              <p className="text-gray-700">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
              <p className="text-gray-700">Vehicles</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">24/7</div>
              <p className="text-gray-700">Support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
              <p className="text-gray-700">Safe & Insured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Booking Modal */}
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
                {/* Toggle */}
                <label className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${!isHourly ? 'text-gray-800' : 'text-gray-500'}`}>Day-wise</span>

                  <div
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={() => setIsHourly((p) => !p)}
                    role="button"
                    aria-pressed={isHourly}
                  >
                    <input type="checkbox" checked={isHourly} onChange={() => setIsHourly((p) => !p)} className="sr-only" />
                    <div className={`w-14 h-7 rounded-full transition-colors ${isHourly ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <div
                      className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isHourly ? 'translate-x-7' : 'translate-x-0'}`}
                    />
                  </div>

                  <span className={`text-sm font-medium ${isHourly ? 'text-gray-800' : 'text-gray-500'}`}>Hourly</span>
                </label>

                {/* inputs */}
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
                    <div><span className="font-semibold">Extra km charge:</span> ₹{selectedBike?.extraKmCharge ?? '-'}/km</div>
                    <div><span className="font-semibold">Start:</span> {startDate || 'Not selected'}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button onClick={handleAddCustomToCart} className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold">Add Customely</button>
                </div>

                <div className="mt-3">
                  <button onClick={() => { setCustomOpen(false); }} className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

/* ---------------- small Section helper component ---------------- */
function Section({ title, bikes, onQuickAdd, onCustomOpen, onSimpleAdd }:
  { title: string; bikes: Bike[]; onQuickAdd: (bike: Bike, duration: string, start: string, priceSnapshot: number, totalPrice: number) => void; onCustomOpen: (b: Bike) => void; onSimpleAdd: (b: Bike) => void; }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-yellow-400 rounded" />
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bikes.map((bike) => (
          <div key={bike._id} className="relative">
            <BikeCard
              bike={bike}
              onAddToCart={(bikeItem, duration, startDate, priceSnapshot, totalPrice) => {
                // propagate to cart
                onQuickAdd(bikeItem, duration, startDate, priceSnapshot, totalPrice);
              }}
            />
            <div className="flex gap-2 mt-3">
              <button onClick={() => onCustomOpen(bike)} className="flex-1 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-800 hover:bg-gray-50 transition">
                Custom Book
              </button>
              <button onClick={() => onSimpleAdd(bike)} className="flex-1 py-2 bg-yellow-400 rounded-md text-sm font-semibold hover:bg-yellow-500 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* small info row */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">{title.split(' ')[0]}:</span> limits and extra charges apply — check above details.
        </p>
      </div>
    </div>
  );
}
