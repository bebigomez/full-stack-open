import { useEffect, useState } from 'react'
import getWeather from '../services/weather'

const WeatherSection = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      getWeather(city)
        .then(response => {
          setWeatherInfo(response)
      })
    }

    fetchData()
  }, [])

  return (
    <>
      {weatherInfo && (
        <div>
          <div>Temperature: {(weatherInfo.main.temp - 273.15).toFixed(2)} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            style={{ maxWidth: '200px' }}
          />
          <div>Wind: {weatherInfo.wind.speed} m/s</div>
        </div>
      )}
    </>
  )
}

export default WeatherSection
