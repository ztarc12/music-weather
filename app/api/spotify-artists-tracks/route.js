import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const response = await axios.post("https://accounts.spotify.com/api/token", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });
  return response.data.access_token;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");
  const weatherQuery = searchParams.get('weather') || '맑은 날'
  const offset = searchParams.get('offset') || 0
  let artistName = searchParams.get("artistName")
  const market = searchParams.get("market") || "KR";


  try {
    const token = await getSpotifyToken();
    
    if (artistId) {
      if (!artistName) {
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`,
          { headers: {Authorization: `Bearer ${token}`}}
        )
        artistName = artistResponse.data.name
      }
      const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        params: { market, limit: 30 },
        headers: { Authorization: `Bearer ${token}` },
      });
      const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        params: { market},
        headers: { Authorization: `Bearer ${token}` },
      });
      const playlistsResponse = await axios.get(`https://api.spotify.com/v1/search`, {
        params: { q: artistName, type: 'playlist', market},
        headers: { Authorization: `Bearer ${token}` },
      });
      return new Response(JSON.stringify({topTracks: tracksResponse.data.tracks, albums: albumsResponse.data.items, playlist: playlistsResponse.data.playlists.items}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if(weatherQuery) {
      const response = await axios.get('https://api.spotify.com/v1/search',{
        params: {
          q: `${weatherQuery} K-pop`,
          type: 'artist',
          market,
          limit: 32,
          offset
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json'}
      })
    }
    return new Response(JSON.stringify({ error: "weather 또는 artistId 파라미터가 필요합니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching artist tracks:", error.response?.data || error);
    return new Response(JSON.stringify({ error: "아티스트 트랙 데이터를 가져오는데 실패했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
