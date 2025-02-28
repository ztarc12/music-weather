'use client'

import PlaylistAlbums from "@/components/PlaylistAlbums";
import PlaylistArtists from "@/components/PlaylistArtists";
import WeatherPlaylist from "@/components/WeatherPlaylist";
import WeeklyForecast from "@/components/WeeklyForecast";
import { useSpotifyMusic } from "@/hooks/useSpotifyMisic";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { filterForecast } from "@/util/filterForecast";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";


export default function Home() {
  useWeather()

  const waetherState = useMemo(
    () => (state) => ({
      weeklyForecast: state.weeklyForecast,
      weatherImage: state.weatherImage
    }), []
  )
  
  const { weeklyForecast, weatherImage } = useWeatherSpotifyStore(useShallow(waetherState))
  // console.log("현재 날씨",weeklyForecast)
  // console.log('현재 이미지', weatherImage)

  const filteredForecast = useMemo(()=>{
    return weeklyForecast ? filterForecast(weeklyForecast) : null
  },[weeklyForecast])

  useSpotifyMusic(filteredForecast)
  // useSpotifyMusic(weeklyForecast)

  return (
    <div className="main-section">
      <div style={{height: '40vh' ,backgroundImage: weatherImage ? `url(${weatherImage})`
      : 'none',backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-cover">
          <div className="main-cont">
            <WeeklyForecast forecast={filteredForecast}/>
            <WeatherPlaylist forecast={filteredForecast}/>   
            <PlaylistArtists forecast={filteredForecast}/>
            <PlaylistAlbums forecast={filteredForecast}/>
          </div>
        </div>
      </div>
    </div>
  );
}
