import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import { assets } from '../assets/assets'

const Weather = () => {

  const inputRef = useRef(null)

  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    '01d': assets.clear,
    '01n': assets.clear,
    '02d': assets.cloud,
    '02n': assets.cloud,
    '03d': assets.cloud,
    '03n': assets.cloud,
    '04d': assets.drizzle,
    '04n': assets.drizzle,
    '09d': assets.rain,
    '09n': assets.rain,
    '10d': assets.rain,
    '10n': assets.rain,
    '13d': assets.snow,
    '13n': assets.snow,
  }

  function handleSubmit(event) {

    if (event.keyCode === 13) {
      search(inputRef.current.value)
    }
  }

  async function search(city) {
    if (city === '') {
      alert('Enter city name')
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      console.log(data)

      // const icon = allIcons[data.weather.icon]
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || assets.clear
      })

      console.log(await weatherData)
    } catch (error) {
      setWeatherData(false)
      console.error(error)
    }
  };

  useEffect(() => {
    inputRef.current.focus()
    search('Saint Petersburg')
  }, [])

  return (
    <div className='weather'>

      {weatherData
        ? <>
          <img className='weather-icon' src={weatherData.icon || assets.clear} alt="" />
          <p className='temperature'>{weatherData.temperature || 1}°C</p>
          <p className='location'>{weatherData.location || 'Saint Petersburg'}</p>
          <div className="weather-data">

            <div className="col">
              <img src={assets.humidity} alt="" />
              <div className="">
                <p>{weatherData.humidity || '0'}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={assets.wind} alt="" />
              <div className="">
                <p>{weatherData.windSpeed || '0 '}km\h</p>
                <span>Wind speed</span>
              </div>
            </div>

          </div></>
        :
        <>Api error</>
      }

      <div className="search-bar">
        <input onKeyDown={handleSubmit} ref={inputRef} type="text" placeholder='Search' className="text" />
        <img onClick={() => search(inputRef.current.value)} src={assets.search} alt="" />
      </div>


    </div>
  )
}

export default Weather