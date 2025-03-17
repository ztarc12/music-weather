'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import Link from "next/link"
import { useMemo } from "react"
import { useShallow } from 'zustand/shallow'
  
export default function AlbumsPage() {
  const albumsData = useMemo(
    () => (state) => ({albums: state.albums}), []
  )
  const { albums } = useWeatherSpotifyStore(useShallow(albumsData));

  return (
    <div className="main-cont detail">
      <h1>앨범</h1>
      {/* <h2>{albums[0].name}</h2> */}
      <ul className="detail-cont">
        {albums.map((item)=>{
          console.log('앨범데이터',item)
          return (
            <Link key={item.id} href={`albums/detail/${item.id}`}>
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
        })}
      </ul>
    </div>
  )
}