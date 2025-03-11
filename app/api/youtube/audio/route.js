
import ytdl from "ytdl-core-discord"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId')

  if(!videoId) {
    return new Response(JSON.stringify({ error: 'videoId 파라미터가 필요합니다.' }),
      { status: 400, headers: { "Content-Type": "application/json"}}
    )
  }
  try {
    console.log(`유튜브 비디오 ID: ${videoId}`)
    if (!ytdl.validateID(videoId)) {
      console.error('유효하지 않은 videoId입니다.')
      return new Response(JSON.stringify({ error: '유효하지 않은 videoId입니다.' }),
        { status: 400, headers: { "Content-Type": "application/json"}}
      )
    }

    const info = await ytdl.getInfo(videoId)
    console.log("유튜브 비디오 정보:", info);

    const audioFormats = info.formats.filter(format => format.mimeType.includes('audio/mp4'))
    console.log("오디오 스트림 목록:", audioFormats);

    if (!audioFormats.length) {
      console.error('오디오 스트림을 찾을 수 없어요')
      return new Response(JSON.stringify( {error: '오디오 스트림을 찾을 수 없습니다.' }),
        { status: 404, headers: { "Content-Type": 'application-json' }}
      )
    }
    const bestAudio = audioFormats[0]
    return new Response(JSON.stringify({ audioUrl: bestAudio.url }),
      { status: 200, headers: {"Content-Type": 'application/json'} }
    )
  } catch (error) {
    console.error("Youtube Audio API 오류:", error)
    return new Response(JSON.stringify({ error: "Youtube 오디오를 가져오는 데 실패 했습니다."}),
      { status: 500, headers: { "Content-Type": "application/json"}}
    )
  }
}