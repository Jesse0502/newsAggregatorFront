import { BsCloudFill, BsCloudDrizzleFill, BsSunFill, BsCloudLightningRainFill, BsSnow2, BsCloud, BsMoon, BsMoonFill } from 'react-icons/bs'
import { format } from 'date-fns'
import { endOfDay } from 'date-fns/esm'

export const getWeatherIcon = (index: any, size: number) => {
  if (index === "Clear") {
    return <BsSunFill color='yellow' size={size} />
  } else if (index === "Clouds") {
    return <BsCloudFill color='lightblue' size={size} />
  } else if (index === "Rain") {
    return <BsCloudDrizzleFill color='#2B6CB0' size={size} />
  } else if (index === "Thunderstorm") {
    return <BsCloudLightningRainFill color='blue' size={size} />
  } else if (index === "Snow") {
    return <BsSnow2 color='lightblue' size={size} />
  } else {
    return <BsMoonFill color='yellow' size={size} />
  }
}

export const getWeatherDay = (index: any) => {
  let currentDay: any = new Date().getDay()
  let week = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]
  let weekShow = index + currentDay
  if (weekShow >= 7) { 
    return week[weekShow - (week.length)]
  }
  return week[weekShow]
}