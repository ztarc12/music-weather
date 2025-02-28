'use client'

import { useEffect, useState } from "react"

export function useDetailPlaylist(id) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true)
  const [ error , setError ] = useState(null)

  useEffect(()=>{
    // if (!id) return;

    async function fetchPlaylist(){
      setLoading(true)
      try {
        const res = await fetch(`/api/spotify-playlist-tracks?playlistId=${id}&market=KR`)
        if(!res.ok) {
          throw new Error("플레이리스트 상세 데이터를 불러오는데 실패했습니다.")
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching playlist detail', error)
      } finally {
        setPlaylistsLoading(false)
      }
    }
    fetchPlaylist()
  },[id])

  return { data, loading, error }
}