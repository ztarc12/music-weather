import { getWeatherIcon } from "@/util/getWeatherIcon"
import { getWeatherTitle } from "@/util/getWeatherTitle"

export default function WeeklyForecast({ forecast }) {
  const forecastArray = forecast.time.map((time,index)=>({
    time,
    weathercode:forecast.weathercode[index],
    temperature_2m_max: forecast.temperature_2m_max[index],
    temperature_2m_min: forecast.temperature_2m_min[index]
  }))
  const weatherMessage = getWeatherTitle(forecastArray[0].weathercode)
  if(!forecast || !forecastArray) {
    return <p>예보 데이터 불러오는 중...</p>
  }
  return(
    <div className="weather-cont">
      <h2 className="content-title">
        {weatherMessage}
        <br/>
        날씨에 맞는 음악 추천해드릴게요
      </h2>
      <ul className="weather-container">
        {
          forecastArray.map((date, index)=>{
            return(
              <li key={index} className="card-weather">
                <div className="date">
                  <span className="date-title">{date.time}</span>
                </div>
                <div><i className={`wi ${getWeatherIcon(date.weathercode)} icons`}/></div>
                <div>
                  <h3 className="temper">
                    <span className="max-temper">{Math.round(date.temperature_2m_max)}</span> / <span className="min-temper">{Math.round(date.temperature_2m_min)}</span>
                  </h3>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}