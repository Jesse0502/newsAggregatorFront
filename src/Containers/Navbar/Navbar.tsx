import { Avatar, Box, Button, Center, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Progress, Text, VStack } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import FeedsContext from '../../Contexts/HomeContext'
import LoadingContext from '../../Contexts/IsLoadingContext'
import { useNavigate } from 'react-router-dom'
import { search } from '../../apis/searchApi/searchApi'
import CountryCodeContext from '../../Contexts/CountryCode'
import useAuth from '../../customHooks/useAuth'
import { BsMenuDown } from 'react-icons/bs'

function Navbar(props: any) {
  let {authInfo} = useAuth()  
  let val: any = useContext(FeedsContext)
  let loading: any = useContext(LoadingContext)
  let data: any = localStorage.getItem("time")
  let CountryCode: any = JSON.parse(data)
  let [input, setInput] = useState("")
  let navigate = useNavigate()
  let handleSearch: (e: any) => void = async (e: any) => {
    e.preventDefault()
    loading.loading.setState(true) 
    let res: any = await search(input, CountryCode.countryCode)
    setInput("")
    if (res) {
      val.val.setTab({ text: "Search", icon: "", search: true, feeds: res })
      loading.loading.setState(false)
    }
  }

  const redirectToSignup = () => {
    navigate('/signup')
  }

  const redirectToHome = () => {
    navigate('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <Box pb='14' h='16' pos='relative' zIndex={999}>
        <HStack pos={'fixed'} h='16' w='100%' justify={'space-between'} px='5' shadow={'lg'} bg='white'  >
          <Heading color={'blue.600'} onClick={redirectToHome} cursor='pointer'>
            News Aggregator
          </Heading>
          <Box display={{base: "none", lg: 'block'}}>

          <form onSubmit={handleSearch}>

            <InputGroup w='96vh'
              h='12' alignItems={'center'}>
              <InputLeftElement
                _hover={{ bg: 'blackAlpha.50', cursor: 'pointer' }}
                my='1'
                onClick={handleSearch}
                alignItems={'center'}
                children={
                  <BiSearch color={'gray'} size={26} />
                }
                />
              <Input
                type='text'
                color='gray.700'
                value={input}
                placeholder='Search for keywords, topics & sources'
                onChange={(e: any) => setInput(e.target.value)}
                />
            </InputGroup>
          </form>
          </Box>
          {(!authInfo || authInfo === undefined) && (
            <Button bg='blue.500' color='white' _hover={{}} _active={{}} onClick={redirectToSignup}>Sign In</Button>
            )}
          {(authInfo || authInfo !== undefined) && (
            <Menu> 
            <Avatar as={MenuButton} src={`data:image/svg+xml;base64, ${authInfo.avatar}`} /> 
            <MenuList>
              <Text p='3'> <b> {authInfo.name.toUpperCase()}  </b> </Text>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
          )}
           
        </HStack>
      </Box>
      
    </>

  )
}

export default Navbar