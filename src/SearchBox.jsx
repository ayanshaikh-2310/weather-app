import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBox({ updateInfo }) {

  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherInfo = async () => {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    // ⚠️ If response is not OK, throw error to trigger catch block
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

    console.log(result);
    return result;
  };

  const handleInput = (event) => {
    setCity(event.target.value);
    setError(false); // ✅ Error message hide when user types again
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false); // Reset error before new search

    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity(''); // Clear input after successful search
    } catch (err) {
      console.error(err);
      setError(true); // Show error message if city invalid
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

      {error && <p style={{ color: 'red', marginTop: '10px' }}>No Such Place Exists</p>}
    </div>
  );
}

export default SearchBox;
