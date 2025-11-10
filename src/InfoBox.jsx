import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import './InfoBox.css'

function InfoBox({info}) {


    let HOT_URL='https://images.unsplash.com/photo-1572246538688-3f326dca3951?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'

    let COLD_URL='https://plus.unsplash.com/premium_photo-1670493556860-13e006e6faa4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
    let RAIN_URL='https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFpbnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600'

  return (
    <div className='cardContainer'>
      <Card className='Card' sx={{ maxWidth: 345 }} >
      <CardMedia 
        sx={{ height: 140 }}
        image={
         info.humidity >80 
          ? RAIN_URL 
          :info.temp > 15
          ? HOT_URL 
          : COLD_URL
        }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city} &nbsp;
          {
          info.humidity > 80 
          ?<ThunderstormIcon/>
          :info.temp > 15
          ? <SunnyIcon/>
          : <AcUnitIcon/>
          }
          
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"} >
          <p>Temperature: {info.temp}&deg;C</p>
          <p>Humidity: {info.humidity}</p>
          <p>Pressure: {info.pressure}</p>
          <p>Max Temperature: {info.temp_max}</p>
          <p>Min Temperature: {info.temp_min}</p>
          <p>The weather <i>{info.weather}</i> feels like {info.feels_like}</p>
        </Typography>
      </CardContent>
     
    </Card>
 </div>
  )
}

export default InfoBox
