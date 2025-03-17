export function getUserLocation(){
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          reject(error)
        }
      )
    } else {
      reject(new Error("Geolocation이 현재 브라우저에서 지원되지 않습니다."))
    }
  })
}