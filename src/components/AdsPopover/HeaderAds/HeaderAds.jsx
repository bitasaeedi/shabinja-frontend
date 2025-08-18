import { Box } from '@mui/material'
import React from 'react'
import adsGif from "./summer-trip.gif"
import { useNavigate } from 'react-router-dom'
export default function HeaderAds() {

    const navigte = useNavigate()
  return (
    <>
         <Box
      component="img"
      src={adsGif}
      alt="Landing animation"
      sx={{
        width: 1,          // 100%
        height: "60px",
        display: "fixed",
        top:0,
        cursor:"pointer"
      }}
      loading="lazy"
      onClick={()=>{navigte("/")}}
    />
    </>
  )
}
