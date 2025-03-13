import axios from "axios"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"

export const useTrackPlayer = () => {
    const { setPlayingTrack, addTrackToPlaylist, setIsPlayerVisible } = useWeatherSpotifyStore()

    const playTrack = async (track) => {
        try {
          const searchResponse = await axios.get("/api/youtube/search", {
            params: { track: track.name, artist: track.artists[0]?.name}
          })
          if (searchResponse.data.videoId) {
            const videoId = searchResponse.data.videoId
            const trackWithVideo = { ...track, videoId }
            setPlayingTrack(trackWithVideo)
            addTrackToPlaylist(trackWithVideo)
            setIsPlayerVisible(true)
          } else {
            alert('플레이어 정보가 없습니다.')
          }
        } catch (error) {
          console.error('트랙 재생 에러', error)
          alert('트랙 재생 중 오류가 발생 했습니다.')
        }
      }
      
    const addTrack = async (track) => {
        try {
            const searchResponse = await axios.get("/api/youtube/search", {
            params: { track: track.name, artist: track.artists[0]?.name}
            })
            if (searchResponse.data.videoId) {
            const videoId = searchResponse.data.videoId
            const trackWithVideo = { ...track, videoId }
            addTrackToPlaylist(trackWithVideo)
            } else {
            alert('플레이어 정보가 없습니다.')
            }
        } catch (error) {
            console.error('곡 추가 에러', error)
            alert('곡 추가 중 오류가 발생 했습니다.')
        }
    }
    return { playTrack, addTrack}
}