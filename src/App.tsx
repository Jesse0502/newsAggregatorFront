
import { ChakraProvider } from "@chakra-ui/react"
import Home from "./Containers/Home/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Containers/Navbar/Navbar" 
import FeedsContext from "./Contexts/HomeContext"

import { useEffect, useState } from "react"
import { BsGlobe } from "react-icons/bs"
import LoadingContext from "./Contexts/IsLoadingContext"
import Signup from "./Containers/Signup/Signup"
import CountryCodeContext from "./Contexts/CountryCode"
import { getHeadlines } from "./apis/headlinesApi/headlines"

function App() {
  const [headlines, setHeadlines] = useState<any>({ text: 'Top Headlines', icon: <BsGlobe size={24} />, search: false, feeds: [] })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let getTopStories = async () => {
      let result: boolean = await getCountryCode()
      if (result) {
        let local: any = localStorage.getItem("time")
        let countryCode: any = JSON.parse(local)
        let res: any = await getHeadlines("topstories", countryCode.countryCode)
        setHeadlines({ text: 'Top Headlines', icon: <BsGlobe size={24} />, search: false, feeds: res })
        setIsLoading(false)
      }
    }

    localStorage.setItem("viewedStories", JSON.stringify([])) 
    getTopStories()
  }, [])


  return (
    <div>
      <ChakraProvider>
        <BrowserRouter>
          <FeedsContext.Provider value={{ val: { tab: headlines, setTab: setHeadlines } }}>
            <LoadingContext.Provider value={{ loading: { state: isLoading, setState: setIsLoading } }}>
              <CountryCodeContext.Provider value={{ time: localStorage.getItem("time") }}>

                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </CountryCodeContext.Provider>
            </LoadingContext.Provider>
          </FeedsContext.Provider>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  )
}

const getCountryCode = () => {
  return fetch("http://ip-api.com/json").then((res) => {
    return res.json()
  }).then((result) => {
    localStorage.setItem("time", JSON.stringify(result))
    return true
  })
}

export default App
