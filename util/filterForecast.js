export function filterForecast(forecast){
  const today = new Date().toISOString().split("T")[0]

  const indices = forecast.time.map((date, index) => (date >= today ? index : -1)).filter((i) => i !== -1)

  return {
    time: indices.map((i) => forecast.time[i]),
    weathercode: indices.map((i) => forecast.weathercode[i]),
    temperature_2m_max: indices.map((i) => forecast.temperature_2m_max[i]),
    temperature_2m_min: indices.map((i) => forecast.temperature_2m_min[i])
  }
}