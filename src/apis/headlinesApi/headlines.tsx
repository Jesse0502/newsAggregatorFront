import { server } from "../config/serverConfig";
import axios from "axios";

export let getHeadlines = async (query: string, countryCode: string = "EU") => {
  return fetch(`${server}?q=${query}&cc=${countryCode}`).then((res) => {
    return res.json()
  }).then((result) => {
    console.log(result)
    return result
  })
}