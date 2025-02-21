"use client"

import { useCycleItems } from "@/hooks/useCycleItems"
import { useSpotifyMusic } from "@/hooks/useSpotifyMisic"

export default function WeatherPlaylist({ forecast }){
  const { playlists, loadingPlaylists } = useSpotifyMusic(forecast)
  const displayedPlaylist = useCycleItems(playlists, 10000, 8)
  if (loadingPlaylists) return <p>플레이리스트를 불러오는 중...</p>
  if(!playlists || !playlists.items || playlists.items.length === 0) return <p>날씨에 맞는 플레이리스트를 찾지 못했습니다.</p>
  // console.log(playlist)
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