'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailPlaylists(){
  const { id } = useParams()
  const [detailPlaylistsData, setDetailPlaylistsData]  = useState(null)
  const [loading, setLoading] = useState(true)
  const [weatherDate, setWeatherData] = useState(null)

  useEffect(()=>{
    if(!id) return;
    async function fetchPlaylist(){
      try {
        const res = await fetch(`/api/spotify-playlist-tracks?playlistId=${id}`)
        if(!res.ok) {
          throw new Error("플레이리스트 상세 데이터를 불러오는데 실패했습니다.")
        }
        const data = await res.json()
        setDetailPlaylistsData(data)
        
      } catch (error) {
        console.log('Error fetching playlist detail', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylist()
  },[id])
  console.log('상세 플레이리스트', detailPlaylistsData)
  if(loading) return <p>불러오는 중...</p>
  if(!detailPlaylistsData) return <p>데이터를 찾을수 없습니다.</p>
  return (
    <div className="main-cont">
      <h1>플레이리스트</h1>
      <div className="info-box">
        <div className="image-grid">
          {detailPlaylistsData.items.slice(0, 4).map((item)=>{
            if(!item || !item.track) return null;
            return (
              <img key={item.track.id} src={item.track.album.images?.[0]?.url}/>
            )
          })}
        </div>
        <div className="info-text">
          <h2>설명글</h2>
        </div>
      </div>
      <ul className="playlist-track-box">
        {detailPlaylistsData?.items.map((item, index)=>{
          return(
            <li key={index} className="playlist-track">
              <img src={item.track.album.images?.[0]?.url}/>
              <h4 className="name-artist">
                {item.track.name}
                <span className="artist">{item.track.artists.map((artist) => artist.name).join(', ')}</span>
              </h4>
            </li>
          )
        })}
      </ul>
    </div>
  )
}