export function getWeatherQuery(weathercode) {
  const code = Number(weathercode)
  if (code === 0) {
    return 'clear sky'
  } else if ([1, 2, 3].includes(code)) {
    return 'cloudy'
  } else if ([45, 48].includes(code)) {
    return 'misty'
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return 'rainy'
  } else if ([71, 73, 75, 85, 86].includes(code)) {
    return 'showy'
  } else if ([95, 96, 99].includes(code)) {
    return 'thunderstorm'    
  } else {
    return 'weather'
  }
}