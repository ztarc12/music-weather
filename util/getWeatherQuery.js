export function getWeatherQuery(weathercode) {
  if (weathercode === 0) {
    return 'clear sky'
  } else if ([1, 2, 3].includes(weathercode)) {
    return 'partly cloudy'
  } else if ([45, 48].includes(weathercode)) {
    return 'foggy weather'
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weathercode)) {
    return 'rainy weather'
  } else if ([71, 73, 75, 85, 86].includes(weathercode)) {
    return 'showy weather'
  } else if ([95, 96, 99].includes(weathercode)) {
    return 'thunderstorm'    
  } else {
    return 'weather'
  }
}