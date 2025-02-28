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
      detailPlaylists: [],
      detailArtists: [],
      detailAlbums: [],
      setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast }),
      setWeatherImage: (url) => set({ weatherImage: url }),
      setAlbums: (albums) => set({ albums }),
      setArtists: (artists) => set({ artists }),
      setPlaylists: (playlists) => set({ playlists }),
      setDetailPlaylists: (detailPlaylists) => set({ detailPlaylists }),
      setDetailArtists: (detailArtists) => set({ detailArtists }),
      setDetailAlbums: (detailAlbums) => set({ detailAlbums }),
    }),
    {
      name: 'waether-spotify-store'
    }
  )
)