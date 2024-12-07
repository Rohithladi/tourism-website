import React from 'react';

const HotelSelection = ({ hotelOptions, selectedHotel, setSelectedHotel, calculateTotalPrice, handleNextStep, handlePrevStep }) => {
  const handleChange = (e) => {
    setSelectedHotel(e.target.value);
    calculateTotalPrice();
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Select Hotel</h2>
      <select value={selectedHotel} onChange={handleChange} className="border p-2 w-full mt-2" required>
        <option value="">Choose a hotel</option>
        {hotelOptions.map((hotel) => (
          <option key={hotel.id} value={hotel.name}>{hotel.name} - ${hotel.price}</option>
        ))}
      </select>
      <div className="mt-4">
        <button onClick={handlePrevStep} className="mr-2 bg-gray-300 p-2">Back</button>
        <button onClick={handleNextStep} className="bg-green-500 text-white p-2">Next</button>
      </div>
    </div>
  );
};

export default HotelSelection;
