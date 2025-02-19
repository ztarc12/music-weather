import axios from "axios"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')

  if(!latitude || !longitude) {
    return new Response(JSON.stringify({ error: 'latitude(위도), longitude(경도) 파라미터가 필요합니다.'}),{
      status: 400,
      headers: { 'Content-Type': 'application/json'}
    })
  }
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        daily: ['weathercode', 'temperature_2m_max', 'temperature_2m_min'].join(','),
        timezone: 'Asia/Seoul'
      }
    })
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    })
  } catch (error) {
    console.error('Forecast fetch error:', error)
    return new Response(JSON.stringify({error: '날씨 데이터를 불러오는 중 오류가 발생했습니다.'}),{
      status: 500,
      headers: { 'Content-Type': 'application/json'}
    })
  }
}