import { faMinus, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Playerlist({ playerPlaylist, playingTrack, playingAlbum, removeTrackPlaylist, setPlayingTrack }) {
  return (
    <div className="playerlist" >
      <div className="playerlist-bg" style={{backgroundImage: `url(${playingTrack.album.images[0].url})`}}>
      </div>
      <div className="playerlist-inner">
        <div className="playerlist-img">
          <h2>NOW PLAYING</h2>
          {
            playingTrack?.album?.images?.[0]?.url ? (
              <img src={playingTrack.album.images[0].url}/>
            ) : playingAlbum?.images?.[0]?.url ? (
              <img src={playingAlbum.images[0].url}/>
            ) : (<></>)
          }
        </div>
        <div className="playerlist-box">
          <h2>현재 플레이리스트</h2>
          <ul className="playerlist-list">
            {playerPlaylist.map((track, index) => {
              return (
                <li key={index}>
                  {
                    track.album?.images?.[0]?.url ? (
                      <img src={track.album.images[0].url} alt={track.name}/>
                    ) : playingAlbum?.images?.[0]?.url ? (
                      <img src={playingAlbum.images[0].url}/>
                    ) : (<></>)
                  }
                  <span>
                    {track.name} -{" "}
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                  <button className="playing-btn" onClick={() => setPlayingTrack(track)}>
                    <FontAwesomeIcon icon={faPlay}/>
                  </button>
                  <button className="playing-remove" onClick={() => removeTrackPlaylist(index)}>
                    <FontAwesomeIcon icon={faMinus}/>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}