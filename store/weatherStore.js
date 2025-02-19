import { create } from "zustand";

export const useWeatherStore = create((set) => ({
  weeklyForecast: null,
  setWeeklyForecast: (forecast) => set({ weeklyForecast: forecast})
}))