import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const whatsappNumber = '919393936773';
  const defaultMessage = 'Hi, I would like to inquire about bike rentals';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 duration-300"
      title="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}