import axios from 'axios'

const APIkey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
  )
  return request.then(response => response.data)
}

export default getWeather