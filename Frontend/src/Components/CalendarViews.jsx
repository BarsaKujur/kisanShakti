import React from "react";

const CalendarViews = ({ crop }) => {
  const stages = [
    { stage: "Sowing", date: "Aug 15" },
    { stage: "Fertilizing", date: "Sep 10" },
    { stage: "Harvesting", date: "Nov 20" },
  ];

  return (
    <div className="border rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">🌱 Timeline for {crop}</h3>
      <ul className="list-disc pl-6">
        {stages.map((s, idx) => (
          <li key={idx}>
            {s.stage} - {s.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarViews;
