import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import bgImage from '../images/bg.jpg'; // Background image
import { Link } from 'react-router-dom';
import ic from '../images/map.png';


const createIcon = () => {
  return new L.Icon({
    iconUrl: ic,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Smooth Scroll to Marker Hook
const ScrollToMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 10, {
      animate: true,
      duration: 2,
    });
  }, [position, map]);

  return null;
};

// Sample destinations with additional markers
const destinations = [
  {
    id: 1,
    title: 'Paris, France',
    description: 'The city of love, known for its iconic Eiffel Tower.',
    position: [48.8566, 2.3522],
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    title: 'Kyoto, Japan',
    description: 'A beautiful blend of ancient temples and modern culture.',
    position: [35.0116, 135.7681],
    image: 'https://example.com/kyoto.jpg',
  },
  {
    id: 3,
    title: 'New York, USA',
    description: 'A bustling metropolis, home to Times Square and Central Park.',
    position: [40.7128, -74.0060],
    image: 'https://example.com/new-york.jpg',
  },
  {
    id: 4,
    title: 'Sydney, Australia',
    description: 'Famous for the Opera House and stunning beaches.',
    position: [-33.8688, 151.2093],
    image: 'https://example.com/sydney.jpg',
  },
  {
    id: 5,
    title: 'Rio de Janeiro, Brazil',
    description: 'Known for its beaches, Carnival festival, and Christ the Redeemer statue.',
    position: [-22.9068, -43.1729],
    image: 'https://example.com/rio.jpg',
  },
  {
    id: 6,
    title: 'Cape Town, South Africa',
    description: 'A city surrounded by natural beauty, from Table Mountain to stunning beaches.',
    position: [-33.9249, 18.4241],
    image: 'https://example.com/cape-town.jpg',
  },
  {
    id: 7,
    title: 'Dubai, UAE',
    description: 'Known for its modern architecture, luxury shopping, and desert safaris.',
    position: [25.276987, 55.296249],
    image: 'https://example.com/dubai.jpg',
  },
];

const MapPage = () => {
  const [userPosition, setUserPosition] = useState(null);

  // Get user geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.error('Geolocation not supported or permission denied');
        }
      );
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }} // Set background image
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Background overlay */}

      <h1 className="text-5xl font-bold mb-6 text-white relative z-10 text-center">
        Explore Our Destinations
      </h1>
      <p className="text-lg text-gray-200 mb-8 relative z-10 text-center">
        Click on the markers to learn more about each amazing destination!
      </p>

      <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }} className="relative z-10 mb-8 rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {destinations.map((destination) => (
          <Marker key={destination.id} position={destination.position} icon={createIcon()}>
            <Popup>
              <strong>{destination.title}</strong><br />
              <img src={destination.image} alt={destination.title} className="w-full h-32 object-cover mb-2" />
              {destination.description}
            </Popup>
          </Marker>
        ))}
        {userPosition && <ScrollToMarker position={userPosition} />}
      </MapContainer>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10 relative z-10">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold p-4">{destination.title}</h2>
            <p className="p-4 text-gray-700">{destination.description}</p>
            <Link to={`/destinations/${destination.id}`} className="block bg-blue-500 text-white text-center py-2 hover:bg-blue-600 transition duration-300">
              Learn More
            </Link>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-20">
        <Link to="#top" className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
          ↑
        </Link>
      </div>

      {/* Explore Packages Button */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-white text-lg">Ready to plan your next adventure?</p>
        <Link to="/packages" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4 inline-block">
          Explore Packages
        </Link>
      </div>

      {/* Social Media Sharing */}
      <div className="fixed bottom-10 left-10 z-20 flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          F
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-300">
          T
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition duration-300">
          I
        </a>
      </div>
    </div>
  );
};

export default MapPage;
