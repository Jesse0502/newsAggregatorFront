import { server } from "../config/serverConfig";
import axios from "axios";
export const signupApi = async (data: any) => {
  let res =  await (await axios.post(`${server}/signup`, {data}))
  if(res && res.data){ 
    return res.data.msg
  }
}