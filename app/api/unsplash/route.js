import axios from "axios"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response(JSON.stringify({error: 'Query parameter is required'}), {
      status: 400,
      headers: { 'Content-Type': 'application/json'}
    })
  }
  const UNSPLASHACCESSKEY = process.env.UNSPLASH_ACCESS_KEY

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 1
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASHACCESSKEY}`
      }
    })

    if(response.data.results && response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular
      return new Response(JSON.stringify({ imageUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({error: 'No image found'}), {
        status: 400,
        headers: { 'Content-Type': 'application/json'}
      })
    }
  } catch (error) {
    console.error('unsplash fetch error', error)
    return new Response(JSON.stringify({error: 'Error fetching image from Unsplash'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json'}
    })
  }
}