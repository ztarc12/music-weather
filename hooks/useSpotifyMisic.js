'use client'

import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore";
import { getWeatherQuery } from "@/util/getWeatherQuery";
import { useEffect, useState } from "react";

export function useSpotifyMusic(forecast){
  const [loadingAlbums, setLoadingAlbums] = useState(false)
  const [loadingArtists, setLoadingArtists] = useState(false)
  const [loadingPlaylists, setLoadingPlaylists] = useState(false)
  const [offset, setOffset] = useState(0)

  const { albums, setAlbums, artists, setArtists, playlists, setPlaylists } = useWeatherSpotifyStore()

  // playlist
  useEffect(()=>{
    
    async function loadPlaylist(){
      if (!forecast || !forecast.weathercode) {
        setLoadingPlaylists(false)
        return
      }
      setLoadingPlaylists(true)
      const firstWeatherCode = forecast.weathercode[0]
      const query = getWeatherQuery(firstWeatherCode)

      try {
        const res = await fetch(
          `/api/spotify-playlist-tracks?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify playlist fetch failed')
        }
        const data = await res.json()
        setPlaylists(data.playlists)
      } catch (error) {
        console.error('Error fetching Spotify playlist', error)
      } finally {
        setLoadingPlaylists(false)
      }
    }
    loadPlaylist()
  },[forecast, offset])

  // artists
  useEffect(()=>{
    async function loadArtists(){
      if (!forecast || !forecast.weathercode) {
        setLoadingArtists(false)
        return
      }
      setLoadingArtists(true)
      const firstWeatherCode = forecast.weathercode[0]
      const query = getWeatherQuery(firstWeatherCode)

      try {
        const res = await fetch(
          `/api/spotify-artists-tracks?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify artist fetch failed')
        }
        const data = await res.json()
        const artistsData = data.artists.items
        if(data.artists && Array.isArray(artistsData)) {
          const filterArtists = artistsData.filter((artist) => artist.popularity >= 30)
          setArtists(filterArtists)
        } else {
          console.error('API response missing artists.items', data)
        }
      } catch (error) {
        console.error('Error fetching Spotify playlist', error)
      } finally {
        setLoadingArtists(false)
      }
    }
    loadArtists()
  },[forecast, offset])

  //albums
  useEffect(()=>{
    async function loadAlbums(){
      if (!forecast || !forecast.weathercode) {
        setLoadingAlbums(false)
        return
      }
      setLoadingAlbums(true)
      const firstWeatherCode = forecast.weathercode[0]
      const query = getWeatherQuery(firstWeatherCode)

      try {
        const res = await fetch(
          `/api/spotify-albums-tracks?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify album fetch failed')
        }
        const data = await res.json()
        if(data.albums && Array.isArray(data.albums.items)) {
          setAlbums(data.albums.items)
        } else {
        console.error('API response missing albums.items', data)
        }
      } catch (error) {
        console.error('Error fetching Spotify albums', error)
      } finally {
        setLoadingAlbums(false)
      }
    }
    loadAlbums()
  },[forecast, offset])
  return {albums, artists, playlists, loadingAlbums, loadingArtists, loadingPlaylists}
}