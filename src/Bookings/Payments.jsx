import React, { useState, useEffect } from "react";

function PaymentDetails({ formData, handleChange }) {
  const [paymentMethod, setPaymentMethod] = useState(formData.paymentMethod || "");

  // Prevent unnecessary state updates inside useEffect
  useEffect(() => {
    // Only update if the fields are undefined or different from the current state
    if (formData.cardNumber === undefined) handleChange({ target: { name: "cardNumber", value: "" } });
    if (formData.expiryDate === undefined) handleChange({ target: { name: "expiryDate", value: "" } });
    if (formData.cvv === undefined) handleChange({ target: { name: "cvv", value: "" } });
    if (formData.debitCardNumber === undefined) handleChange({ target: { name: "debitCardNumber", value: "" } });
    if (formData.debitExpiryDate === undefined) handleChange({ target: { name: "debitExpiryDate", value: "" } });
    if (formData.debitCvv === undefined) handleChange({ target: { name: "debitCvv", value: "" } });
    if (formData.upiId === undefined) handleChange({ target: { name: "upiId", value: "" } });
  }, [formData, handleChange]); // Dependency array ensures effect only runs when formData changes

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    handleChange(e); // Call the parent's handleChange to update the formData
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">Payment Method</h2>
      <select
        name="paymentMethod"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select Payment Method</option>
        <option value="credit">Credit Card</option>
        <option value="debit">Debit Card</option>
        <option value="upi">UPI</option>
      </select>

      {/* Credit Card Details */}
      {paymentMethod === "credit" && (
        <div className="mt-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* Debit Card Details */}
      {paymentMethod === "debit" && (
        <div className="mt-4">
          <input
            type="text"
            name="debitCardNumber"
            placeholder="Debit Card Number"
            value={formData.debitCardNumber || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <input
            type="text"
            name="debitExpiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.debitExpiryDate || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <input
            type="text"
            name="debitCvv"
            placeholder="CVV"
            value={formData.debitCvv || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* UPI ID Details */}
      {paymentMethod === "upi" && (
        <div className="mt-4">
          <input
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            value={formData.upiId || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;
