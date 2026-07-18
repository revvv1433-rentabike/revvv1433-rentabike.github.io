import { Award, Shield, Users, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-400/80 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-900">ABOUT US</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Trusted Travel Partner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving pilgrims and travelers in Tirupati with reliable bike rental services since our inception.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://i.postimg.cc/2SBCW6VS/Whats-App-Image-2025-11-04-at-11-55-22-PM.jpg"
              alt="Our Fleet"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Tirupathi Bike Rentals was founded with a simple mission: to provide pilgrims and travelers visiting Tirupati with a convenient, affordable, and reliable way to explore the sacred city and its surroundings.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Located conveniently near the Tirupati Central Railway Station, we understand the needs of travelers who want the freedom to explore at their own pace. Our fleet of well-maintained bikes and scooters ensures that your journey is comfortable and worry-free.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We take pride in our transparent pricing, excellent customer service, and commitment to safety. Every vehicle in our fleet undergoes regular maintenance and safety checks to ensure you have the best riding experience.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-900" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">30,000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-gray-900" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Bike Models</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-gray-900" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Safe & Insured</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-gray-900" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
              <p className="text-gray-700">
                No hidden charges. What you see is what you pay. Clear pricing for all rental durations.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Well-Maintained Fleet</h3>
              <p className="text-gray-700">
                All our bikes undergo regular maintenance and safety checks for your peace of mind.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Convenient Location</h3>
              <p className="text-gray-700">
                Located near the railway station, making it easy to start your journey right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
