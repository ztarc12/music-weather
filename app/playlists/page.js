'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import Link from "next/link"
import { useMemo } from "react"
import { useShallow } from 'zustand/shallow'
  
export default function PlaylistsPage() {
  const playlistsData = useMemo(
    () => (state) => ({playlists: state.playlists}), []
  )
  const { playlists } = useWeatherSpotifyStore(useShallow(playlistsData)) || { items: []};

  return (
    <div className="main-cont detail">
      <h1>플레이리스트</h1>
      <ul className="detail-cont">
        {(!playlists || !playlists.items)? (
          <p>플레이리스트 불러오는 중</p>
        ) : (
          playlists.items.filter(item => item).map((item)=>{
            return (
              <Link key={item.id} href={`/playlists/detail/${item.id}`}>
                <li className="">
                  <img src={item.images?.[0]?.url || '/default-album.png'} className="detail-image"/>
                  <div>
                    <h3 className="detail-cont-name">
                      {item.name}
                    </h3>
                  </div>
                </li>
              </Link>
            )
          })
        )}
      </ul>
    </div>
  )
}