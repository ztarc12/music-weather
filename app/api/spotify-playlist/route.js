import axios from "axios"

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

async function getSpotifyToken() {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  let response;
  try {
    response = await axios.post(
      'https://accounts.spotify.com/api/token',
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
  } catch (error) {
    console.error('Error fetching Spotify token', error.response?.data || error)
    throw error
  }

  return response.data.access_token
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const weatherQuery = searchParams.get('weather') || '맑은 날'
  const offset = searchParams.get('offset')
  // const market = 'KR'

  try {
    const token = await getSpotifyToken()

    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: `${weatherQuery} (K-pop OR K-r&b)`,
        type: 'playlist',
        // market: market,
        limit: 32,
        offset
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log("플레이리스트 API",response)

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    })
  } catch (error) {
    // console.error('Spotify playlist fetch error', error)
    // console.log("플레이리스트 API",response)
    return new Response(JSON.stringify({ error: 'Error fetching playlist from Spotify'}),
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    )
  }
}