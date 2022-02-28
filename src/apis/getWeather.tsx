export const getWeather = (data: any) => {
  console.log("Fetching weather...")

  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=94741077689797a5a19ea84ea7ea2ce2`).then((res) => {
    console.log("inside fetch")
    return res.json()
  }).then((result) => {
    return ({ current: result.current, daily: result.daily.splice(0, 5) })
  })
}