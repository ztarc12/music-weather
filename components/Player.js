'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { faBackwardStep, faForwardStep, faMinus, faPause, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import YouTube from "react-youtube"
import PrograssBar from "./PrograssBar"
import Playerlist from "./Playerlist"

export default function Player(){
  const { playingTrack, playerPlaylist, currentTrackIndex, isPlaying, setPlayingTrack, nextTrack, prevTrack, togglePlay, setIsPlayerVisible, removeTrackPlaylist, playingAlbum } = useWeatherSpotifyStore()
  const [ player, setPlayer ] = useState(null)
  const [ prograss, setPrograss ] = useState(0)
  const [ openList, setOpenList] = useState(false)
  // console.log('플레이어앨범', playingAlbum)
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
  const handleOpenList = () => {
    setOpenList((prev) => !prev)
  }
  return (
    <div className="player">
      <div className="player-box">
        <PrograssBar prograss={prograss} onClick={handlePrograssBar}/>
        <div className="hidden">
          {playingTrack?.videoId ? (
            <YouTube
              videoId={playingTrack.videoId}
              opts={opts}
              onReady={onPlayerReady}
              onEnd={()=>nextTrack()}
            />
          ) : (
            <p>재생할 영상이 없습니다.</p>
          )}
        </div>
        <div className="player-inner">
          {playingTrack ? (
            <div className="playing-info">
              <div className="playing-img">
                {/* <img src={playingTrack.album.images[0].url}/> */}
                {
                  playingTrack?.album?.images?.[0]?.url ? (
                    <img src={playingTrack.album.images[0].url}/>
                  ) : playingAlbum?.images?.[0]?.url ? (
                    <img src={playingAlbum.images[0].url}/>
                  ) : (<></>)
                }
              </div>
              <div className="title-name" onClick={handleOpenList}>
                  {
                    playingTrack ? (
                      <>
                        <h3>{playingTrack.name}</h3>
                        <p>{playingTrack.artists.map(artist => artist.name).join(', ')}</p>
                      </>
                    ) : playingAlbum ? (
                      <>
                        <h3>{playingAlbum.name}</h3>
                        <p>{playingAlbum.artists.map(artist => artist.name).join(', ')}</p>
                      </>
                    ) : (<></>)
                }
              </div>
              <div className="player-btn-box">
                <button onClick={prevTrack} className="prev-btn">
                  <FontAwesomeIcon icon={faBackwardStep}/>
                </button>
                <button onClick={togglePlay} className="playing-btn">
                  {isPlaying ? (<FontAwesomeIcon icon={faPause}/>) : (<FontAwesomeIcon icon={faPlay}/>)}
                </button>
                <button onClick={nextTrack} className="next-btn">
                  <FontAwesomeIcon icon={faForwardStep}/>
                </button>
                <button onClick={()=> {setIsPlayerVisible(false)}} className="close-btn">
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </div>
            </div>
          ) : (
            <p>재생 중인 곡이 없습니다.</p>
          )}
        </div>
      </div>
      <div className={`playerlist-container ${openList ? 'open' : 'closed'}`}>
        <Playerlist playerPlaylist={playerPlaylist} playingTrack={playingTrack} playingAlbum={playingAlbum} removeTrackPlaylist={removeTrackPlaylist} setPlayingTrack={setPlayingTrack}/>
      </div>
    </div>
  )
}