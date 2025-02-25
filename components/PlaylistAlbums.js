"use client"

import { useSpotifyMusic } from "@/hooks/useSpotifyMisic"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"

export default function PlaylistAlbums({ forecast }) {
  const albumsData = useMemo(
    () => (state) => ({
      albums: state.albums
    })
  )
  const { albums } = useWeatherSpotifyStore(useShallow(albumsData))
  // const { loadingAlbums } = useSpotifyMusic(forecast)

  // if (loadingAlbums) return <p>앨범을 불러오는 중...</p>
  if(!albums || albums.length === 0) return <p>앨범을 찾지 못했습니다.</p>
  return (
    <div className="artists-cont">
      <h2 className="content-title">관련된 앨범은 무엇일까요?</h2>
      <ul className="artists-container">
        {albums.map((album) => {
          return (
            <li key={album.id} className="card-artists">
              <img src={album.images?.[0]?.url || '/default-album.png'} className="artists-image"/>
              <div className="artists-overlay">
                <h3 className="artists-title"></h3>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}