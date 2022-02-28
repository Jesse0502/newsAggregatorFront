import { BsGlobe } from "react-icons/bs"
import { BsSearch, BsFilm } from "react-icons/bs"
import { GiEarthAfricaEurope, GiTechnoHeart } from "react-icons/gi"
import { IoMdBusiness } from 'react-icons/io'
import { MdSportsBasketball, MdScience, MdFitnessCenter } from "react-icons/md"
import { BiChip } from "react-icons/bi"

export const NewsTabs = [
  { text: "Top Headlines", icon: <BsGlobe size={24} /> },
  { text: "Recently Viewed Stories", icon: <BsSearch size={24} /> }
]

export const LocalNewsTabs = [
  { text: "World", icon: <GiEarthAfricaEurope size={24} /> },
  { text: "Technology", icon: <BiChip size={24} /> },
  { text: "Business", icon: <IoMdBusiness size={24} /> },
  { text: "Sports", icon: <MdSportsBasketball size={24} /> },
  { text: "Science", icon: <MdScience size={24} /> },
  { text: "Health", icon: <MdFitnessCenter size={24} /> },
  { text: "Entertainment", icon: <BsFilm size={24} /> },
]
