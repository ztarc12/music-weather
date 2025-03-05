import { redirect } from "next/dist/server/api-utils"
import querystring from "querystring"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
      client_id : CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state"
    })}`
    return new Response(JSON.stringify({ url: authUrl}),
      { status: 200, headers: { "Content-Type": "application/json"}}
    )
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers : { "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI
      })
    })
    const tokenData = await tokenRes.json()
    return new Response(JSON.stringify(tokenData), {
      status: 200, headers: { "Content-Type": "application/json"}
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Spotify 로그인 오류 발생"}),{
      status: 500, headers: { "Content-Type": "application/json"}
    })
  }
}