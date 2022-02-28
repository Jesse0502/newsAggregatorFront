import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';

// Creating the context object and passing the default values.
const CountryCodeContext: any = React.createContext({
  time: localStorage.getItem("time")
});

export default CountryCodeContext;