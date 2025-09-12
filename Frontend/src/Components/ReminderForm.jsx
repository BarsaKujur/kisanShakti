import React, { useState } from "react";

const ReminderForm = ({ onAddReminder }) => {
  const [reminder, setReminder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminder.trim()) {
      onAddReminder(reminder);
      setReminder("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
      <input
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add reminder..."
        className="border rounded p-2 flex-1"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default ReminderForm;
