// import { getWeatherQuery } from "@/util/getWeatherQuery";
// import { useEffect, useState } from "react";

// export function useWeatherArtists(forecast) {
//   const [artists, setArtists] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [offset, setOffset] = useState(0)

//   useEffect(()=>{
//     async function loadArtists(){
//       if (!forecast || !forecast.weathercode) {
//         setLoading(false)
//         return
//       }
//       setLoading(true)
//       const firstWeatherCode = forecast.weathercode[0]
//       const query = getWeatherQuery(firstWeatherCode)

//       try {
//         const res = await fetch(
//           `/api/spotify-artists?weather=${encodeURIComponent(query)}&offset=${offset}`
//         )
//         if (!res.ok) {
//           throw new Error('Spotify playlist fetch failed')
//         }
//         const data = await res.json()
//         const artistsData = data.artists.items
//         if(data.artists && Array.isArray(artistsData)) {
//           const filterArtists = artistsData.filter((artist) => artist.popularity >= 20)
//           setArtists(filterArtists)
//           console.log(data)
//           console.log(filterArtists)
//         } else {
//           console.error('API response missing artists.items', data)
//         }
//       } catch (error) {
//         console.error('Error fetching Spotify playlist', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadArtists()
//   },[forecast, offset])
//   useEffect(()=>{
//     const intervalId = setInterval(() => {
//       setOffset(prevOffset => parseInt(prevOffset) + 7)
//     }, 60000)
//     return () => clearInterval(intervalId)
//   }, [])
//   return {artists, loading}
// }