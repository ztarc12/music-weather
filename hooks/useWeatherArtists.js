import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect, useState } from "react";

export function useWeatherArtists(forecast) {
  const [artists, setArtists] = useState([])
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)

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
            `/api/spotify-playlist?weather=${encodeURIComponent(query)}`
          )
          if (!res.ok) {
            throw new Error('Spotify playlist fetch failed')
          }
          const data = await res.json()
          setPlaylist(data.playlists)
          console.log(data.playlists)

          const allArtists = []
          if (data.playlists && Array.isArray(data.playlists.items)) {
            data.playlists.items.filter(item => item && item.track && item.track.artists).forEach((item) => {
              item.track.artists.forEach((artist) => {
                allArtists.push(artist)
                console.log('cex',allArtists)
              })
            })
          } else {
            console.error('api 응답에 items 가 없습니다.', data)
          }
          const uniqueArists = Array.from(
            new Map(allArtists.map((artist) => [artist.id, artist])).values()
          )
          console.log(uniqueArists)
          setArtists(uniqueArists)
        } catch (error) {
          console.error('Error fetching Spotify playlist', error)
        } finally {
          setLoading(false)
        }
      }
      loadPlaylist()
    },[forecast])
    return {artists, playlist, loading}
}