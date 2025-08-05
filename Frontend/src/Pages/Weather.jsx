import React, { useState, useEffect } from 'react';
import Banner from '../Components/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style/Weather.css';
import WeatherCard from '../Components/weathercard'; 


const mockForecast = Array.from({ length: 30 }, (_, i) => {
  const dateObj = new Date(Date.now() + i * 86400000);
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const temperature = 25 + Math.floor(Math.random() * 10);
  const condition = ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)];

  return { day, date, temperature, condition };
});

const Weather = () => {
  const [location, setLocation] = useState('Rourkela');
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const data = mockForecast;
      setForecast(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
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
      <div className="container my-5">
        <h2 className="text-center mb-4" data-aos="fade-down">🌾 30-Day Weather Forecast</h2>
        
      

        <div className="row" data-aos="fade-up">
          {forecast.map((day, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <WeatherCard {...getCardProps(day)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;



