import axios from "axios";
import { server } from "../config/serverConfig"; 

export const postSavedStories = async (data: any, userId: any) => { 
  console.log(data)
  let res = await axios.post(`${server}/save?id=${userId}`, {data}) 
}