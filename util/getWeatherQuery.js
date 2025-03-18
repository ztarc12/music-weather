export function getWeatherQuery(weathercode) {
  if ([0, 1].includes(weathercode)) {
    return 'clear sky'
  } else if ([2, 3].includes(weathercode)) {
    return 'cloudy'
  } else if ([45, 48].includes(weathercode)) {
    return 'misty'
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weathercode)) {
    return 'rainy'
  } else if ([71, 73, 75, 85, 86].includes(weathercode)) {
    return 'winter snow'
  } else if ([95, 96, 99].includes(weathercode)) {
    return 'thunderstorm'    
  } else {
    return 'weather'
  }
}