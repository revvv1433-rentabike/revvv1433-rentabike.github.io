import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/919393936773?text=${whatsappMessage}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-400/80 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-900">CONTACT US</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Main Branch (Central)</h3>
                    <p className="text-gray-600">
                      Tirupathi Bike Rentals<br />
                      Opposite to Central Railway Station<br />
                      Tirupati, Andhra Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+919393936773" className="text-gray-600 hover:text-yellow-600 transition">
                      +91 9393936773
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available 5:30 AM - 10 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:revvv143@gmail.com" className="text-gray-600 hover:text-yellow-600 transition">
                      revvv143@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Sunday<br />
                      5:30 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Contact via WhatsApp</h3>
              <p className="text-gray-800 mb-6">
                Get instant response by contacting us directly on WhatsApp for bookings and queries.
              </p>
              <a
                href="https://wa.me/919393936773?text=Hi, I would like to inquire about bike rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message via WhatsApp
              </button>

              <p className="text-sm text-gray-500 text-center">
                This form will open WhatsApp with your message pre-filled
              </p>
            </form>
          </div>
        </div>

        {/* Split map + branch details into two halves */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Branch A / Main Branch */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Main Branch (Railway station branch)</h4>
                  <p className="text-sm text-gray-600">RentABike bestbikerentaltirupathi Opptorailwaystationmainentrance1,Shopno4,Gopikrishnalodge,nearindianflag, Tirupati, Andhra Pradesh 517501</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Phone:</strong> <a href="tel:+919393936773" className="underline">+91 93939 36773</a></p>
                </div>
              </div>

              <div className="w-full h-[320px] md:h-[400px] bg-gray-100">
                {/* Use a simple search embed — replace queries if you have exact place/embed keys */}
                <iframe
                  title="Main Branch Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.476787523596!2d79.4194787!3d13.628736100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b2bd0864443%3A0x3969472f2a8d0b06!2sRentABike%20bestbikerentaltirupathi%26tirumala!5e0!3m2!1sen!2sin!4v1762797330183!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Branch B  */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Branch 2 (Srinivasam)</h4>
                  <p className="text-sm text-gray-600">Opptosrinivasam,Shopno1, sreekanthlodge, Peddakapu St, thirdlinestarting, Tata Nagar, Tirupati, Andhra Pradesh 517501</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Phone:</strong> <a href="tel:+919393936773" className="underline">+91 93939 36773</a></p>
                </div>
              </div>

              <div className="w-full h-[320px] md:h-[400px] bg-gray-100">
                <iframe
                  title="Srinivasam branch Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.4277201615055!2d79.42766019999999!3d13.631726200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b42826a1719%3A0x9e5b000252b0334c!2sMRBIKERENTALS!5e0!3m2!1sen!2sin!4v1762797206165!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
