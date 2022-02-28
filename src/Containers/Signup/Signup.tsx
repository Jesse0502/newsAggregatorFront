import React, { useState } from "react";
import LoginPage from "../../Components/Signup/LoginPage";
import SignupPage from "../../Components/Signup/SignupPage";
import { useToast } from '@chakra-ui/react';
import {signupApi} from "../../apis/signupApi/signupApi"
import {loginApi} from '../../apis/signupApi/loginApi';

const Signup = () => {
  const [switchPage, setSwitchPage] = useState<boolean>(false)
  const switchTo = () => {
    setSwitchPage(!switchPage)
    setShowError("")
  }
  let toast = useToast()
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState("")

  const handleSignup = async (e: any) => {
    try {

      e.preventDefault()
      setLoader(true)
      setShowError("") 
      if(e.target[2].value !== e.target[4].value){
        setShowError("Passwords must match!")
        return 1;
      }
      let formData = {
      Name: e.target[0].value.trim(),
      Email: e.target[1].value.trim(),
      Password: e.target[2].value.trim()
    }
    let res: any = await signupApi(formData) 
    if(res){
      setLoader(false)
      if(res.includes("Added")){
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        })
        setSwitchPage(!switchPage)
      } else {
        setShowError(res)
      }
      
    } else {
      setLoader(false)
      
    }
  } catch(error){
    
    setLoader(false)
  }
  }

  const handleLogin = async (e: any) => {
    try {

      e.preventDefault()
      setLoader(true)
      setShowError("")
      let form = {
        Email: e.target[0].value,
        Password: e.target[1].value,
      }
      let res = await (await loginApi(form)).data
      if(typeof res == 'string' && res.includes("found")){
        setLoader(false)
        setShowError("No existing user with that email!")
        return;
      } else if (typeof res == 'string' && res.includes("incorrect")){
        setLoader(false)
        setShowError("Either Email or Password is incorrect!")
        return;
      } 
      setLoader(false) 
      localStorage.setItem("token", res.Token)
      window.location.href='/'
    } catch(error: any){
      setLoader(false)
      setShowError(error.message)
    }
  }
  return (
    <>
    {
      switchPage 
      ? 
      <SignupPage 
      switchTo={switchTo} 
      handleSignup={handleSignup}
      showError={showError}
      loader={loader} 
      />
      :
      <LoginPage 
      switchTo={switchTo}
      handleLogin={handleLogin}
      showError={showError}
      loader={loader} 
      />
    }
    </>
  );
};

export default Signup;
