"use client"
import PlaylistArtists from "@/components/PlaylistArtists";
import WeatherPlaylist from "@/components/WeatherPlaylist";
import WeeklyForecast from "@/components/WeeklyForecast";
import { useWeatherStore } from "@/store/weatherStore";
import { getUserLocation } from "@/util/geolocation";
import { getWeatherIcon } from "@/util/getWeatherIcon";
import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect, useState } from "react";


export default function Home() {
  const { weeklyForecast, setWeeklyForecast } = useWeatherStore()
  const [ weatherImage, setWeatherImage ] = useState(null)

  useEffect(()=>{
    async function loadForecast() {
      try {
        const { latitude, longitude } = await getUserLocation()
        const res = await fetch(`/api/forecast?latitude=${latitude}&longitude=${longitude}`)
        if (!res.ok) {
          throw new Error('API 요청 실패')
        }
        const data = await res.json()
        if(data && data.daily) {
          setWeeklyForecast(data.daily)
          const firstWeatherCode = data.daily.weathercode[0]
          const query = getWeatherQuery(firstWeatherCode)

          const unsplashRes = await fetch(`/api/unsplash?query=${encodeURIComponent(query)}`)
          if (unsplashRes.ok) {
            const unsplashData = await unsplashRes.json()
            setWeatherImage(unsplashData.imageUrl)
          }
        }
      } catch (error) {
        console.error('위치 또는 날씨 예보를 가져오는 중 에러 발생',  error)
        const res = await fetch(`/api/forecast?latitude=37.5665&longitude=126.9780`)
        const data = await res.json()
        if (data && data.daily) {
          setWeeklyForecast(data.daily)
          const firstWeatherCode = data.daily.weathercode[0]
          const query = getWeatherQuery(firstWeatherCode)
          const unsplashRes = await fetch(`/api/unsplash?query=${encodeURIComponent(query)}`)
          if (unsplashRes.ok) {
            const unsplashData = await unsplashRes.json()
            setWeatherImage(unsplashData.imageUrl)
          }
        }
      }
    }
    loadForecast()
  }, [setWeeklyForecast])
  return (
    <div style={{height: '100vh' ,backgroundImage: weatherImage ? `url(${weatherImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-cover">
        <div className="main-cont">
          <WeeklyForecast forecast={weeklyForecast}/>
          <WeatherPlaylist forecast={weeklyForecast}/>   
          <PlaylistArtists forecast={weeklyForecast}/>
        </div>
      </div>
    </div>
  );
}
