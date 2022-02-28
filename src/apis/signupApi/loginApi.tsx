import axios from "axios";
import { server } from "../config/serverConfig";

export const loginApi = async (data: any) => {
  let res = await axios.post(`${server}/login`, {data}) 
  return res
}