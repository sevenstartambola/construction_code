import React, { useEffect } from 'react'
import "./Banner.css"
import bannerImage from "./../../Images/banner.webp"
import GameInfo from '../GameInfo/GameInfo'
import Disclaimer from '../Disclaimer/Disclaimer'
import Announcement from '../Announcement/Announcement'
// import numberCalled from "./../../Images/numberCalled.gif"

const Banner = (props) => {
  return (
    <div className="projectImages">
      {/* <div>{props.number}</div> */}
      {/* <img src={numberCalled} alt="loading..." /> */}
      <Announcement />
      <Disclaimer />
      <GameInfo />
    </div>
  )
}

export default Banner