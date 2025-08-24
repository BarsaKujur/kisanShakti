import React, { useState, useEffect } from 'react';
import './Styles/CropCalendar.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const cropStages = ['🌱 Sowing', '🌿 Growing', '🌾 Harvesting', '🧺 Post-harvest'];

const getSeasonClass = (monthIndex) => {
  if (monthIndex <= 1) return 'season-winter';
  if (monthIndex <= 4) return 'season-spring';
  if (monthIndex <= 7) return 'season-monsoon';
  if (monthIndex <= 10) return 'season-harvest';
  return 'season-festive';
};

const generateYearData = (year) => {
  return months.map((month, mIndex) => {
    const daysInMonth = new Date(year, mIndex + 1, 0).getDate();
    const firstDay = new Date(year, mIndex, 1).getDay();
    const seasonClass = getSeasonClass(mIndex);
    const days = [...Array(daysInMonth)].map((_, i) => {
      const dateObj = new Date(year, mIndex, i + 1);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      return {
        date: i + 1,
        dayName,
        cropStage: cropStages[Math.floor(Math.random() * cropStages.length)],
        reminders: [],
        festival: (month === 'August' && i + 1 === 15) ? '🇮🇳 Independence Day' : null,
      };
    });
    return { month, year, firstDay, seasonClass, days };
  });
};

function CalendarView() {
  const [calendarData, setCalendarData] = useState(generateYearData(2025));
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newReminder, setNewReminder] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [animate, setAnimate] = useState(false);

  const selectedMonthData = calendarData[selectedMonthIndex];

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(timeout);
  }, [selectedMonthIndex]);

  const handleAddOrEditReminder = () => {
    if (!newReminder.trim()) return;
    setCalendarData(prev =>
      prev.map((month, idx) =>
        idx === selectedMonthIndex
          ? {
              ...month,
              days: month.days.map(day =>
                day.date === selectedDate
                  ? {
                      ...day,
                      reminders: editingIndex !== null
                        ? day.reminders.map((r, i) =>
                            i === editingIndex ? newReminder : r
                          )
                        : [...day.reminders, newReminder],
                    }
                  : day
              ),
            }
          : month
      )
    );
    setNewReminder('');
    setSelectedDate(null);
    setEditingIndex(null);
  };

  const handleDeleteReminder = (date, index) => {
    setCalendarData(prev =>
      prev.map((month, idx) =>
        idx === selectedMonthIndex
          ? {
              ...month,
              days: month.days.map(day =>
                day.date === date
                  ? {
                      ...day,
                      reminders: day.reminders.filter((_, i) => i !== index),
                    }
                  : day
              ),
            }
          : month
      )
    );
  };

  const openEditModal = (date, index, text) => {
    setSelectedDate(date);
    setNewReminder(text);
    setEditingIndex(index);
  };

  return (
    <div className="calendar-container">
      <h4 className="mb-4 text-success">📅 Crop Calendar – 2025</h4>

      <div className="dropdown-row mb-4">
        <select
          className="form-select w-auto me-3"
          value={selectedMonthIndex}
          onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
        >
          {months.map((month, idx) => (
            <option key={month} value={idx}>{month}</option>
          ))}
        </select>
        <span className="text-muted">Year: 2025</span>
      </div>

      <div className={`month-section mb-5 ${selectedMonthData.seasonClass} ${animate ? 'fade-in' : ''}`}>
        <h5 className="text-primary">{selectedMonthData.month}</h5>
        <div className="weekday-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-cell">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {[...Array(selectedMonthData.firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="calendar-cell empty-cell" />
          ))}
          {selectedMonthData.days.map(day => (
            <div
              key={day.date}
              className={`calendar-cell pastel-${(day.date % 5) + 1}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="date-number">{day.date}</div>
              <div className="day-name">{day.dayName}</div>
              <div className="crop-stage">{day.cropStage}</div>
              {day.festival && (
                <div className="festival-badge">{day.festival}</div>
              )}
              {day.reminders.map((reminder, idx) => (
                <div key={idx} className="reminder-badge">
                  {reminder}
                  <span
                    className="edit-icon"
                    onClick={e => {
                      e.stopPropagation();
                      openEditModal(day.date, idx, reminder);
                    }}
                  >
                    ✏️
                  </span>
                  <span
                    className="delete-icon"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteReminder(day.date, idx);
                    }}
                  >
                    🗑️
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedDate !== null && (
        <div className="reminder-modal">
          <div className="modal-content">
            <h5>
              {editingIndex !== null
                ? `Edit Reminder for ${selectedMonthData.month} ${selectedDate}`
                : `Add Reminder for ${selectedMonthData.month} ${selectedDate}`}
            </h5>
            <input
              type="text"
              value={newReminder}
              onChange={e => setNewReminder(e.target.value)}
              placeholder="e.g. Spray neem oil"
              className="form-control mb-2"
            />
            <button className="btn btn-success me-2" onClick={handleAddOrEditReminder}>
              {editingIndex !== null ? 'Update' : 'Add'}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setSelectedDate(null);
                setNewReminder('');
                setEditingIndex(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
