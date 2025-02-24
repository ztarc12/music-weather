// import { getWeatherQuery } from "@/util/getWeatherQuery";
// import { useEffect, useState } from "react";

// export function useSpotifyAlbums(forecast) {
//   const [albums, setAlbums] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [offset, setOffset] = useState(0)

//  useEffect(()=>{
//     async function loadAlbums(){
//       if (!forecast || !forecast.weathercode) {
//         setLoading(false)
//         return
//       }
//       setLoading(true)
//       const firstWeatherCode = forecast.weathercode[0]
//       const query = getWeatherQuery(firstWeatherCode)

//       try {
//         const res = await fetch(
//           `/api/spotify-albums?weather=${encodeURIComponent(query)}&offset=${offset}`
//         )
//         if (!res.ok) {
//           throw new Error('Spotify playlist fetch failed')
//         }
//         const data = await res.json()
//         if(data.albums && Array.isArray(data.albums.items)) {
//           setAlbums(data.albums.items)
//         //  console.log(data)
//         //  console.log(albums)
//         } else {
//         console.error('API response missing albums.items', data)
//         }
//       } catch (error) {
//         console.error('Error fetching Spotify albums', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadAlbums()
//   },[forecast, offset])
//   useEffect(()=>{
//   const intervalId = setInterval(()=>{
//     setOffset(prevOffset => parseInt(prevOffset) + 7)
//   }, 60000)
//   },[])
//   return {albums, loading}
// }