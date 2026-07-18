import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

import Hero from './components/Hero';
import Fleet from './pages/Fleet';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TemplesNearby from './pages/TemplesNearby';
import Profile from './pages/Profile';

import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import CartModal from './components/CartModal';

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />

        <Navbar
          onLoginClick={() => setShowLoginModal(true)}
          onCartClick={() => setShowCartModal(true)}
        />

        <main className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Fleet" element={<Fleet />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/TemplesNearby" element={<TemplesNearby />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </main>

        <WhatsAppFloat />
        <Footer />

        {/* Modals */}
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            onClose={() => setShowSignupModal(false)}
            onSwitchToLogin={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
          />
        )}

        {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
