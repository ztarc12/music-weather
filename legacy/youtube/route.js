// import axios from "axios"

// export async function GET(req) {
//   const { searchParams } = new URL(req.url)
//   const trackName = searchParams.get('track')
//   const artistName = searchParams.get('artist')
//   const apiKey = process.env.YOUTUBE_API_KEY

//   if(!trackName || !artistName) {
//     return new Response(JSON.stringify({ error: '트랙명과 아티스트명이 필요합니다'}),
//       { status: 400, headers: { "Content-Type": "application/json"}}
//     )
//   }
//   try {
//     const query = `${trackName} ${artistName} official audio`
//     const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//         part: 'snippet',
//         q: query,
//         maxResults: 1,
//         type: 'video',
//         key: apiKey
//       }
//     })
//     if (response.data.items.length === 0) {
//       return new Response(JSON.stringify({ error: 'Youtube에서 검색 결과를 찾을 수 없습니다.'}),
//         { status: 404, headers: { "Content-Type": "application/json"}}
//       )
//     }
//     const videoId = response.data.items[0].id.videoId
//     const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`
//     return new Response(JSON.stringify({ youtubeUrl, videoId }),
//       { status: 200, headers: { "Content-Type": "application/json"}}
//     )
//   } catch(error) {
//     console.error('Youtube API 오류:', error)
//     return new Response(JSON.stringify({ error: 'Youtube 검색에 실패했습니다.'}),
//       { status: 500, headers: { "Content-Type": "application/json"}}
//     )
//   }
// }
// import ytdl from "ytdl-core-discord"

// export async function GET(req) {
//   const { searchParams } = new URL(req.url)
//   const videoId = searchParams.get('videoId')

//   if(!videoId) {
//     return new Response(JSON.stringify({ error: 'videoId 파라미터가 필요합니다.' }),
//       { status: 400, headers: { "Content-Type": "application/json"}}
//     )
//   }
//   try {
//     console.log(`유튜브 비디오 ID: ${videoId}`)
//     if (!ytdl.validateID(videoId)) {
//       console.error('유효하지 않은 videoId입니다.')
//       return new Response(JSON.stringify({ error: '유효하지 않은 videoId입니다.' }),
//         { status: 400, headers: { "Content-Type": "application/json"}}
//       )
//     }

//     // const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`)
//     const info = await ytdl.getInfo(videoId)
//     console.log("유튜브 비디오 정보:", info);

//     // const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
//     const audioFormats = info.formats.filter(format => format.mimeType.includes('audio/mp4'))
//     console.log("오디오 스트림 목록:", audioFormats);

//     if (!audioFormats.length) {
//       console.error('오디오 스트림을 찾을 수 없어요')
//       return new Response(JSON.stringify( {error: '오디오 스트림을 찾을 수 없습니다.' }),
//         { status: 404, headers: { "Content-Type": 'application-json' }}
//       )
//     }
//     // const audioStream = await ytdl.downloadFromInfo(info, { filter: "audioonly" });
//     // const bestAudio = audioFormats.find((format) => format.audioBitrate) || audioFormats[0]
//     // const bestAudio = audioFormats.reduce((prev, curr) => (prev.bitrate > curr.bitrate ? prev : curr));
//     const bestAudio = audioFormats[0]
//     return new Response(JSON.stringify({ audioUrl: bestAudio.url }),
//       { status: 200, headers: {"Content-Type": 'application/json'} }
//     )
//   } catch (error) {
//     console.error("Youtube Audio API 오류:", error)
//     return new Response(JSON.stringify({ error: "Youtube 오디오를 가져오는 데 실패 했습니다."}),
//       { status: 500, headers: { "Content-Type": "application/json"}}
//     )
//   }
// }
import { exec } from "child_process"
import util from "util"
import { NextResponse } from "next/server"

const execPromise = util.promisify(exec)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId')

  if(!videoId) {
    return new Response(JSON.stringify({ error: 'videoId 파라미터가 필요합니다.' }),
      { status: 400 }
    )
  }
  try {
    console.log(`유튜브 비디오 ID: ${videoId}`)

    const { stdout } = await execPromise(`yt-dlp -g bestaudio "https://www.youtube.com/watch?v=${videoId}`)

    if (!stdout) {
      console.error('오디오 url을 찾을수 없습니다.')
      return NextResponse.json({ error: '오디오 url을 찾을 수 없습니다.'}, { status: 404 })
    }

    return NextResponse.json({ audioUrl: stdout.trim() }, { status: 200})
  } catch (error) {
    console.error("Youtube Audio API 오류:", error)
    return new Response(JSON.stringify({ error: "Youtube 오디오를 가져오는 데 실패 했습니다."}),
      { status: 500, headers: { "Content-Type": "application/json"}}
    )
  }
}