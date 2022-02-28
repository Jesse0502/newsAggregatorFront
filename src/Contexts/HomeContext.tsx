import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';

// Creating the context object and passing the default values.
const FeedsContext: any = React.createContext({
  tab: { text: "Top Headlines", icon: <BsGlobe size={24} />, search: false, feeds: [] },
});

export default FeedsContext;