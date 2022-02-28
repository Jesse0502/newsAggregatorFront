import { Box, Heading, Text, HStack, Divider, VStack, Flex } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { NewsTabs, LocalNewsTabs } from '../../Constants/NewsTabs' 
import FeedsContext from '../../Contexts/HomeContext' 

function HomeSideBar(props: any) {
  let handleChangeTab = props.handleChangeTab
  const val: any = useContext(FeedsContext)
  const select: any = val.val.tab
  return (

    <Box color='blackAlpha.700' w='xs' pos='relative' overflow={'auto'} pr='8' py='2' >
      <Box pos='fixed' overflow={'auto'} h='90vh' py='3' borderRight={'1px'}
        w={{ base: '10vh', md: "xs" }}
        pr='3'
        overflowWrap={'break-word'}
        borderColor='blackAlpha.300' shadow='lg'>
        {NewsTabs.map((a, b) => (
          <HStack
            key={b}
            onClick={() => handleChangeTab(a)}
            bg={(select.text === a.text) ? "blue.50" : ""}
            color={(select.text === a.text) ? "blue.600" : ""}
            my='1'
            fontWeight="normal"
            shadow={select.text === a.text ? "sm" : ''}
            cursor='pointer'
            transition={'0.2s'}
            _hover={{ bg: 'blue.50' }}
            roundedRight={'96vh'}
            p='2'
            pl='6'
          >
            {a.icon}
            <Text fontSize={16} display={{base: 'none', md: 'contents'}}>{a.text}</Text>
          </HStack>
        ))
        }
        <Divider my='5'></Divider>

        {
          LocalNewsTabs.map((a, b) => (
            <HStack
              key={b}
              onClick={() => handleChangeTab(a)}
              bg={(select.text === a.text) ? "blue.50" : ""}
              color={(select.text === a.text) ? "blue.600" : ""}
              transition={'0.2s'}
              my='1'
              fontWeight="normal"
              cursor='pointer'
              roundedRight={'96vh'}
              p='2'
              _hover={{ bg: 'blue.50' }}
              pl='6'>
              {a.icon}
              <Text
              display={{base: 'none', md: 'contents'}}
                fontSize={16}
                color={(select.text === a.text) ? "blue.600" : ""}
              >{a.text}</Text>
            </HStack>
          ))}
        <Divider mt='5'></Divider>

      </Box>
    </Box >
  )

}

export default HomeSideBar