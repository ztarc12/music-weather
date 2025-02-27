"use client"

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { getUserLocation } from "@/util/geolocation";
import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect } from "react";

export function useWeather(){
  const { weeklyForecast, weatherImage, setWeeklyForecast, setWeatherImage } = useWeatherSpotifyStore()
  console.log("로드된 날씨 코드",weeklyForecast)

  useEffect(()=>{
    if (weeklyForecast || weatherImage) return;

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
            // console.log('날씨코드', firstWeatherCode)
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
    }, [weeklyForecast, weatherImage, setWeeklyForecast, setWeatherImage])

    return
}