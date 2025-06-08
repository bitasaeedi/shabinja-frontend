import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import CustomButton from './CustomButton'
export default function Discount() {
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
              label="هفتگی"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>

            <TextField
              label="ماهانه"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>  


    <CustomButton variant='contained'> ثبت تغییرات</CustomButton>
              
        </Box>
   </>
   )
}
