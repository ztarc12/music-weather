import { useEffect, useState } from "react"

export function useCycleItems(items = [], cycleInterval = 10000, chunkSize = 8){
  const [currentChunk, setCurrentChunk] = useState([])
  if(!items) return;
  useEffect(()=>{
    if(!items || items.length === 0) {
      setCurrentChunk((prev) => (prev.length === 0 ? prev : []))
      return
    }
    const totalItems = items.length
    const maxIndex = Math.ceil(totalItems / chunkSize)
    let currentIndex = 0

    function updateChunk() {
      const start = currentIndex * chunkSize
      const end = start + chunkSize
      setCurrentChunk(items.slice(start, end))
      currentIndex = (currentIndex + 1) % maxIndex
    }

    updateChunk()
    const intervalId = setInterval(()=>{
      updateChunk()
    }, cycleInterval)

    return () => clearInterval(intervalId)

  },[items, cycleInterval, chunkSize])
  
  return currentChunk
}