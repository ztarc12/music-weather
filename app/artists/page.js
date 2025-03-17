'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import Link from "next/link"
import { useMemo } from "react"
import { useShallow } from 'zustand/shallow'
  
export default function ArtistPage() {
  const artistsData = useMemo(
    () => (state) => ({artists: state.artists}), []
  )
  const { artists } = useWeatherSpotifyStore(useShallow(artistsData));
  console.log("artists from store:", artists);
  console.log(artists)

  return (
    <div className="main-cont detail">
      <h1>아티스트</h1>
      {/* <h2>{albums[0].name}</h2> */}
      <ul className="detail-cont">
        {artists.map((item)=>{
          return (
            <Link key={item.id} href={`artists/detail/${item.id}`}>
              <li className="">
                <img src={item.images?.[0]?.url || '/default-artist.png'} className="detail-image"/>
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