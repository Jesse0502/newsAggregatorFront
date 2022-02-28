import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CountryCodeContext from '../../Contexts/CountryCode'
import { getWeatherIcon, getWeatherDay } from '../Helper/weatherIcon'
import { getWeather } from '../../apis/getWeather'
import LoadingContext from '../../Contexts/IsLoadingContext'
import RecentlyViewedStories from '../../Contexts/recentlyViewedStories'

function Weather(props: any) {
  let isLoading = useContext(LoadingContext)
  let [weather, setWeather] = useState<any>(null)
  let CountryCode: any = useContext(CountryCodeContext)
  let data: any = JSON.parse(CountryCode.time)
  let [recentlyViewed, setRecentStories] = useState([])
  let recentStoriesCtx: any = useContext(RecentlyViewedStories)
  setTimeout(() => { 
    setRecentStories(recentStoriesCtx.recentStory)
    console.log(recentStoriesCtx.recentStory)
  }, 500)
  
  useEffect(() => { 
    
    async function getData() {
      let fetchData: any = await getWeather(data);
      setWeather(fetchData);
    }
    if(weather === null){
      getData();
    }

  });

  let currentWeather: { temp: any; main: any } = {
    temp: weather?.current?.feels_like,
    main: weather?.current.weather[0].main
  }
  return (
    <Box pos='relative' w='72' display={{base: "none", md: 'block'}}>
      <Box pos='fixed' top='20' right='8' overflow={'hidden'} >
        {weather && <Box shadow={'lg'} py='5' px='5' rounded={'2xl'} border='1px solid' borderColor={'blackAlpha.200'} >
          <Text fontSize={'lg'}>
            Weather today in <Text as={'span'} fontWeight={'bold'}> {data.city}</Text>
          </Text>
          <HStack justify={'space-evenly'} pt='3'>
            <Text fontSize={'4xl'} fontWeight='bold'>{(currentWeather.temp - 273.15).toFixed(0)}°C</Text>
            {getWeatherIcon(currentWeather.main, 64)}
          </HStack>
          <HStack justify={'space-around'} gap='1' pt='5'>
            {weather.daily.map((a: any, b: number) => (
              <VStack key={b}>
                <Text>{getWeatherDay(b)}</Text>
                <Box color='blue'>
                  {getWeatherIcon(a.weather[0].main, 28)}
                </Box>
                <Text fontSize={'sm'} fontWeight='hairline'>
                  {(a.temp.day - 273.15).toFixed(0)}°C
                </Text>
              </VStack>
            ))
            }

          </HStack>
        </Box>}
        <Box
          mt='5'
          w='64'
          fontWeight="normal"
          roundedRight={'96vh'}
        >
          <Text fontWeight={'bold'} fontSize='xl' >Recently viewed Stories</Text>
          <VStack gap={1} mt='5' textAlign={'left'}>
            {recentlyViewed && recentlyViewed.map((a: any, b: number) => (
              <Link
              key={b}
              textAlign={'left'}
              color='blackAlpha.700'
              _hover={{color: "blackAlpha.900"}}
              target={'_blank'}
              href={a.link}
                noOfLines={2}
                textOverflow={'ellipsis'}
                fontWeight='semibold'
              >
                {a.heading}
              </Link>
            ))
            }
          </VStack>
            {(!recentlyViewed || recentlyViewed.length === 0) && (
              <Text textAlign={'left'} color='blackAlpha.700'>Nothing to see here..</Text>
            )}
        </Box>
      </Box>
    </Box>
  )
}

export default Weather