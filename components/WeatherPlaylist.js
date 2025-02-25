"use client"

import { useSpotifyMusic } from "@/hooks/useSpotifyMisic"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"

export default function WeatherPlaylist({ forecast }){
  const playlistState = useMemo(
    () => (state) => ({
      playlists: state.playlists
    }), []
  )
  const { playlists } = useWeatherSpotifyStore(useShallow(playlistState))
  console.log("플레이리스트",playlists)
  // const { loadingPlaylists } = useSpotifyMusic(forecast)
  
  // if (loadingPlaylists) return <p>플레이리스트를 불러오는 중...</p>
  if(!playlists || !playlists.items || playlists.items.length === 0) return <p>날씨에 맞는 플레이리스트를 찾지 못했습니다.</p>
  return (
    <div className="playlist-cont">
      <h2 className="content-title">오늘 날씨에 맞는 플레이리스트</h2>
      <ul className="playlist-container">
        {
          playlists.items.filter(item => item).map((item)=>{
            // console.log(item)
            // console.log(playlist)
            return(
              <li key={item.id} className="card-playlist">
                <img src={item.images?.[0]?.url || '/default-image.png'} className="playlist-image"/>
                <div className="playlist-overlay">
                  <h3 className="playlist-title">{item.name}</h3>
                  {/* <p className="description">
                    {item.description}
                  </p> */}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}