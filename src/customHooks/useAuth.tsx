import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
function useAuth() { 
  const [authInfo, setAuthInfo] = useState<any>();
  useEffect(() => {
    const token = localStorage.token
    if (token) {
      let user = jwt_decode(token);
      if (user) {
        setAuthInfo(user);
      }
    }
  }, []);
  return { authInfo };
}

export default useAuth;