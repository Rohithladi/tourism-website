import React, { useState } from "react";
import StepIcon from "./Hotel";
import PersonalDetails from "./Personal";
import TravelDetails from "./Journey";
import PaymentDetails from "./Payments";
import Summary from "./Summarys";
import axios from "axios"; // Import axios to make API calls

function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    phone: "",
    guests: "1",
    checkIn: "",
    checkOut: "",
    travelType: "",
    journeyType: "",
    paymentMethod: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    const basePrice = 1000; // Base price per guest in INR
    const travelTypeMultiplier = formData.travelType === "luxury" ? 2 : 1;
    const journeyTypeMultiplier = formData.journeyType === "round-trip" ? 1.5 : 1;
    const totalPrice = basePrice * parseInt(formData.guests || 1) * travelTypeMultiplier * journeyTypeMultiplier;
    return totalPrice.toFixed(2);
  };

  const totalPrice = calculateTotalAmount(); // Calculate once and reuse

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (step === 4 && !isSubmitted) {
      try {
        const { cardNumber, expiryDate, cvv, debitCardNumber, debitExpiryDate, debitCvv, ...dataToSubmit } = formData;
  
        console.log("Data to submit:", dataToSubmit); 
        const response = await axios.post("http://localhost:8080/api/bookings", dataToSubmit);
        console.log("Booking saved:", response.data);
        setIsSubmitted(true); 
      } catch (error) {
        console.error("There was an error submitting the booking:", error);
      }
    } else if (step < 4 && !isSubmitted) {
      nextStep();
    }
  };
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData} // Pass setFormData as a prop
          />
        );
      case 2:
        return (
          <TravelDetails
            formData={formData}
            handleChange={handleChange}
            totalPrice={totalPrice} // Pass totalPrice as a prop
          />
        );
      case 3:
        return <PaymentDetails formData={formData} handleChange={handleChange} />;
      case 4:
        return       <Summary formData={formData} totalPrice={totalPrice} /> ; // Pass totalPrice as a prop
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
        <StepIcon step={step} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSubmitted ? (
            <Summary formData={formData} totalPrice={totalPrice} />
          ) : (
            renderStep()
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && !isSubmitted && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg"
              >
                Back
              </button>
            )}
            {step < 4 && !isSubmitted ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            ) : (
              !isSubmitted && (
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Confirm
                </button>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
