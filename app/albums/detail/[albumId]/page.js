"use client";

import { useDetailSpotify } from "@/hooks/useDetailSpotify";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { faFileArrowDown, faFolderPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const { playTrack, addTrack } = useTrackPlayer()

  const albumsState = useMemo(
    () => (state) => ({
      albums: state.albums,
      selectAlbum: state.selectAlbum
    }),
    []
  );

  const { albums,selectAlbum } = useWeatherSpotifyStore(useShallow(albumsState));
  const albumsDetail = albums?.find((p) => p.id === albumId) || selectAlbum?.find((p) => p.id === albumId)
  
  if (loading) return <p>불러오는 중...</p>;
  if (!data) return <p>데이터를 찾을수 없습니다.</p>;
  return (
    <div className="main-cont detail pos-r">
      <div className="detail-album-bg" style={{height: '30vh' ,backgroundImage: `url(${albumsDetail.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center',}}></div>
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
            const track = item.track
            console.log('앨범',track)
            console.log(item)
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
                  <button onClick={() => { addTrack(track)}}>
                    <FontAwesomeIcon icon={faFileArrowDown}/>
                  </button>
                  <button onClick={() => { playTrack(track)}}>
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
