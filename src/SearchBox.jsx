import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBox({ updateInfo }) {

  const [city, setCity] = useState('');

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherInfo = async () => {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    // ❌ Agar city galat ho, error throw kar do
    if (!response.ok) {
      throw new Error('City not found');
    }

    const jsonResponse = await response.json();

    const result = {
      city: city,
      temp: jsonResponse.main.temp,
      temp_max: jsonResponse.main.temp_max,
      temp_min: jsonResponse.main.temp_min,
      humidity: jsonResponse.main.humidity,
      pressure: jsonResponse.main.pressure,
      feels_like: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };

    return result;
  };

  const handleInput = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity(''); // ✅ Clear input after successful search
    } catch (err) {
      // ⚠️ Show alert popup on invalid city
      alert("⚠️ No Such Place Exists. Please enter a valid city name.");
      setCity('');
    }
  };

  return (
    <div className='Weather'>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={handleInput}
        />
        <br /><br />
        <Button variant="contained" type='submit'>Show Weather</Button>
      </form>
    </div>
  );
}

export default SearchBox;
