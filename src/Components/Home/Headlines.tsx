import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import SingleNews from './SingleNews'
import FeedsContext from '../../Contexts/HomeContext'
import LoadingContext from '../../Contexts/IsLoadingContext'
import useAuth from '../../customHooks/useAuth'
import {dialogueBoxText} from '../Helper/dialogueBox'

function Headlines() {
  let {authInfo} = useAuth()
  const [showPopup, setShowPopup] = useState(authInfo === undefined)
  
  let val: any = useContext(FeedsContext)
  let loading: any = useContext(LoadingContext)
  let CurrentTab: any = val.val.tab
  
  if (loading) {
    window.scrollTo(0, 0)
  }
  
  return (
    <Box w={{base: "max", lg:'2xl'}} mr={{base:'3', lg: '0'}}>
      <HStack mt='12' mb='3'>
        {CurrentTab.icon}
        <Text fontWeight={'bold'} fontSize={'3xl'} >
          {CurrentTab.text}
        </Text>
      </HStack>
      {(showPopup && dialogueBoxText(CurrentTab.text) ) &&
        <Flex mb='3' border='1px solid' borderColor={'gray.400'} rounded='lg' alignItems={'center'} p='3' justify={'space-between'}>
           
          <Text fontWeight={'semibold'}>
           {dialogueBoxText(CurrentTab.text)}
          </Text>
           
          <Box rounded='xl' _hover={{ color: 'black' }} onClick={() => setShowPopup(false)} color='blackAlpha.800' cursor={'pointer'}>
            <MdCancel size={28} />
          </Box>
        </Flex>}
      <Box >
        {CurrentTab.feeds && CurrentTab.feeds.map((a: any, b: number) => (
          <SingleNews key={b} data={a} />
        ))
        }
      </Box>
    </Box>
  )
}

export default Headlines