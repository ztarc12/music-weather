import { getWeatherIcon } from "@/util/getWeatherIcon"
import { getWeatherTitle } from "@/util/getWeatherTitle"

export default function WeeklyForecast({ forecast }) {
  // console.log('위클리', forecast)
  if(!forecast || !forecast.time || !Array.isArray(forecast.time)) {
    return <p>예보 데이터 불러오는 중...</p>
  }

  const forecastArray = forecast.time.map((time,index)=>({
    time,
    weathercode:forecast.weathercode[index] || 0,
    temperature_2m_max: forecast.temperature_2m_max[index] || 0,
    temperature_2m_min: forecast.temperature_2m_min[index] || 0
  }))

  if (forecastArray.length === 0) {
    return <p>예보 데이터가 없습니다.</p>
  }

  const weatherMessage = getWeatherTitle(forecast.weathercode[0])
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
            console.log('날씨 코드', date)
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