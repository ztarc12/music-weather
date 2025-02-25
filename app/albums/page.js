'use client'

import { useSpotifyMusic } from "@/hooks/useSpotifyMisic"
import { useWeatherSpotifyStore } from "@/store/useWeatherSpotifyStore"
import { useMemo } from "react"
import { shallow, useShallow } from 'zustand/shallow'

// export default function Albums(){
  
export default function AlbumsPage() {
  const albumsData = useMemo(
    () => (state) => ({albums: state.albums}), []
  )
  // const { albums } =useWeatherSpotifyStore(useShallow(albumsData))
  const { albums } = useWeatherSpotifyStore(useShallow(albumsData));
  console.log("Albums from store:", albums);
  console.log(albums)

  return (
    <div className="main-section albums">
      <h1>앨범</h1>
      <ul>
        {albums.map((album)=>{
          return (
            <li key={album.id} className="card-artists">
              <img src={album.images?.[0]?.url || '/default-album.png'} className="artists-image"/>
                <h3 className="-title">
                  {album.name}
                </h3>
            </li>
          )
        })}
      </ul>
    </div>
  )
}