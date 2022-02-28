import React, { useEffect, useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

function SignupPage(props: any) {

  let { switchTo, handleSignup, loader, showError } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword); 
  
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
 
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      justifyContent="center"
      bg='blackAlpha.100'
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.600">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSignup}>
            <Stack
              spacing={4}
              p="1rem"
              border='1px'
              bg='white'
              rounded={10}
              borderColor='blackAlpha.200'
              color='black'
              boxShadow="md"
            >
              <FormControl >
              <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.500" />}
                  />
                  <Input type="text" placeholder="Name" isRequired />
                </InputGroup>
                <InputGroup mt='2'>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Link fontWeight={'semibold'} fontSize='xl' color="gray.500" >@</Link>}
                  />
                  <Input type="email" placeholder="email address" isRequired/>
                </InputGroup>
              
                <InputGroup my='2'>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.500" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    isRequired
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.500" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Passoword"
                    isRequired
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
              isDisabled={loader}
              isLoading={loader}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Signup
              </Button>
              {showError && <Box color='red'>{showError}</Box>}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already a member?{" "}
        <Link color="blue.500" onClick={() => switchTo()}>
          Login
        </Link>
      </Box>
    </Flex>
  )
}

export default SignupPage