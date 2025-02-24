'use client'

import { useSpotifyMusic } from "@/hooks/useSpotifyMisic"
import { useWeather } from "@/hooks/useWeather"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useShallow } from 'zustand/shallow'

export default function Albums(){
  useSpotifyMusic()
  useWeather()
  console.log(useWeatherSpotifyStore())
  const { albums } = useWeatherSpotifyStore(useShallow((state) => ({ albums: state.albums })))
  
  console.log( albums )
  return (
    <div>
      <h1>앨범</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}