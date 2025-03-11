'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useEffect, useState } from "react"
import YouTube from "react-youtube"

export default function Player(){
  const { playingTrack, playerPlaylist, currentTrackIndex, isPlaying, setPlayingTrack, nextTrack, prevTrack, togglePlay, setIsPlayerVisible } = useWeatherSpotifyStore()

  const opts = {
    height: '195',
    width: '320',
    playerVars: { autoplay: 1 }
  }
  return (
    <div className="player">
      <div>
        {playingTrack?.videoId ? (
          <YouTube
            videoId={playingTrack.videoId}
            opts={opts}
            onEnd={()=>nextTrack()}
          />
        ) : (
          <p>재생할 영상이 없습니다.</p>
        )}
        <div>
          <button onClick={prevTrack}>이전 곡</button>
          <button onClick={togglePlay}>
            {isPlaying ? "일시정지" : "플레이"}
          </button>
          <button onClick={nextTrack}>다음 곡</button>
          <button onClick={()=> setIsPlayerVisible(false)}>닫기</button>
        </div>
      </div>
      <ul>
        {playerPlaylist.map((track, index) => {
          return (
            <li key={index}>
              <span>
                {track.name} -{" "}
                {track.artists.map((artist) => artist.name).join(", ")}
              </span>
              <button onClick={() => setPlayingTrack(track)}>재생</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}