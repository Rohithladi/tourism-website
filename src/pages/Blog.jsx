// src/pages/TravelBlogPage.jsx
import React, { useState } from 'react';
import bgImage from '../images/bg.jpg'; // Background image

// Sample articles with images and more content
const articles = [
  {
    id: 1,
    title: '10 Tips for Traveling on a Budget',
    category: 'Budget Travel',
    snippet: 'Discover how to explore the world without breaking the bank with these essential tips.',
    content: 'Full article content for 10 Tips for Traveling on a Budget... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt, augue ac vestibulum euismod, justo ligula malesuada libero, vitae tempor erat odio eu massa. Here are the tips you can follow: 1. Plan ahead. 2. Use public transport. 3. Stay in hostels.',
    imageUrl: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    title: 'The Best Destinations for 2024',
    category: 'Travel Guides',
    snippet: 'Explore the top travel destinations you should visit in 2024.',
    content: 'Full article content for The Best Destinations for 2024... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam nunc eu nulla aliquam, sit amet sagittis ligula fringilla. Consider visiting: Bali, Japan, and Greece for their stunning views.',
    imageUrl: 'https://source.unsplash.com/featured/?travel,destinations',
  },
  {
    id: 3,
    title: 'How to Pack Like a Pro',
    category: 'Packing Tips',
    snippet: 'Learn the secrets to packing efficiently for your travels.',
    content: 'Full article content for How to Pack Like a Pro... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel risus nec nisi vestibulum tincidunt. Follow these packing tips: 1. Make a list. 2. Roll your clothes. 3. Use packing cubes.',
    imageUrl: 'https://i.ytimg.com/vi/SFtDYVNo-4s/maxresdefault.jpg',
  },
  {
    id: 4,
    title: 'Solo Travel: Embrace the Adventure',
    category: 'Solo Travel',
    snippet: 'Discover the joys and challenges of traveling alone.',
    content: 'Full article content for Solo Travel: Embrace the Adventure... Traveling solo can be a liberating experience. Explore your destination at your own pace, meet new people, and enjoy solitude. Always stay aware of your surroundings and plan your itinerary in advance.',
    imageUrl: 'https://source.unsplash.com/featured/?solo,travel',
  },
  {
    id: 5,
    title: 'Culinary Delights Around the World',
    category: 'Food & Travel',
    snippet: 'A journey through the best culinary experiences worldwide.',
    content: 'Full article content for Culinary Delights Around the World... Experience the unique flavors of each culture. From Italian pasta to Japanese sushi, every country has something delicious to offer. Don’t forget to try street food for authentic tastes!',
    imageUrl: 'https://source.unsplash.com/featured/?food,travel',
  },
  {
    id: 6,
    title: 'Eco-Friendly Travel Tips',
    category: 'Sustainable Travel',
    snippet: 'How to travel responsibly and minimize your impact on the environment.',
    content: 'Full article content for Eco-Friendly Travel Tips... Sustainable travel is more important than ever. Use reusable bottles, avoid single-use plastics, and support local businesses. Choose eco-friendly accommodations and respect wildlife.',
    imageUrl: 'https://source.unsplash.com/featured/?eco,friendly,travel',
  },
  {
    id: 7,
    title: 'Top 5 Hiking Trails in the U.S.',
    category: 'Adventure Travel',
    snippet: 'Explore breathtaking hiking trails across the United States.',
    content: 'Full article content for Top 5 Hiking Trails in the U.S.... Discover these trails: 1. Appalachian Trail. 2. Pacific Crest Trail. 3. Zion National Park. 4. Grand Canyon. 5. Yellowstone. Always check weather conditions and carry essential gear.',
    imageUrl: 'https://source.unsplash.com/featured/?hiking,travel',
  },
  {
    id: 8,
    title: 'Family-Friendly Travel Destinations',
    category: 'Family Travel',
    snippet: 'Best places to travel with kids for a memorable family vacation.',
    content: 'Full article content for Family-Friendly Travel Destinations... Traveling with children can be rewarding. Consider visiting theme parks, beaches, and national parks. Remember to plan activities suitable for all ages!',
    imageUrl: 'https://source.unsplash.com/featured/?family,travel',
  },
  {
    id: 9,
    title: 'Traveling with Pets: Tips and Tricks',
    category: 'Traveling with Pets',
    snippet: 'Learn how to travel with your furry friends safely and comfortably.',
    content: 'Full article content for Traveling with Pets: Tips and Tricks... Taking your pet on vacation can be rewarding. Here are some tips: 1. Plan pet-friendly accommodations. 2. Pack necessary supplies. 3. Keep your pet calm during travel.',
    imageUrl: 'https://source.unsplash.com/featured/?pets,travel',
  },
  {
    id: 10,
    title: 'The Art of Travel Photography',
    category: 'Photography',
    snippet: 'Capture your travel experiences with stunning photography.',
    content: 'Full article content for The Art of Travel Photography... Photography can enhance your travel memories. Here are some tips: 1. Use natural light. 2. Capture candid moments. 3. Experiment with angles and compositions.',
    imageUrl: 'https://source.unsplash.com/featured/?travel,photography',
  },
  {
    id: 11,
    title: 'Volunteering While Traveling',
    category: 'Volunteering',
    snippet: 'Make a difference while exploring new cultures and communities.',
    content: 'Full article content for Volunteering While Traveling... Combining travel with volunteer work can be fulfilling. Look for local organizations in your destination where you can lend a hand.',
    imageUrl: 'https://source.unsplash.com/featured/?volunteer,travel',
  },
  {
    id: 12,
    title: 'Must-Have Apps for Travelers',
    category: 'Travel Tech',
    snippet: 'Stay organized and informed with these essential travel apps.',
    content: 'Full article content for Must-Have Apps for Travelers... Technology can make travel easier. Consider downloading apps for navigation, language translation, and accommodation booking.',
    imageUrl: 'https://source.unsplash.com/featured/?travel,technology',
  },
  {
    id: 13,
    title: 'Cultural Etiquette: What You Need to Know',
    category: 'Cultural Tips',
    snippet: 'Navigate cultural differences with ease and respect.',
    content: 'Full article content for Cultural Etiquette: What You Need to Know... Understanding cultural norms can enhance your travel experience. Research local customs, greetings, and dining etiquette before your trip.',
    imageUrl: 'https://source.unsplash.com/featured/?culture,travel',
  },
  {
    id: 14,
    title: 'Traveling During the Off-Season',
    category: 'Travel Tips',
    snippet: 'Discover the benefits of traveling during less crowded times.',
    content: 'Full article content for Traveling During the Off-Season... Traveling during the off-season can save you money and provide a more relaxed experience. Explore destinations without the crowds!',
    imageUrl: 'https://source.unsplash.com/featured/?off-season,travel',
  },
  {
    id: 15,
    title: 'The Joy of Road Trips',
    category: 'Road Travel',
    snippet: 'Plan your next adventure on the open road.',
    content: 'Full article content for The Joy of Road Trips... Road trips can be a fun way to explore new places. Plan your route, pack snacks, and enjoy the journey as much as the destination!',
    imageUrl: 'https://source.unsplash.com/featured/?road,trip',
  },
  {
    id: 16,
    title: 'Exploring Local Markets',
    category: 'Cultural Experiences',
    snippet: 'Immerse yourself in the local culture through markets.',
    content: 'Full article content for Exploring Local Markets... Visiting local markets can provide insight into the culture. Enjoy fresh produce, handmade crafts, and authentic street food.',
    imageUrl: 'https://source.unsplash.com/featured/?local,market,travel',
  },
  
  
];

const TravelBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter((article) => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set background image
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Background overlay */}

      <h1 className="text-5xl font-bold mb-4 text-white relative z-10 text-center">
        Travel Blog
      </h1>
      <p className="text-lg text-gray-300 mb-8 relative z-10 text-center">
        Your source for travel tips, guides, and stories!
      </p>

      <input
        type="text"
        placeholder="Search articles..."
        className="mt-4 mb-8 px-4 py-2 rounded-lg border border-gray-300 relative z-10 w-3/4 sm:w-1/2 lg:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 p-4">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 max-w-xs mx-auto">
            <img src={article.imageUrl} alt={article.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-gray-700 mb-2">{article.snippet}</p>
              <button
                onClick={() => handleReadMore(article)}
                className="text-blue-500 hover:underline"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying full article content */}
      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto transition-opacity duration-300">
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
            <button
              onClick={handleClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelBlogPage;
