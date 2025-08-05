const API_KEY = 'KEY_WEATHER';

export const fetchWeatherData = async (location) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
  const data = await response.json();

  const temperature = data.main.temp;
  const rainfall = data.rain ? data.rain['1h'] || data.rain['3h'] : 0;

  return { temperature, rainfall };
};