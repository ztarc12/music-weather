'use client'

import Menu from "@/components/Menu";
import PlaylistAlbums from "@/components/PlaylistAlbums";
import PlaylistArtists from "@/components/PlaylistArtists";
import WeatherPlaylist from "@/components/WeatherPlaylist";
import WeeklyForecast from "@/components/WeeklyForecast";
import { useSpotifyMusic } from "@/hooks/useSpotifyMisic";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";


export default function Home() {
  useWeather()
  const { weeklyForecast, weatherImage} = useWeatherSpotifyStore()
  useSpotifyMusic(weeklyForecast)
  return (
    <div className="main-section">
      <div style={{height: '40vh' ,backgroundImage: weatherImage ? `url(${weatherImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-cover">
          <Menu forecast={weeklyForecast}/>
          <div className="main-cont">
            <WeeklyForecast forecast={weeklyForecast}/>
            <WeatherPlaylist forecast={weeklyForecast}/>   
            <PlaylistArtists forecast={weeklyForecast}/>
            <PlaylistAlbums forecast={weeklyForecast}/>
          </div>
        </div>
      </div>
    </div>
  );
}
