import React, { useState } from 'react';

const sampleBusinesses = [
  {
    name: 'Mo:Mo House',
    rating: 4.5,
    location: 'Burnaby, BC',
    tags: ['Nepali', 'Vegan Friendly'],
    contact: '+1 604-555-1234',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Taste of Himalaya',
    rating: 4.2,
    location: 'Toronto, ON',
    tags: ['Traditional', 'Family Friendly'],
    contact: '+1 416-555-9876',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Everest Eats',
    rating: 4.8,
    location: 'Calgary, AB',
    tags: ['Catering', 'Mo:Mo', 'Buffet'],
    contact: '+1 403-555-3344',
    image: 'https://via.placeholder.com/150'
  }
];

export default function NepaliBusinessListing() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [filtered, setFiltered] = useState(sampleBusinesses);

  const handleSearch = () => {
    const results = sampleBusinesses.filter(
      b =>
        b.name.toLowerCase().includes(category.toLowerCase()) &&
        b.location.toLowerCase().includes(location.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">🍛 Top Nepali Businesses Near You</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search category (e.g., Restaurant)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Enter location (e.g., Vancouver, BC)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((biz, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={biz.image} alt={biz.name} className="w-full h-40 object-cover rounded mb-3" />
            <h2 className="text-xl font-semibold text-gray-800">{biz.name}</h2>
            <div className="text-sm text-gray-600 mb-1">⭐ {biz.rating} | 📍 {biz.location}</div>
            <div className="text-sm text-gray-600 mb-1">📞 {biz.contact}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {biz.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
