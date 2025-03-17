import { faL } from "@fortawesome/free-solid-svg-icons";
import { create } from "zustand";
import { persist } from 'zustand/middleware'
export const useWeatherSpotifyStore = create(
  persist(
    (set) => ({
      weeklyForecast: null,
      weatherImage: null,
      albums: [],
      artists: [],
      playlists: [],
      playingTrack: null,
      playerPlaylist: [],
      currentTrackIndex: 0,
      isPlaying: false,
      isPlayerVisible: false,
      selectAlbum: null,
      playingAlbum: null,
      setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast }),
      setWeatherImage: (url) => set({ weatherImage: url }),
      setAlbums: (albums) => set({ albums }),
      setArtists: (artists) => set({ artists }),
      setPlaylists: (playlists) => set({ playlists }),
      setPlayingTrack: (track) => set({ playingTrack: track}),
      setIsPlayerVisible:(visible) => set({ isPlayerVisible: visible}),
      addTrackToPlaylist: (track) => set((state) => ({
        playerPlaylist: [...state.playerPlaylist, track],
        currentTrackIndex: state.playerPlaylist.length === 0 ? 0 : state.currentTrackIndex
      })),

      nextTrack: () => set((state) => {
        const nextIndex = (state.currentTrackIndex + 1) % state.playerPlaylist.length;
        return {
          currentTrackIndex: nextIndex,
          playingTrack: state.playerPlaylist[nextIndex]
        }
      }),

      prevTrack: () => 
        set((state) => {
          const { playerPlaylist, currentTrackIndex } = state;
          const prevIndex = (currentTrackIndex - 1 + playerPlaylist.length) % playerPlaylist.length
          return {
            currentTrackIndex: prevIndex,
            playingTrack: playerPlaylist[prevIndex]
          }
      }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying})),
      removeTrackPlaylist: (indexToRemove) => set((state) => {
        const newPlaylist = state.playerPlaylist.filter(
          (_, index) => index !== indexToRemove
        )
        let newCureentIndex = state.currentTrackIndex
        if (indexToRemove < state.currentTrackIndex) {
          newCureentIndex = state.currentTrackIndex - 1
        } else if (state.currentTrackIndex >= newPlaylist.length) {
          newCureentIndex = 0
        }
        return {
          playerPlaylist: newPlaylist,
          currentTrackIndex: newCureentIndex,
          playingTrack: newPlaylist[newCureentIndex] || null
        }
      }),
      setSelectAlbum: (album) => set({selectAlbum: album}),
      setPlayingAlbum: (album) => set({ playingAlbum: album })
    }),
    {
      name: 'waether-spotify-store'
    }
  )
)