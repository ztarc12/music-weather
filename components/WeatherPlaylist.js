"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useCycleItems } from "@/hooks/useCycleItems"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"
import Link from "next/link";

export default function WeatherPlaylist({ forecast }){
  const playlistState = useMemo(
    () => (state) => ({
      playlists: state.playlists
    }), []
  )
  const { playlists } = useWeatherSpotifyStore(useShallow(playlistState))
  const playlistsItems = playlists.items
  const currentplaylistsItems = useCycleItems(playlistsItems, 1000000000, 12)
  
  if(!playlists || !playlists.items || playlists.items.length === 0) return <p>날씨에 맞는 플레이리스트를 찾지 못했습니다.</p>
  return (
    <div className="playlist-cont">
      <h2 className="content-title">오늘 날씨에 맞는 플레이리스트</h2>
      <Swiper className="playlist-container"
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={8}
        breakpoints={{
          500: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}>
        {currentplaylistsItems.map((item)=>{
            if(!item) return null ;
            return(
              <SwiperSlide key={item.id} className="card-playlist">
                <Link href={`/playlists/detail/${item.id}`}>
                  <div>
                    <img src={item.images?.[0]?.url || '/default-image.png'} className="playlist-image"/>
                    <div className="playlist-overlay">
                      <h3 className="playlist-title">{item.name}</h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}