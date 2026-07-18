import { MapPin, Clock, Navigation } from 'lucide-react';

interface Temple {
  id: string;
  name: string;
  distance: string;
  location: string;
  description: string;
  openingHours: string;
  image: string;
}

export default function TemplesNearby() {
  const temples: Temple[] = [
    {
      id: '1',
      name: 'Sri Venkateswara Temple',
      distance: '20 km',
      location: 'Tirumala Hills, Tirupati',
      description: 'The famous Tirumala Venkateswara Temple, dedicated to Lord Venkateswara. One of the most visited pilgrimage sites in the world.',
      openingHours: 'Open 24 hours',
      image: 'https://media.istockphoto.com/id/1268716417/photo/misty-tirupathi.jpg?s=612x612&w=0&k=20&c=6tcFZEteaY9mOhZADzIRo8b8NmUqCEmsO6ZIgbfjGW0=',
    },
    {
      id: '2',
      name: 'Sri Govindaraja Swamy Temple',
      distance: '2 km',
      location: 'Main City, Tirupati',
      description: 'An ancient temple dedicated to Lord Vishnu, located in the heart of Tirupati city with beautiful architecture.',
      openingHours: '6:00 AM - 9:00 PM',
      image: 'https://c9admin.cottage9.com/uploads/2216/Architectural-Magnificence-of-Govindaraja-Swamy-Temple-Tirupati.jpg',
    },
    {
      id: '3',
      name: 'Sri Kapileswara Swamy Temple',
      distance: '5 km',
      location: 'Kapilatheertham, Tirupati',
      description: 'A temple dedicated to Lord Shiva, known for its natural waterfalls and scenic beauty.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://kalyangeetha.wordpress.com/wp-content/uploads/2021/11/srinivasamangapuram.jpg?w=1024',
    },
    {
      id: '4',
      name: 'Sri Kalyana Venkateswara Temple (Srinivasa Mangapuram)',
      distance: '12 km',
      location: 'Srinivasa Mangapuram',
      description: 'Also known as Srinivasa Mangapuram, this temple is where Lord Venkateswara is believed to have married Goddess Padmavathi.',
      openingHours: '6:00 AM - 8:00 PM',
      image: 'https://tirumalahills.wordpress.com/wp-content/uploads/2016/02/srinivasa-mangapuram-2.jpg?w=1000',
    },
    {
      id: '5',
      name: 'Sri Padmavathi Ammavari Temple',
      distance: '15 km',
      location: 'Tiruchanur, Tirupati',
      description: 'Dedicated to Goddess Padmavathi, the consort of Lord Venkateswara. Located in Tiruchanur.',
      openingHours: '5:30 AM - 9:00 PM',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3c/61/9a/sri-padmavathi-ammavari.jpg?w=800&h=-1&s=1',
    },
    {
      id: '6',
      name: 'ISKCON Tirupati',
      distance: '8 km',
      location: 'Renigunta Road, Tirupati',
      description: 'A modern temple complex with beautiful architecture, gardens, and facilities for devotees.',
      openingHours: '4:30 AM - 1:00 PM, 4:00 PM - 8:30 PM',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/78/3e/b1/good-temple-located-near.jpg?w=1200&h=-1&s=1',
    },

    // New entries start from id 7
    {
      id: '7',
      name: 'Japali Teertham',
      distance: '18 km',
      location: 'Tirumala foothills',
      description: 'Scenic viewpoint offering panoramic vistas of Tirumala’s hills; a peaceful spot associated with sage Japali.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/2a/48/c8/japali-teertham.jpg?w=900&h=500&s=1',
    },
    {
      id: '8',
      name: 'Akasaganga',
      distance: '22 km',
      location: 'Tirumala Hills',
      description: 'A sacred waterfall and spiritual spot on the Tirumala range, known for its natural beauty and quiet atmosphere.',
      openingHours: '6:00 AM - 5:30 PM',
      image: 'https://i0.wp.com/hindupad.com/wp-content/uploads/Akasa-Ganga-Tirumala.png?fit=620%2C376&ssl=1',
    },
    {
      id: '9',
      name: 'Chakra Theertham',
      distance: '21 km',
      location: 'Near Tirumala Temple',
      description: 'Holy water spring with mythological importance; pilgrims visit for ritual baths and purification.',
      openingHours: '5:00 AM - 6:00 PM',
      image: 'https://tirumalatirupatiyatra.in/wp-content/uploads/2017/09/CHAKRATHEERTHAM.jpg',
    },
    {
      id: '10',
      name: 'Papa Vinasanam',
      distance: '19 km',
      location: 'Tirumala region',
      description: 'A sacred bathing ghat believed to cleanse sins; set amid scenic surroundings and pilgrimage paths.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://tirupatitirumalainfo.com/wp-content/uploads/2018/09/Papavinashana-Theertham.png',
    },
    {
      id: '11',
      name: 'Srivari Padalu',
      distance: '20 km',
      location: 'Tirumala Hills',
      description: 'Rock formations and footprints revered as Srivari Padalu — an important devotional stopping point for pilgrims.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://pbs.twimg.com/media/GUsjTKIa0AAh4eo.jpg',
    },
    {
      id: '12',
      name: 'Sila Thoranam',
      distance: '17 km',
      location: 'Tirumala foothills',
      description: 'A natural rock arch and ornate gateway that serves as a scenic threshold to the sacred Tirumala area.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://www.tirumalaupdates.com/wp-content/uploads/2017/04/silathoranam.jpg',
    },
    {
      id: '13',
      name: 'Tumburu Theertham',
      distance: '23 km',
      location: 'Tirumala Hills',
      description: 'Natural spring named after the celestial musician Tumburu; a calm spot for devotees and nature walkers.',
      openingHours: '6:00 AM - 5:30 PM',
      image: 'https://i.ytimg.com/vi/mX9Ct7BdSe8/sddefault.jpg',
    },
    {
      id: '14',
      name: 'Deer Park (Tirumala)',
      distance: '21 km',
      location: 'Tirumala Hills',
      description: 'Lush green area with deer and native flora — a pleasant stop for families and nature enthusiasts.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://content3.jdmagicbox.com/comp/tirupati/y9/9999px877.x877.171205232940.i6y9/catalogue/deer-park-alipiri-tirupati-zoo-2mi5i4vrt0.jpg',
    },
    {
      id: '15',
      name: 'TTD Gardens',
      distance: '20 km',
      location: 'Near Srivari Temple',
      description: 'Well-maintained gardens managed by TTD offering peaceful spots for relaxation and photography.',
      openingHours: '6:00 AM - 8:00 PM',
      image: 'https://images.picxy.com/cache/2019/8/13/c6ca13fe2e28d4ef368526ceab269757.jpg',
    },
    {
      id: '16',
      name: 'SV Zoo Park',
      distance: '8 km',
      location: 'Tirupati',
      description: 'Zoological park housing a variety of animals and birds — a fun and educational visit for families.',
      openingHours: '9:00 AM - 5:00 PM',
      image: 'https://th-i.thgim.com/public/migration_catalog/article10086851.ece/alternates/LANDSCAPE_1200/VJ_09_TIRUPATI_VJ_09_TIRUPATI_ZOO..jpg',
    },
    {
      id: '17',
      name: 'Srikalahasti Temple',
      distance: '36 km',
      location: 'Srikalahasti',
      description: 'Renowned Shiva temple famous for the Vayu Linga and strong astrological significance; popular pilgrimage site.',
      openingHours: '6:00 AM - 9:00 PM',
      image: 'https://c8.alamy.com/comp/GD6EN6/kalahasti-temple-GD6EN6.jpg',
    },
    {
      id: '18',
      name: 'Kanipakam Vinayaka Temple',
      distance: '75 km',
      location: 'Kanipakam',
      description: 'Historic Ganesha shrine known for its self-manifested deity and large pilgrim turnout.',
      openingHours: '4:30 AM - 8:30 PM',
      image: 'https://thetempleguru.com/wp-content/uploads/2024/07/Varasidhi-Vinayaka-Swamy-Temple-Kanipakam-1.jpg',
    },
    {
      id: '19',
      name: 'Thalakona Waterfalls',
      distance: '45 km',
      location: 'Thalakona Forest',
      description: 'Scenic cascading waterfalls surrounded by dense greenery — ideal for trekking and photography.',
      openingHours: '6:00 AM - 5:00 PM',
      image: 'https://www.holidify.com/images/cmsuploads/compressed/Talakona_Fall_20180904190722.jpg',
    },
    {
      id: '20',
      name: 'Vakulamatha Temple',
      distance: '3 km',
      location: 'Tirupati City',
      description: 'Temple dedicated to Vakula Devi (Vakulamatha), an important local shrine visited by devotees.',
      openingHours: '5:30 AM - 9:00 PM',
      image: 'https://blog.yatradham.org/wp-content/uploads/2022/06/Sri-Vakulamatha-Temple-Tirupati-Timings.jpg',
    },
    {
      id: '21',
      name: 'Vellore Golden Temple (Brahmashri)',
      distance: '125 km',
      location: 'Vellore',
      description: 'Dazzling temple adorned with gold plates and intricate carvings; a grand pilgrimage and tourist attraction.',
      openingHours: '6:00 AM - 9:00 PM',
      image: 'https://i.pinimg.com/736x/98/fc/5f/98fc5f60920cf4fd9803e0f3c8d0d298.jpg',
    },
    {
      id: '22',
      name: 'Gudimallam Temple',
      distance: '85 km',
      location: 'Gudimallam',
      description: 'Ancient cave temple dedicated to Lord Shiva — notable for its unique early Dravidian-style lingam and history.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://tirupatitirumalainfo.wordpress.com/wp-content/uploads/2016/09/gudimallam22.jpg?w=640',
    },
    {
      id: '23',
      name: 'Appalayagunta (Narasimha Temple)',
      distance: '18 km',
      location: 'Appalayagunta',
      description: 'Temple dedicated to Lord Narasimha, known for its spiritual significance and regional importance.',
      openingHours: '6:00 AM - 8:00 PM',
      image: 'https://touritvirtually.com/wp-content/uploads/2020/02/Prasanna_Venkateswara_Swamy_Temple_Appalayagunta.jpg',
    },
    {
      id: '24',
      name: 'Narayanavanam',
      distance: '30 km',
      location: 'Narayanavanam',
      description: 'Temple town associated with Lord Vishnu; a calm and rejuvenating place for devotees.',
      openingHours: '6:00 AM - 6:00 PM',
      image: 'https://tirumalatirupatiyatra.in/wp-content/uploads/2017/04/cropped-kalyana-venkateshwara-swamy-temple-puttur-narayanavanam.jpg',
    },
    {
      id: '25',
      name: 'Tiruttani Murugan Temple',
      distance: '95 km',
      location: 'Tiruttani',
      description: 'Hill temple dedicated to Lord Murugan with scenic views and a popular pilgrimage route.',
      openingHours: '5:00 AM - 8:00 PM',
      image: 'https://arunraj.org/wp-content/uploads/2025/02/tiruthani-murugan-temple.webp',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-400/80 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-900">SPIRITUAL DESTINATIONS</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Temples Nearby</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the sacred temples around Tirupati with ease. Rent a bike and visit these divine destinations at your own pace.
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Spiritual Journey</h2>
              <p className="text-gray-800">
                Book a bike now and explore all the temples at your convenience. We provide well-maintained bikes perfect for temple visits.
              </p>
            </div>
            <a
              href="https://wa.me/919393936773?text=Hi, I would like to book a bike for temple visits"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-semibold whitespace-nowrap"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {temples.map((temple) => (
            <div key={temple.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full flex items-center gap-1">
                  <Navigation size={14} />
                  {temple.distance}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{temple.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{temple.description}</p>

                <div className="bg-yellow-50 rounded-lg p-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <MapPin size={16} className="text-yellow-600 flex-shrink-0" />
                    <span className="font-semibold">{temple.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Navigation size={14} className="text-yellow-600 flex-shrink-0" />
                    <span>{temple.distance} from city center</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock size={16} className="text-yellow-600" />
                  <span>{temple.openingHours}</span>
                </div>

                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name + ' Tirupati')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-semibold"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Temple Visit Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-yellow-600 mb-3">Best Time to Visit</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early morning (5-8 AM) for peaceful darshan</li>
                <li>• Avoid weekends and festival days for shorter queues</li>
                <li>• Plan 2-3 hours for each major temple</li>
                <li>• Check temple timings before visiting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-600 mb-3">What to Carry</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Valid ID proof (mandatory)</li>
                <li>• Comfortable traditional clothing</li>
                <li>• Water bottle and light snacks</li>
                <li>• Umbrella or raincoat (during monsoon)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-600 mb-3">Parking Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Two-wheeler parking available at all temples</li>
                <li>• Parking fees: ₹10-20 per vehicle</li>
                <li>• Secure parking facilities provided</li>
                <li>• Follow temple parking guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-600 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Photography may be restricted inside temples</li>
                <li>• Dress modestly and respectfully</li>
                <li>• Remove footwear before entering</li>
                <li>• Maintain silence inside temple premises</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
