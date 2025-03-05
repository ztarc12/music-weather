import axios from "axios"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const trackName = searchParams.get('track')
  const artistName = searchParams.get('artist')
  const apiKey = process.env.YOUTUBE_API_KEY

  if(!trackName || !artistName) {
    return new Response(JSON.stringify({ error: '트랙명과 아티스트명이 필요합니다'}),
      { status: 400, headers: { "Content-Type": "application/json"}}
    )
  }
  try {
    const query = `${trackName} ${artistName} official audio`
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video',
        key: apiKey
      }
    })
    if (response.data.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Youtube에서 검색 결과를 찾을 수 없습니다.'}),
        { status: 404, headers: { "Content-Type": "application/json"}}
      )
    }
    const videoId = response.data.items[0].id.videoId
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`
    return new Response(JSON.stringify({ youtubeUrl, videoId }),
      { status: 200, headers: { "Content-Type": "application/json"}}
    )
  } catch(error) {
    console.error('Youtube API 오류:', error)
    return new Response(JSON.stringify({ error: 'Youtube 검색에 실패했습니다.'}),
      { status: 500, headers: { "Content-Type": "application/json"}}
    )
  }
}