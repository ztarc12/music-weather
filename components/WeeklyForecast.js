import { getWeatherIcon } from "@/util/getWeatherIcon"
import { getWeatherTitle } from "@/util/getWeatherTitle"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function WeeklyForecast({ forecast }) {
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
      <Swiper
        className="weather-container"
        slideToClickedSlide={true}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={4} 
        breakpoints={{
          500: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {forecastArray.map((date, index) => (
          <SwiperSlide key={index} className="card-weather">
              <div className="date">
                <span className="date-title">{date.time}</span>
              </div>
              <div>
                <i className={`wi ${getWeatherIcon(date.weathercode)} icons`} />
              </div>
              <div>
                <h3 className="temper">
                  <span className="max-temper">{Math.round(date.temperature_2m_max)}</span> /{" "}
                  <span className="min-temper">{Math.round(date.temperature_2m_min)}</span>
                </h3>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}