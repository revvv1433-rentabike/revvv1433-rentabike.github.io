import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onLoginClick: () => void;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ onLoginClick, onCartClick, currentPage, onNavigate }: NavbarProps) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop to avoid stuck state
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = ['Home', 'Fleet', 'About Us', 'Contact', 'Temples Nearby'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top thin bar with contact info */}
     

      {/* Main nav bar */}
      <div className="bg-white/90 backdrop-blur-md shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/" className="block w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://i.postimg.cc/tT7HKXv3/Whats-App-Image-2025-11-04-at-11-55-22-P.jpg"
                  alt="Rent A Bike Logo"
                  className="w-full h-full object-cover"
                />
              </a>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-none">Rent A Bike</h1>
                <p className="text-xs text-gray-600 leading-none">Tirupati Bike Rentals</p>
              </div>
            </div>

            {/* Desktop nav items */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate(item.toLowerCase().replace(/\s+/g, '-'))}
                  className={`text-gray-700 hover:text-yellow-500 transition font-medium ${
                    currentPage === item.toLowerCase().replace(/\s+/g, '-') ? 'text-yellow-500 border-b-2 border-yellow-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-yellow-50 rounded-full transition"
                aria-label="Open cart"
              >
                <ShoppingCart size={22} className="text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition">
                    <User size={18} />
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <button
                      onClick={() => onNavigate('profile')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold text-sm"
                >
                  Login
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="lg:hidden p-2 hover:bg-yellow-50 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu (full-width dropdown) */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 pb-4 border-t pt-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onNavigate(item.toLowerCase().replace(/\s+/g, '-'));
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-4 rounded ${
                      currentPage === item.toLowerCase().replace(/\s+/g, '-') ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}

                <div className="border-t pt-3">
                  {user ? (
                    <div className="flex flex-col">
                      <button onClick={() => onNavigate('profile')} className="text-left py-2 px-4">My Profile</button>
                      <button onClick={logout} className="text-left py-2 px-4 text-red-600">Logout</button>
                    </div>
                  ) : (
                    <button onClick={onLoginClick} className="w-full text-left py-2 px-4 bg-yellow-50 rounded">Login</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-1 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a href="mailto:revvv143@gmail.com" className="flex items-center gap-2 hover:text-white transition">
              <Mail size={14} />
              <span>revvv143@gmail.com</span>
            </a>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Tirupathi Bike Rentals, Tirupati</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+919393936773" className="flex items-center gap-2 hover:text-white transition">
              <Phone size={14} />
              <span className="font-semibold">+91 93939 36773</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
