"use client";

import { useDetailSpotify } from "@/hooks/useDetailSpotify";
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faFolderPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";

export default function DetailPlaylists() {
  const { playlistId } = useParams();

  if (!playlistId) return <p>잘못된 접근입니다.</p>;

  const { data, loading, error } = useDetailSpotify(playlistId, 'playlist');
  // console.log('데이터',data)
  const { playTrack, addTrack } = useTrackPlayer()
  const playlistState = useMemo(
    () => (state) => ({
      playlists: state.playlists,
    }),
    []
  );

  const { playlists } = useWeatherSpotifyStore(useShallow(playlistState));
  // console.log('플레이리스트',playlists)
  const playlistArray = Array.isArray(playlists) ? playlists : (playlists?.items ?? [])
  const playlistDetail = playlistArray.find((p) => p?.id === playlistId) || null;
  // const playlistDetail = (playlists?.items ?? []).find((p) => p?.id === playlistId) || null;
  // console.log('플레이리스트 디테일',playlistDetail)

  

  if (loading) return <p>불러오는 중...</p>;
  if (!data) return <p>데이터를 찾을수 없습니다.</p>;
  if (!playlistDetail) return <p>플레이리스트를 찾을 수 없습니다.</p>
  return (
    <div className="main-cont detail">
      <h1>플레이리스트</h1>
      <div className="info-box">
        <div className="image-grid">
          {data.items.slice(0, 4).map((item) => {
            if (!item || !item.track) return null;
            return (
              <img
                key={item.track.id}
                src={item.track.album.images?.[0]?.url}
              />
            );
          })}
        </div>
        <ul className="info-text">
          <li>
            <p>플레이리스트 이름</p>
            <h3>{playlistDetail.name}</h3>
          </li>
          <li>
            <p>곡 수</p>
            <h3>{playlistDetail.tracks.total}</h3>
          </li>
          <li>
            <p>외부링크</p>
            <h3>{playlistDetail.external_urls.spotify}</h3>
          </li>
        </ul>
      </div>
      <ul className="track-box">
        {data?.items.map((item, index) => {
          const track = item.track
          console.log('플레이리스트', track)
          console.log(item)
          return (
            <li key={index} className="track">
              <img src={item.track.album.images?.[0]?.url} />
              <h4 className="name-artist">
                {item.track.name}
                <span className="artist">
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </span>
              </h4>
              <div className="play-bar">
                <button>
                  <FontAwesomeIcon icon={faFolderPlus}/>
                </button>
                <button onClick={()=>{ addTrack(track) }}>
                  <FontAwesomeIcon icon={faFileArrowDown}/>
                </button>
                <button onClick={()=>{ playTrack(track) }}>
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
