// hooks/useDetailSpotify.js
"use client";

import { useEffect, useState } from "react";

/**
 * @param {string} id - Spotify의 playlistId 또는 artistId
 * @param {"playlist" | "artist"} type - 데이터를 가져올 유형
 * @returns {object} - { data, loading, error }
 */
export function useDetailSpotify(id, type) {
  console.log('타입:',type,"id:",id)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !type) return;
    console.log('실행됨', {id, type})

    async function fetchData() {
      setLoading(true);
      try {
        let apiUrl = "";

        if (type === "playlist") {
          apiUrl = `/api/spotify-playlist-tracks?playlistId=${id}&market=KR`;
        } else if (type === "artist") {
          apiUrl = `/api/spotify-artists-tracks?artistId=${id}&market=KR`;
        } else if (type === "album") {
          apiUrl = `/api/spotify-albums-tracks?albumId=${id}&market=KR`;
        }

        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`${type} 데이터를 불러오는데 실패했습니다.`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, type]);

  return { data, loading, error };
}
