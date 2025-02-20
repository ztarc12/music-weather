import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect, useState } from "react";

export function useWeatherPlaylist(forecast) {
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(()=>{
      async function loadPlaylist(){
        if (!forecast || !forecast.weathercode) {
          setLoading(false)
          return
        }
        setLoading(true)
        const firstWeatherCode = forecast.weathercode[0]
        const query = getWeatherQuery(firstWeatherCode)
  
        try {
          const res = await fetch(
            `/api/spotify-playlist?weather=${encodeURIComponent(query)}&offset=${offset}`
          )
          if (!res.ok) {
            throw new Error('Spotify playlist fetch failed')
          }
          const data = await res.json()
          setPlaylist(data.playlists)
          console.log(data.playlists)
        } catch (error) {
          console.error('Error fetching Spotify playlist', error)
        } finally {
          setLoading(false)
        }
      }
      loadPlaylist()
    },[forecast, offset])
    useEffect(()=>{
      const intervalId = setInterval(() => {
        setOffset(prevOffset => parseInt(prevOffset) + 8)
      }, 10000)
      return () => clearInterval(intervalId)
    }, [])
    return {playlist, loading}
}