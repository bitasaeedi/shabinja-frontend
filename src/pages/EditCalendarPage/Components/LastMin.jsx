import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
export default function LastMin() {
  const [basePrice, setBasePrice] = useState('');
  return (
   <>
        <Box 
            sx={{display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:'1rem',
                width:'100%',
                mt:3,
                px:1,
            }}
        >
            <TextField
              label="همان لحظه"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>

              <TextField
              label="یک روز قبل"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>

              <TextField
              label="دو روز قبل"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>


    <CustomButton variant='contained'> ثبت تغییرات</CustomButton>
              
        </Box>
   </>
  )
}
