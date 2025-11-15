import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Fleet from './pages/Fleet';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TemplesNearby from './pages/TemplesNearby';
import Profile from './pages/Profile';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import CartModal from './components/CartModal';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onBookNowClick={() => handleNavigate('fleet')} />;
      case 'fleet':
        return <Fleet />;
      case 'about-us':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      case 'temples-nearby':
        return <TemplesNearby />;
      case 'profile':
        return <Profile />;
      default:
        return <Hero onBookNowClick={() => handleNavigate('fleet')} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navbar
            onLoginClick={() => setShowLoginModal(true)}
            onCartClick={() => setShowCartModal(true)}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />

          <main>{renderPage()}</main>

          <WhatsAppFloat />

          <Footer />

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
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
