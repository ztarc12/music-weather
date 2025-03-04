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
      audio: null,
      isPlayerVisible: false,
      setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast }),
      setWeatherImage: (url) => set({ weatherImage: url }),
      setAlbums: (albums) => set({ albums }),
      setArtists: (artists) => set({ artists }),
      setPlaylists: (playlists) => set({ playlists }),
      setPlayingTrack: (track) => set({ playingTrack: track}),
      setAudio: (audio) => set({ audio }),
      setIsPlayVisible:(visible) => set({ isPlayerVisible: visible}),
    }),
    {
      name: 'waether-spotify-store'
    }
  )
)