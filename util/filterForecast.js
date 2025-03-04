export function filterForecast(forecast){
  const today = new Date().toISOString().split("T")[0]

  const indices = forecast.time.map((date, index) => (date >= today ? index : -1)).filter((i) => i !== -1)

   const filteredData = {
    time: indices.map((i) => forecast.time[i]),
    weathercode: indices.map((i) => forecast.weathercode[i]),
    temperature_2m_max: indices.map((i) => forecast.temperature_2m_max[i]),
    temperature_2m_min: indices.map((i) => forecast.temperature_2m_min[i])
  }

  const requireDays = 7 - filteredData.time.length

  if (requireDays > 0) {
    console.log(`추가 데이터 필요: ${requireDays}일`)
    return { ...filteredData, needMoreDate: true}
  }
  return filteredData
}