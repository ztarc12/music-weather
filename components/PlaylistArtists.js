"use client"

import { useWeatherArtists } from "@/hooks/useWeatherArtists"

export default function PlaylistArtists({ forecast }){
  const { artists, loading } = useWeatherArtists(forecast)
  // console.log(artists)

  if (loading) return <p>가수를 불러오는 중...</p>
  if (!artists || artists.length === 0) return <p>플레이리스트에 아티스트 정보가 없습니다.</p>
  return (
    <div className="artists-cont">
      <h2 className="content-title">
        관련된 노래를 누가 불렀을까요?
      </h2>
      <ul className="artists-container">
        {artists.map((artist)=>{
            return (
              <li key={artist.id} className="card-artists">
                <img src={artist.images?.[0]?.url || "/default-artist.png"} alt={artist.name} className="artists-image"/>
                <div className="artists-overlay">
                  <h3 className="artists-title">{artist.name}</h3>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}