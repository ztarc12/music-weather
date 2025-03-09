import axios from "axios"


const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

async function getSpotifyToken() {
  const params = new URLSearchParams()
  params.append("grant_type", "client_credentials")
  const response = await axios.post("https://accounts.spotify.com/api/token",
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    }
  )
  return response.data.access_token
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const weatherQuery = searchParams.get('weather') || '맑은 날'
  const offset = searchParams.get('offset') || 0
  const market = 'KR'

  try {
    const token = await getSpotifyToken()
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: `${weatherQuery} K-pop album`,
        type: 'album',
        market,
        // limit: 32,
        offset
      },
      headers: { Authorization: `Bearer ${token}` }
    })
    return new Response(JSON.stringify(response.data),{
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    })
  } catch (error) {
    console.error('Spotify album fetch error', error.response?.data || error)
    return new Response(JSON.stringify({ error: 'Error fetching albums from Spotify'}),
    { status: 500, headers: { 'Content-Type': 'application/json'}}
  )
  }
}