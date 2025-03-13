'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { faBackwardStep, faForwardStep, faMinus, faPause, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import YouTube from "react-youtube"
import PrograssBar from "./PrograssBar"

export default function Player(){
  const { playingTrack, playerPlaylist, currentTrackIndex, isPlaying, setPlayingTrack, nextTrack, prevTrack, togglePlay, setIsPlayerVisible, removeTrackPlaylist } = useWeatherSpotifyStore()
  const [ player, setPlayer ] = useState(null)
  const [ prograss, setPrograss ] = useState(0)
  const opts = {
    height: '50',
    width: '240',
    playerVars: { autoplay: 1 }
  }
  const onPlayerReady = (event) => {
    setPlayer(event.target)
    if(isPlaying) {
      event.target.playVideo()
    } else {
      event.target.pauseVideo()
    }
  }
  useEffect(()=>{
    if(!player) return
    if(isPlaying) {
      if(typeof player.playVideo === 'function') {
        const iframe = player.getIframe()
        if (iframe && iframe.src) {
          player.playVideo()
        }
      }
    } else {
      if(typeof player.pauseVideo === 'function') {
        const iframe = player.getIframe()
        if (iframe && iframe.src) {
          player.pauseVideo()
        }
      }
    }
  },[isPlaying, player])

  useEffect(()=>{
    let interval
    if (player && isPlaying) {
      interval = setInterval(()=>{
        const currentTime = player.getCurrentTime()
        const duration = player.getDuration()
        if(duration) {
          setPrograss((currentTime / duration) * 100)
        }
      }, 1000)
    } else {
      setPrograss(0)
    }
    return () => clearInterval(interval)
  }, [player, isPlaying])
  const handlePrograssBar = (e) => {
    if (!player) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickPercent = clickX / width
    const duration = player.getDuration()
    const newTime = clickPercent * duration
    player.seekTo(newTime, true)
  }
  return (
    <div className="player">
      <PrograssBar prograss={prograss} onClick={handlePrograssBar}/>
      <div className="p-1rem">
        {playingTrack?.videoId ? (
          <YouTube
            className="hidden"
            videoId={playingTrack.videoId}
            opts={opts}
            onReady={onPlayerReady}
            onEnd={()=>nextTrack()}
          />
        ) : (
          <p>재생할 영상이 없습니다.</p>
        )}
        <div className="test">
          {playingTrack ? (
            <div className="playing-info">
              <h3>{playingTrack.name}</h3>
              <p>{playingTrack.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ) : (
            <p>재생 중인 곡이 없습니다.</p>
          )}
          <div>
            <button onClick={prevTrack}>
              <FontAwesomeIcon icon={faBackwardStep}/>
            </button>
            <button onClick={togglePlay}>
              {isPlaying ? (<FontAwesomeIcon icon={faPause}/>) : (<FontAwesomeIcon icon={faPlay}/>)}
            </button>
            <button onClick={nextTrack}>
              <FontAwesomeIcon icon={faForwardStep}/>
            </button>
            <button onClick={()=> {setIsPlayerVisible(false)}}>
              <FontAwesomeIcon icon={faXmark}/>
            </button>
          </div>
        </div>
      </div>
      {/* <ul>
        {playerPlaylist.map((track, index) => {
          return (
            <li key={index}>
              <span>
                {track.name} -{" "}
                {track.artists.map((artist) => artist.name).join(", ")}
              </span>
              <button onClick={() => setPlayingTrack(track)}>재생</button>
              <button onClick={() => removeTrackPlaylist(index)}>
                <FontAwesomeIcon icon={faMinus}/>
              </button>
            </li>
          )
        })}
      </ul> */}
    </div>
  )
}