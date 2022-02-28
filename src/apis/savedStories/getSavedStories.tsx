import axios from "axios";
import { server } from "../config/serverConfig"; 

export const getSavedStories = async (userId: any) => { 
  let res = await axios.get(`${server}/save?id=${userId}`) 
  return res.data
}