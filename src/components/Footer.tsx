import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">RAB</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Rent A Bike</h3>
                <p className="text-xs text-gray-400">Tirupati Bike Rentals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for bike rentals in Tirupati. Explore the city at your own pace with our well-maintained fleet.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-yellow-400 transition">Home</a>
              </li>
              <li>
                <a href="/#fleet" className="text-gray-400 hover:text-yellow-400 transition">Our Fleet</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-yellow-400 transition">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-yellow-400 transition">Contact</a>
              </li>
              <li>
                <a href="/#TemplesNearby" className="text-gray-400 hover:text-yellow-400 transition">Temples Nearby</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Tirupathi Bike Rentals, Near Railway Station, Tirupati, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-yellow-400 flex-shrink-0" />
                <a href="tel:+919393936773" className="text-gray-400 hover:text-yellow-400 transition">+91 9393936773</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-yellow-400 flex-shrink-0" />
                <a href="mailto:revvv143@gmail.com" className="text-gray-400 hover:text-yellow-400 transition">revvv143@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Business Hours</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span>5:30 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>5:30 AM - 10:00 PM</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-yellow-400">Follow Us</h4>
              <div className="flex gap-3">
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/revvv143?igsh=bTZqZWVsaG1oaGlm" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Tirupathi Bike Rentals. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Minimum age: 18 years | Valid driver's license required | Helmets provided
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Designed by Ganesh , Athesh and co with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}