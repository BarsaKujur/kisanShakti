import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

const useWeatherData = (location) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location).then(setWeather);
    }
  }, [location]);

  return weather;
};

export default useWeatherData;