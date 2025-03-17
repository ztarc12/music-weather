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
      {/* <ul className="weather-container">
        {
          forecastArray.map((date, index)=>{
            // console.log('날씨 코드', date)
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
      </ul> */}
      <Swiper
        className="weather-container"
        slideToClickedSlide={true}  // 콘텐츠 클릭 시 해당 슬라이드로 이동
        grabCursor={true}           // 마우스 커서 변경 (드래그 가능하다는 힌트)
        spaceBetween={10}
        slidesPerView={4}           // 기본 슬라이드 개수 (원하는 대로 조정)
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
          <SwiperSlide key={index}>
            <div className="card-weather">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}