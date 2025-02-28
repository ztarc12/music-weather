"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useCycleItems } from "@/hooks/useCycleItems"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"
import Link from "next/link";

export default function PlaylistAlbums({ forecast }) {
  const albumsData = useMemo(
    () => (state) => ({
      albums: state.albums
    })
  )
  const { albums } = useWeatherSpotifyStore(useShallow(albumsData))

  const currentAlbums = useCycleItems(albums, 100000, 8)
  // const { loadingAlbums } = useSpotifyMusic(forecast)

  // if (loadingAlbums) return <p>앨범을 불러오는 중...</p>
  if(!albums || albums.length === 0) return <p>앨범을 찾지 못했습니다.</p>
  return (
    <div className="albums-cont">
      <h2 className="content-title">관련된 앨범은 무엇일까요?</h2>
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
        {currentAlbums.map((item) => {
          console.log(item)
          return (
            <SwiperSlide key={item.id}>
              <Link href={`albums/detail/${item.id}`}>
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