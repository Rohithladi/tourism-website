// StepIcon.js
import React from 'react';

function StepIcon({ step }) {
  // Define icons based on the step, for example
  const icons = [
    { icon: "🔷", label: "Personal Details" },
    { icon: "🧳", label: "Travel Details" },
    { icon: "💳", label: "Payment Details" },
    { icon: "✅", label: "Summary" }
  ];

  // Verify step index within bounds
  const currentIcon = icons[step - 1];
  if (!currentIcon) {
    return null; // Handle case where step is out of bounds
  }

  return (
    <div className="text-center">
      <div className="text-4xl">{currentIcon.icon}</div>
      <p className="text-lg font-semibold">{currentIcon.label}</p>
    </div>
  );
}

export default StepIcon;
