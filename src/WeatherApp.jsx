import React, { use, useState } from 'react'
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';

function WeatherApp() {

  const [weatherInfo,setWeatherInfo]=useState({
        city:"Delhi",
        feels_like: 23.89,
        humidity: 53,
        pressure: 1010,
        temp: 24.05,
        temp_max: 24.05,
        temp_min: 24.05,
        weather:"haze",
  }) 

    let updateInfo=(result)=>{
      setWeatherInfo(result)
    }

  return (
    <div>
        <h1 style={{textAlign:"center"}}>WeatherApp by delta</h1>
       <SearchBox updateInfo={updateInfo}/>
       <InfoBox info={weatherInfo}/>
    </div>
  )
}

export default WeatherApp
