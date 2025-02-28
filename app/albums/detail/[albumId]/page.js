"use client";

import { useDetailSpotify } from "@/hooks/useDetailSpotify";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

export default function DetailArtists() {
  const { albumId } = useParams();
  // console.log('앨범아디',albumId)
  const { data, loading, error } = useDetailSpotify(albumId, "album");
  // console.log("트랙", data);
  // console.log('data상세',data.items)
  // console.log('트랙안에 트랙', data.tracks)

  const albumsState = useMemo(
    () => (state) => ({
      albums: state.albums,
    }),
    []
  );

  const { albums } = useWeatherSpotifyStore(useShallow(albumsState));
  // console.log('아티스트',artists)
  const albumsDetail = albums.find((p) => p.id === albumId);
  // console.log("상세아티스트", albumsDetail);
  if (loading) return <p>불러오는 중...</p>;
  if (!data) return <p>데이터를 찾을수 없습니다.</p>;
  return (
    <div className="main-cont detail">
      <h1>앨범</h1>
      <div className="info-box">
        <div className="image-flex">
          <img src={albumsDetail.images?.[0].url} />
        </div>
        <ul className="info-text">
          <li>
            <p>플레이리스트 제목</p>
            <h3>{albumsDetail.name}</h3>
          </li>
          <li>
            <p>아티스트 이름</p>
            <h3>{albumsDetail.artists[0].name}</h3>
          </li>
          <li>
            <p>곡 수</p>
            <h3>{albumsDetail.total_tracks}</h3>
          </li>
          <li>
            <p>외부링크</p>
            <h3><Link className="links" href={'https://open.spotify.com/album/4vsjx38vw9Lry39Th0VtpO'}>{albumsDetail.external_urls.spotify}</Link></h3>
          </li>
          <li>
            <p>출시일</p>
            <h3>{albumsDetail.release_date}</h3>
          </li>
        </ul>
      </div>
      <ul className="track-box">
        {data.items.map((item)=>{
          return(
            <li key={item.id} className="track">
              <img src={albumsDetail.images?.[0].url} />
              <h4 className="name-artist">
                {item.name}
                <span className="artist">
                  {item.artists.map((artist) => artist.name).join(", ")}
                </span>
              </h4>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
