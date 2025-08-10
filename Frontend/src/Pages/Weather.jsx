import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../Components/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style/Weather.css';
import WeatherCard from '../Components/weathercard';

const API_KEY = '4abcee7fe25fe64f912393582072f5c4'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const mockSuggestions = ['Rourkela', 'Bhubaneswar', 'Cuttack', 'Sambalpur', 'Balasore'];

const Weather = () => {
  const [location, setLocation] = useState('Rourkela');
  const [forecast, setForecast] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
    handleSearch();
  }, []);

  const handleSearch = async (loc) => {
    const searchLocation = (loc || inputValue || 'Rourkela').trim();
    setLocation(searchLocation);
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: searchLocation,
          units: 'metric',
          appid: API_KEY
        }
      });

      const rawData = response.data.list;
      if (!rawData || rawData.length === 0) {
        throw new Error('No forecast data returned from API');
      }

      const dailyData = rawData.filter((_, index) => index % 8 === 0).slice(0, 7);

      const formattedForecast = dailyData.map((entry) => {
        const dateObj = new Date(entry.dt * 1000);
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const temperature = Math.round(entry.main.temp);
        const condition = normalizeCondition(entry.weather[0].main);

        return { day, date, temperature, condition };
      });

      setForecast(formattedForecast);
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching weather data:', error.response?.data || error.message);
      setForecast([]);
      setError('Could not fetch forecast. Please check the location or try again.');
    } finally {
      setLoading(false);
    }
  };

  const normalizeCondition = (condition) => {
    switch (condition) {
      case 'Clear': return 'Sunny';
      case 'Clouds': return 'Cloudy';
      case 'Rain': return 'Rainy';
      case 'Thunderstorm': return 'Stormy';
      default: return condition;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = mockSuggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const getAlertAndTip = (condition, temp) => {
    if (condition === 'Sunny') {
      if (temp > 38) return {
        alert: { level: 'High', color: 'red', message: 'Extreme heat! Stay hydrated.' },
        tip: 'Water crops early morning or late evening to reduce evaporation.'
      };
      if (temp >= 30) return {
        alert: { level: 'Moderate', color: 'orange', message: 'Warm day. Good for drying crops.' },
        tip: 'Ideal time to harvest and sun-dry grains.'
      };
      return {
        alert: { level: 'Low', color: 'green', message: 'Pleasant weather. Ideal for field work.' },
        tip: 'Perfect for sowing and transplanting activities.'
      };
    }

    if (condition === 'Rainy') {
      return {
        alert: { level: 'Moderate', color: 'orange', message: 'Steady rain. Watch soil moisture.' },
        tip: 'Monitor soil saturation and delay fertilizer application.'
      };
    }

    if (condition === 'Cloudy') {
      return {
        alert: { level: 'Low', color: 'green', message: 'Overcast skies. Mild conditions.' },
        tip: 'Ideal for transplanting and low-stress crop activities.'
      };
    }

    if (condition === 'Stormy') {
      return {
        alert: { level: 'High', color: 'red', message: 'Thunderstorm warning! Stay indoors.' },
        tip: 'Avoid field work. Secure equipment and check livestock shelters.'
      };
    }

    return {
      alert: { level: 'Info', color: 'green', message: 'Weather is stable.' },
      tip: 'No specific action needed.'
    };
  };

  const getCardProps = (day) => {
    const { alert, tip } = getAlertAndTip(day.condition, day.temperature);

    const conditionMap = {
      Sunny: {
        image: '/images/sunny.jpg',
        animationClass: 'rotating-sun',
        gradientClass: 'sunny-gradient'
      },
      Rainy: {
        image: '/images/rainy.jpg',
        animationClass: 'raining',
        gradientClass: 'rainy-gradient'
      },
      Cloudy: {
        image: '/images/cloudy.jpg',
        animationClass: 'floating-cloud',
        gradientClass: 'cloudy-gradient'
      },
      Stormy: {
        image: '/images/stormy.jpg',
        animationClass: 'stormy-flash',
        gradientClass: 'stormy-gradient'
      }
    };

    const visual = conditionMap[day.condition] || {
      image: '/images/default.jpg',
      animationClass: '',
      gradientClass: ''
    };

    return {
      title: day.condition,
      temperature: day.temperature,
      image: visual.image,
      animationClass: visual.animationClass,
      gradientClass: visual.gradientClass,
      alert,
      farmingTip: tip,
      day: day.day,
      date: day.date
    };
  };

  return (
    <div>
      <Banner
        title="Weather Insights for Smarter Farming"
        description="Stay informed with hyperlocal forecasts and timely alerts. Plan your sowing, irrigation, and harvest with confidence—rain or shine."
        imageUrl="images/image11.jpg"
      />

      <h2 className="text-center mb-4" data-aos="fade-down">🌾 7-Day Weather Forecast</h2>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
          <div className="weather-search-bar">
            <div className="input-group">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Enter location"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="btn custom-search-btn" onClick={() => handleSearch()}>
                🔍 Search
              </button>
            </div>
            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100 mt-1 suggestion-list">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setInputValue(s);
                      handleSearch(s);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="text-end mt-2 mt-md-0">
            <h5>📍 Forecast for: <span className="text-primary">{location}</span></h5>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="row" data-aos="fade-up">
          {loading ? (
            <p>Loading forecast...</p>
          ) : forecast.length === 0 ? (
            <p>No forecast data available.</p>
          ) : (
            forecast.map((day, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <WeatherCard {...getCardProps(day)} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;