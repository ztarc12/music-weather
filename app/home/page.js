'use client'

import Footer from "@/components/Footer";
import PlaylistAlbums from "@/components/PlaylistAlbums";
import PlaylistArtists from "@/components/PlaylistArtists";
import SkeletonMain from "@/components/SkeletonMain";
import WeatherPlaylist from "@/components/WeatherPlaylist";
import WeeklyForecast from "@/components/WeeklyForecast";
import { useSpotifyMusic } from "@/hooks/useSpotifyMisic";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
export default function HomeContent() {
  useWeather()

  const waetherState = useMemo(
    () => (state) => ({
      weeklyForecast: state.weeklyForecast,
      weatherImage: state.weatherImage
    }), []
  )
  
  const { weeklyForecast, weatherImage } = useWeatherSpotifyStore(useShallow(waetherState))
  useSpotifyMusic(weeklyForecast)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  },[])

  if(loading) {
    return (
      <div className="main-section">
      <div style={{height: '40vh'}}>
        <div className="">
          <div className="main-cont">
            <SkeletonMain/>
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="main-section">
      <div style={{height: '40vh' ,backgroundImage: weatherImage ? `url(${weatherImage})`
      : 'none',backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-cover">
          <div className="main-cont">
            <WeeklyForecast forecast={weeklyForecast}/>
            <WeatherPlaylist forecast={weeklyForecast}/>   
            <PlaylistArtists forecast={weeklyForecast}/>
            <PlaylistAlbums forecast={weeklyForecast}/>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
}
