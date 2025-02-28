'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { useShallow } from 'zustand/shallow'
  
export default function PlaylistsPage() {
  const playlistsData = useMemo(
    () => (state) => ({playlists: state.playlists}), []
  )
  const { playlists } = useWeatherSpotifyStore(useShallow(playlistsData));
  console.log("playlists from store:", playlists);
  console.log(playlists)

  return (
    <div className="main-cont detail">
      <h1>플레이리스트</h1>
      <ul className="detail-cont">
        {playlists.items.filter(item => item).map((item)=>{
          return (
            <li key={item.id} className="">
              <img src={item.images?.[0]?.url || '/default-album.png'} className="detail-image"/>
              <div>
                <h3 className="detail-cont-name">
                  {item.name}
                </h3>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}