import React from "react";

const CalendarHeaderr = ({ crop, location }) => {
  return (
    <div className="p-4 bg-green-100 rounded-lg shadow flex justify-between items-center">
      <h2 className="text-xl font-semibold">📅 Crop Calendar for {crop}</h2>
      <p className="text-gray-600">Location: {location}</p>
    </div>
  );
};

export default CalendarHeaderr;
