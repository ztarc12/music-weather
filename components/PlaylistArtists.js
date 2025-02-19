"use client"

import { useWeatherArtists } from "@/hooks/useWeatherArtists"

export default function PlaylistArtists({ forecast }){
  const { artists, loading } = useWeatherArtists(forecast)
  // console.log(artists)

  if (loading) return <p>가수를 불러오는 중...</p>
  if (!artists || artists.length === 0) return <p>플레이리스트에 아티스트 정보가 없습니다.</p>
  return (
    <div>
      <h2 className="content-title">
        어떤 가수가 노래를 불렀을까요?
      </h2>
      <div>
        {artists.map((artist)=>{
          return (
            <div key={artist.id}>
              <img src={artist.images?.[0]?.url || "/default-artist.png"} alt={artist.name}/>
              <div>
                <h3>{artist.name}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}