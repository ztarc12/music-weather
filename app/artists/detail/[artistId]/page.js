"use client";

import { useDetailSpotify } from "@/hooks/useDetailSpotify";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function DetailArtists() {
  const { artistId } = useParams();
  // console.log('아티스트아디',artistId)
  const { data, loading, error } = useDetailSpotify(artistId, "artist");
  console.log("트랙", data);
  // console.log('트랙안에 트랙', data.tracks)
  // const artistPlaylists = data?.playlist.filter(item => item !== null) || []
  // console.log('필터된플레이리스트', artistPlaylists)
  const artistsState = useMemo(
    () => (state) => ({
      artists: state.artists,
      setSelectAlbums: state.setSelectAlbums
    }),
    []
  );

  const { artists, setSelectAlbums } = useWeatherSpotifyStore(useShallow(artistsState));
  // console.log('아티스트',artists)
  const artistsDetail = artists.find((p) => p.id === artistId);
  // console.log("상세아티스트", artistsDetail);
  useEffect(()=>{
    if(data?.albums) {
      setSelectAlbums(data.albums)
    }
  },[artistId, data?.albums, setSelectAlbums])
  if (loading) return <p>불러오는 중...</p>;
  if (!data) return <p>데이터를 찾을수 없습니다.</p>;
  return (
    <div className="main-cont detail">
      <h1>아티스트</h1>
      <div className="info-box">
        <div className="image-flex">
          <img src={artistsDetail.images?.[0]?.url} />
        </div>
        <ul className="info-text">
          <li>
            <p>이름</p>
            <h3>{artistsDetail.name}</h3>
          </li>
          <li>
            <p>장르</p>
            <h3>
            {artistsDetail.genres.map((genre, i)=>{
              return(
                <span className="genre" key={i}>{genre}</span>
              )
            })}
            </h3>
          </li>
          <li>
            <p>팔로워</p>
            <h3>
              {artistsDetail.followers.total}
              <br/>
              <span className="reference">본 통계는 스포티파이 통계입니다.</span>
            </h3>
          </li>
        </ul>
      </div>
      <ul className="track-box">
        {data.topTracks.map((item)=>{
          return(
            <li key={item.id} className="track">
              <img src={item.album.images?.[0]?.url} />
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
      <h2>{artistsDetail.name}와 연관된 플레이리스트</h2>
      <ul className="artist-albums-box">
        {data.albums.map((item) => {
          return(
            <Link key={item.id} href={`/albums/detail/${item.id}`}>
              <li key={item.id} className="artist-albums">
                <img src={item.images[0].url}/>
                <h4>{item.name}</h4>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  );
}
