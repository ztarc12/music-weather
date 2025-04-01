'use client'

import Skeleton from "react-loading-skeleton";

export default function SkeletonMain() {
  const dummyData = [1, 2, 3, 4, 5, 6]
  return (
    <div className="main-section">
      <div className="skeleton-bg">
        <div className="bg-cover-none">
          <div className="main-cont skeleton-main-cont">
            <div className="weather-cont">
              <h2 className="content-title">
                날씨정보가 없어요<br/>
                날씨에 맞는 음악 추천해드릴게요
              </h2>
              <DummyList dummyData={dummyData}/>
            </div>
            <div className="playlist-cont">
              <h2 className="content-title">
                오늘 날씨에 맞는 플레이리스트
              </h2>
              <DummyList dummyData={dummyData}/>
            </div>
            <div>
              <h2 className="content-title">
                관련된 노래를 누가 불렀을까요?
              </h2>
              <DummyList dummyData={dummyData}/>
            </div>
            <div className="albums-cont">
              <h2 className="content-title">
                관련된 앨범은 무엇일까요?
              </h2>
              <DummyList dummyData={dummyData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DummyList({dummyData}){
  return (
    <ul className="dummy-list">
      {
        dummyData.map((item, index)=>{
          return(
            <li key={index} className="test">
              <Skeleton height={30} width={300} baseColor="#e0e0e0" highlightColor="#f5f5f5"/>
            </li>
          )
        })
      }
    </ul>
  )
}