'use client'

import { useEffect, useState } from "react"

export function useDetailArtists(id) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true)
  const [ error , setError ] = useState(null)

  useEffect(()=>{
    if (!id) return;
    setLoading(true)
    async function fetchArtist(){
      try {
        const res = await fetch(`/api/spotify-artists-tracks?artistId=${id}`)
        if (!res.ok) {
          throw new Error('아티스트 트랙 데이터를 불러오는데 실패했습니다.')
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching artist detail', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArtist()
  },[id])

  return { data, loading, error }
}