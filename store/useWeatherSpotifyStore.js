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
      isPlayerVisible: false,
      spotifyToken: null,
      isLoggedIn: false,
      setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast }),
      setWeatherImage: (url) => set({ weatherImage: url }),
      setAlbums: (albums) => set({ albums }),
      setArtists: (artists) => set({ artists }),
      setPlaylists: (playlists) => set({ playlists }),
      setPlayingTrack: (track) => set({ playingTrack: track}),
      setIsPlayerVisible:(visible) => set({ isPlayerVisible: visible}),
      setSpotifyToken: (token) => set({ spotifyToken: token, isLoggedIn: !!token})
    }),
    {
      name: 'waether-spotify-store'
    }
  )
)