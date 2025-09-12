import React, { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import CalendarView from "../components/CalendarView";
import ProgressRing from "../components/ProgressRing";
import ReminderForm from "../components/ReminderForm";

const CropCalendar = () => {
  const [crop, setCrop] = useState("Paddy");
  const [location, setLocation] = useState("Ranchi");
  const [reminders, setReminders] = useState([]);

  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  return (
    <div className="p-6 space-y-6">
      <CalendarHeader crop={crop} location={location} />
      <ProgressRing progress={40} />
      <CalendarView crop={crop} />
      <ReminderForm onAddReminder={addReminder} />
      <ul className="list-disc pl-6">
        {reminders.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default CropCalendar;
