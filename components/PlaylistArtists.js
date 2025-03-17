"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useMemo } from "react"
import { useCycleItems } from "@/hooks/useCycleItems"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useShallow } from "zustand/shallow"
import Link from "next/link";

export default function PlaylistArtists({ forecast }){
  const artistsData = useMemo(
    () => (state) => ({
      artists: state.artists
    })
  )
  const { artists } = useWeatherSpotifyStore(useShallow(artistsData))
  // console.log('아티스트',artists)
  const currentArtists = useCycleItems(artists, 100000, 8)
  // console.log(currentArtists)
  // const { loadingArtists } = useSpotifyMusic(forecast)

  // if (loadingArtists) return <p>가수를 불러오는 중...</p>
  if (!artists || artists.length === 0) return <p>플레이리스트에 아티스트 정보가 없습니다.</p>
  return (
    <div className="artists-cont">
      <h2 className="content-title">
        관련된 노래를 누가 불렀을까요?
      </h2>
      <Swiper className="artists-container"
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
        {currentArtists.map((item) => {
          // console.log('아이템',item.id)
          return (
            <SwiperSlide key={item.id}>
              <Link href={`/artists/detail/${item.id}`}>
                <div>
                  <img src={item.images?.[0]?.url || "/default-artist.png"} alt={item.name} className="artists-image"/>
                  <div>
                    <h3 className="artists-title">{item.name}</h3>
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