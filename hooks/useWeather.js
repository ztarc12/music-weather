"use client"

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { filterForecast } from "@/util/filterForecast";
import { getUserLocation } from "@/util/geolocation";
import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect } from "react";

export function useWeather(){
  const { weeklyForecast, weatherImage, setWeeklyForecast, setWeatherImage } = useWeatherSpotifyStore()

  useEffect(()=>{

      async function loadForecast(extraDays = 0) {
        try {
          const { latitude, longitude } = await getUserLocation()
          const res = await fetch(`/api/forecast?latitude=${latitude}&longitude=${longitude}&days=${7 + extraDays}`)
          if (!res.ok) {
            throw new Error('API 요청 실패')
          }
          const data = await res.json()
          if(data && data.daily) {
            setWeeklyForecast(data.daily)
            const filteredData = filterForecast(data.daily)

            if (filteredData.needMoreData) {
              await loadForecast(filteredData.needMoreData)
            } else {
              // console.log('10개 데이터 확보 완료')
            }

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
    }, [ setWeeklyForecast, setWeatherImage])

    return
}