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
  const currentArtists = useCycleItems(artists, 100000, 8)

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
        300: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        350: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
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
          return (
            <SwiperSlide key={item.id} className="card-artists">
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