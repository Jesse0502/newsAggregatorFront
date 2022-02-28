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
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

function LoginPage(props: any) {
  let {
  switchTo,
  handleLogin,
  loader,
  showError,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword)
  
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
          <form onSubmit={handleLogin}>
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
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.500" />}
                  />
                  <Input type="email" placeholder="email address" isRequired/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
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
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                isLoading={loader}
                isDisabled={loader}
              >
                Login
              </Button>
              {showError && <Box color='red'>{showError}</Box>}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New here?{" "}
        <Link color="blue.500" onClick={() => switchTo()}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default LoginPage