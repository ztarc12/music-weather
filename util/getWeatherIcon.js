export function getWeatherIcon(weathercode) {
  if([0, 1].includes(weathercode)) {
    return 'wi-day-sunny'
  } else if ([2, 3].includes(weathercode)) {
    return 'wi-day-cloudy'
  } else if ([45, 48].includes(weathercode)) {
    return 'wi-fog'
  } else if ([51, 53, 55].includes(weathercode)) {
    return 'wi-sprinkle'
  } else if ([61, 63, 65].includes(weathercode)) {
    return 'wi-rain'
  } else if ([66, 67].includes(weathercode)) {
    return 'wi-rain-mix'
  } else if ([71, 73, 75].includes(weathercode)) {
    return 'wi-snow'
  } else if ([80, 81, 82].includes(weathercode)) {
    return 'wi-showers'
  } else if ([95, 96, 99].includes(weathercode)) {
    return 'wi-thunderstorm'
  } else {
    return 'wi-na'
  }
}