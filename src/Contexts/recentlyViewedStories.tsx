import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';

// Creating the context object and passing the default values.
const RecentlyViewedStories: any = React.createContext({recentStory: localStorage.getItem("viewedStories")});

export default RecentlyViewedStories;