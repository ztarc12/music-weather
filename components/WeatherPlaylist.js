"use client"

import { useWeatherArtists } from "@/hooks/useWeatherArtists"

export default function WeatherPlaylist({ forecast }){
  const { playlist, loading } = useWeatherArtists(forecast)

  if (loading) return <p>플레이리스트를 불러오는 중...</p>
  if(!playlist || !playlist.items || playlist.items.length === 0) return <p>날씨에 맞는 플레이리스트를 찾지 못했습니다.</p>
  console.log(playlist)
  return (
    <div className="playlist-cont">
      <h2 className="content-title">오늘 날씨에 맞는 플레이리스트</h2>
      <ul className="playlist-container">
        {
          playlist.items.filter(item => item).map((item)=>{
            console.log(item)
            console.log(playlist)
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