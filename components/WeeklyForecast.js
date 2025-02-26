import { getWeatherIcon } from "@/util/getWeatherIcon"
import { getWeatherTitle } from "@/util/getWeatherTitle"

export default function WeeklyForecast({ forecast }) {
  const weatherMessage = getWeatherTitle(forecast.weathercode[0])
  console.log(forecast.time)
  if(!forecast || !forecast.time) {
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
          forecast.time.map((date, index)=>{
            return(
              <li key={index} className="card-weather">
                <div className="date">
                  <span className="date-title">{date}</span>
                </div>
                <div><i className={`wi ${getWeatherIcon(forecast.weathercode[index])} icons`}/></div>
                <div>
                  <h3 className="temper">
                    <span className="max-temper">{Math.round(forecast.temperature_2m_max[index])}</span> / <span className="min-temper">{Math.round(forecast.temperature_2m_min[index])}</span>
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