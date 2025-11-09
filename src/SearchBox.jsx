import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css'

function SearchBox({updateInfo}) {

    let [city,setCity]=useState('')
    let [error,setError]=useState(false)

    let API_URL='https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


    let getWeatherInfo=async ()=>{
      try {

        let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        let jsonResponse=await response.json()

        let result={
          city:city,
          temp:jsonResponse.main.temp,
          temp_max:jsonResponse.main.temp_max,
          temp_min:jsonResponse.main.temp_min,
          humidity:jsonResponse.main.humidity,
          pressure:jsonResponse.main.pressure,
          feels_like:jsonResponse.main.feels_like,
          weather:jsonResponse.weather[0].description,
        }
        console.log(result)
        return result;
        
      } catch (error) {
        throw error;
      }
        
    }

    let handleInput=(event)=>{
        setCity(event.target.value)
    }

    let handleSumit=async (event)=>{

      try {
        event.preventDefault();
        console.log(city); 
        setCity('')  
        let newInfo= await getWeatherInfo(); 
        updateInfo(newInfo)
      } catch (error) {
        setError(true)
      }
       
    }

  return (
    <div className='Weather'>
      <form onSubmit={handleSumit}>
         <TextField 
         id="outlined-basic"
         label="Enter city" 
         variant="outlined" 
         value={city} 
         onChange={handleInput} />
        <br /><br />
         <Button variant="contained" type='submit'>Show Weather</Button>
      </form>
      {error && <p>No Such Place exists</p>}
    </div>
  )
}

export default SearchBox
