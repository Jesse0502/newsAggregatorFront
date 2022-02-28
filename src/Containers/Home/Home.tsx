import { Box, CircularProgress, CloseButton, Flex, HStack, Progress, ProgressLabel } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BsGlobe } from 'react-icons/bs'
import Headlines from '../../Components/Home/Headlines'
import HomeSideBar from '../../Components/Home/HomeSideBar'
import Weather from '../../Components/Home/Weather'
import FeedsContext from '../../Contexts/HomeContext'
import LoadingContext from '../../Contexts/IsLoadingContext'
import { getTopicId } from '../../Components/Helper/tabTopicId'
import { getHeadlines } from '../../apis/headlinesApi/headlines'
import CountryCodeContext from '../../Contexts/CountryCode'
import RecentlyViewedStories from '../../Contexts/recentlyViewedStories' 
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import useAuth from '../../customHooks/useAuth'
import { getSavedStories } from '../../apis/savedStories/getSavedStories'

function Home() { 
  let val: any = useContext(FeedsContext)
  let loading: any = useContext(LoadingContext)
  let viewdStories: any = localStorage.getItem("viewedStories")
  let countryCode: any = useContext(CountryCodeContext)
  let cc: any = JSON.parse(countryCode.time)
  let localViewed: any = JSON.parse(viewdStories)
  const [recentStory, setRecentStory] = useState<any>(localViewed)
  const [selectedTab, setSelectedTab] = useState<any>({ text: 'Top Headlines', icon: <BsGlobe size={24} /> })
  const [showAlert, setShowAlert] = useState(false)
  
  let {authInfo} = useAuth()

  const handleChangeTab: (tab: any) => void = async (tab: any) => {
    
    if(tab.text === 'Recently Viewed Stories'){ 
      if(!authInfo || typeof authInfo == undefined || authInfo == null){
        setShowAlert(true)
        return;
      } else {
        loading.loading.setState(true)
        let res = await getSavedStories(authInfo.id) 
        val.val.setTab({ text: tab.text, icon: tab.icon, search: false, feeds: res.Data})
        loading.loading.setState(false)
        return;
      }
      
    } 
    loading.loading.setState(true)
    let topicId: any = getTopicId(tab.text)
    let res = await getHeadlines(topicId, cc.countryCode)
    if (res) {
      loading.loading.setState(false)
      setSelectedTab(tab)
      val.val.setTab({ text: tab.text, icon: tab.icon, search: false, feeds: res })
    }
  }

  return (
    <>
    {showAlert && <Alert status='error' zIndex={999} pos='absolute'>
  <AlertIcon />
  <AlertTitle mr={2}>Access Denied!</AlertTitle>
  <AlertDescription>You need to create an account to use that feature.</AlertDescription>
  <CloseButton position='absolute' right='8px' top='8px' onClick={() => setShowAlert(false)}/>
</Alert>}
      <RecentlyViewedStories.Provider value={{recentStory, setRecentStory}}>
      {loading.loading.state &&
        <Progress isIndeterminate size={'xs'}></Progress>
      }
        <Flex 
        gap={{lg: 8, base: 0}}
        justify={'space-between'} 
        pos='relative' opacity={loading.loading.state ? 0.3 : 1} pointerEvents={loading.loading.state ? "none" : 'all'}>
          <HomeSideBar handleChangeTab={handleChangeTab} selectedTab={selectedTab} />

          <Headlines />
          <Weather />
        </Flex>
      </RecentlyViewedStories.Provider>
    </>
  )
}

export default Home