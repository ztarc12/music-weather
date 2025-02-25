"use client"

import Link from "next/link"

export default function Menu({ forecast }){
  return (
    <div className="menu-bar">
      <ul className="menu-box">
        <li><Link href={'/'}>HOME</Link></li>
        <li><Link href={'/playlists'}>플레이리스트</Link></li>
        <li><Link href={'/artists'}>아티스트</Link></li>
        <li><Link href={'/albums'}>앨범</Link></li>
    </ul>
    </div>
  )
}