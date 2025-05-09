"use client";

import { useDetailSpotify } from "@/hooks/useDetailSpotify";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { faFileArrowDown, faFolderPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

export default function DetailAlbums() {
  const { albumId } = useParams();
  const { data, loading, error } = useDetailSpotify(albumId, "album");
  const { playTrack, addTrack, albumPlayTrack } = useTrackPlayer()

  const albumsState = useMemo(
    () => (state) => ({
      albums: state.albums,
      selectAlbum: state.selectAlbum,
      setPlayingAlbum: state.setPlayingAlbum
    }),
    []
  );

  const { albums,selectAlbum, setPlayingAlbum } = useWeatherSpotifyStore(useShallow(albumsState));
  const albumArray = Array.isArray(albums) ? albums : (albums?.items ?? [])
  const albumsDetail = albumArray.find((p) => p.id === albumId) || selectAlbum?.find((p) => p.id === albumId)
  
  if (loading) return <p>불러오는 중...</p>;
  if (!data) return <p>데이터를 찾을수 없습니다.</p>;
  return (
    <div className="main-cont detail pos-r">
      <div className="detail-album-bg" style={{width: '100%',height: '30vh' ,backgroundImage: `url(${albumsDetail.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center',}}></div>
      <h1>앨범</h1>
        <div className="info-box">
          <div className="image-flex">
            <img src={albumsDetail.images[0].url}/>
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
              <p>출시일</p>
              <h3>{albumsDetail.release_date}</h3>
            </li>
          </ul>
        </div>
        <ul className="track-box">
          {data?.items.map((item)=>{
            return(
              <li key={item.id} className="track">
                <img src={albumsDetail.images?.[0].url} />
                <h4 className="name-artist">
                  {item.name}
                  <span className="artist">
                    {item.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </h4>
                <div className="play-bar">
                  <button>
                    <FontAwesomeIcon icon={faFolderPlus}/>
                  </button>
                  <button onClick={() => { addTrack(item)}}>
                    <FontAwesomeIcon icon={faFileArrowDown}/>
                  </button>
                  <button onClick={() => { albumPlayTrack(item); setPlayingAlbum(albumsDetail)}}>
                    <FontAwesomeIcon icon={faPlay}/>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
    </div>
  );
}
