"use client"

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import Player from "./Player"

export default function PlayerWrapper(){
    const { isPlayerVisible } = useWeatherSpotifyStore()
    return isPlayerVisible ? <Player/> : null
}