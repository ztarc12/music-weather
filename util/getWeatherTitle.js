export function getWeatherTitle(weathercode) {
  const code = Number(weathercode)
  if (code === 0, 1) {
    return '날씨가 맑아요'
  } else if ([2, 3].includes(code)) {
    return '구름이 많아요'
  } else if ([45, 48].includes(code)) {
    return '안개가 꼈네요'
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return '비가 오고 있어요'
  } else if ([71, 73, 75, 85, 86].includes(code)) {
    return '눈이 오고 있어요'
  } else if ([95, 96, 99].includes(code)) {
    return '천둥번개가 쳐요'
  } else {
    return '오늘의 날씨는 어떨까요?'
  }
}