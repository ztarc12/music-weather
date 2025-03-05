// 'use client'

// import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
// import { useEffect, useState } from "react"

// export default function Player(){
//   const { playingTrack, audio, setAudio, isPlayerVisible, setPlayerVisible } = useWeatherSpotifyStore()
//   const [isPlaying, setIsPlaying] = useState(true)

//   useEffect(()=>{
//     if (audio) {
//       audio.pause()
//     }
//     if (playingTrack && playingTrack.preview_url) {
//       const newAudio = new Audio(playingTrack.preview_url)
//       newAudio.play()
//       setAudio(newAudio)
//       setIsPlaying(true)
//     }
//   },[playingTrack])

//   const togglePlayPause = () => {
//     if (audio) {
//       if(isPlaying) {
//         audio.pause()
//       } else {
//         audio.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }
//   if (!isPlayerVisible || !playingTrack) return null
//   return (
//     <div className="player">
//       <img src={playingTrack.album.images?.[0]?.url} alt={playingTrack.name} />
//       <div className="player-info">
//         <h3>{playingTrack.name}</h3>
//         <p>{playingTrack.artists.map((artist) => artist.name).join(", ")}</p>
//       </div>
//       <div className="player-controls">
//         <button onClick={togglePlayPause}>
//           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
//         </button>
//         <button onClick={() => setPlayerVisible(false)}>
//           <FontAwesomeIcon icon={faXmark} />
//         </button>
//       </div>
//     </div>
//   )
// }