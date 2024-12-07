// src/pages/Packages.jsx
import React from 'react';

const packages = [
  {
    id: 1,
    title: 'Beach Paradise',
    description: 'Relax in the sun with our exclusive beach getaway packages.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJlYWNoJTIwcGFyYWRpc2UlMjB0cmF2ZWx8ZW58MHx8fHwxNjcwMDY1NTM0&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    id: 2,
    title: 'Mountain Adventure',
    description: 'Explore the great outdoors with our thrilling mountain trips.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3igLnW4CSFMRze8QvXroNtsLBTKWnm77s3g&s',
  },
  {
    id: 3,
    title: 'City Explorer',
    description: 'Discover vibrant city life with our urban travel packages.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGNhcGl0YWwlMjBjaXR5fGVufDB8fHx8MTY3MDA2NTczMw&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    id: 4,
    title: 'Adventure Seeker',
    description: 'Experience adrenaline-pumping activities and adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDh8fGFkdGVudHVyZSUyMHBhY2thZ2V8ZW58MHx8fHwxNjcwMDY1Nzc5&ixlib=rb-1.2.1&q=80&w=400',
  },
];

const Packages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100 py-12">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
        Exciting Travel Packages
      </h1>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-60 object-cover transition duration-300 hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{pkg.title}</h2>
                  <p className="text-gray-300 mt-1">{pkg.description}</p>
                  <button className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
