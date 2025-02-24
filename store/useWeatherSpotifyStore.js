import { create } from "zustand";

export const useWeatherSpotifyStore = create((set) => ({
  weeklyForecast: null,
  weatherImage: null,
  albums: [],
  artists: [],
  playlists: [],
  setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast }),
  setWeatherImage: (url) => set({ weatherImage: url }),
  setAlbums: (albums) => set({ albums }),
  setArtists: (artists) => set({ artists }),
  setPlaylists: (playlists) => set({ playlists })
}))