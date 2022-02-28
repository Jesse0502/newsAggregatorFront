import { server } from "../config/serverConfig"

export let search = (query: string, countryCode: string) => {
  return fetch(`${server}/search?q=${query}&cc=${countryCode}&lim=10`).then((res) => {
    return res.json()
  }).then((result) => {
    return result
  })
}