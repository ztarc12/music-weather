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
  // if(albums || artists || playlists) return;
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
          `/api/spotify-playlist?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify playlist fetch failed')
        }
        const data = await res.json()
        setPlaylists(data.playlists)
        // console.log("플레이리스트 data",data)
        // console.log("플레이리스트 data",data.playlists)
        // console.log(data.playlists)
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
          `/api/spotify-artists?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify playlist fetch failed')
        }
        const data = await res.json()
        const artistsData = data.artists.items
        if(data.artists && Array.isArray(artistsData)) {
          const filterArtists = artistsData.filter((artist) => artist.popularity >= 30)
          setArtists(filterArtists)
          // console.log(data)
          // console.log(filterArtists)
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
          `/api/spotify-albums?weather=${encodeURIComponent(query)}&offset=${offset}`
        )
        if (!res.ok) {
          throw new Error('Spotify playlist fetch failed')
        }
        const data = await res.json()
        if(data.albums && Array.isArray(data.albums.items)) {
          setAlbums(data.albums.items)
        //  console.log(data)
        //  console.log(albums)
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
  // useEffect(()=>{
  // const intervalId = setInterval(()=>{
  //   setOffset(prevOffset => parseInt(prevOffset) + 7)
  // }, 100000)
  // return () => clearInterval(intervalId)
  // },[])
  return {albums, artists, playlists, loadingAlbums, loadingArtists, loadingPlaylists}
  // return
}