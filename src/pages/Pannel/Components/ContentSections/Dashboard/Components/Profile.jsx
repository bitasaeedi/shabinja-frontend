import { Box, Typography,Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({isMobile}) {
  const navigate = useNavigate();
  return (
    <>
    {isMobile?
    <>
       <Box
        className="shadow borde rounded"
        sx={{ height: "180px", width: "100%", padding:" 1rem 1.5rem"}}
      >
        <Box sx={{display:"flex",justifyContent:"space-between",gap:"1rem", alignItems:"center"}}> 
          <Box sx={{width:"80px",height:"80px",borderRadius:"50%", backgroundColor:"#e4e3e3"}}></Box>
          <Box sx={{textAlign:"center"}}>
            <Typography variant="h6" sx={{mb:1}}>محمد محمدی</Typography>
            <Typography variant="body2">پروفایل شما کامل <span style={{color:"red"}}>نیست</span></Typography>
          </Box>
        </Box>

        <Box sx={{display:"flex",justifyContent:"space-between",gap:"1rem", alignItems:"center",mt:3}}>
          <Typography>پروفایل میزبان</Typography>
          <Typography>50%</Typography>
          <Button  variant="contained" onClick={()=>{navigate("/account/profile")}}>ویرایش</Button>
        </Box>

      </Box>
    </>:<>
    <Box
        className="shadow borde rounded"
        sx={{ height: "230px", width: "300px", padding:"2rem"}}
      >
        <Box sx={{display:"flex",justifyContent:"space-between",gap:"1rem", alignItems:"center"}}> 
          <Box sx={{width:"80px",height:"80px",borderRadius:"50%", backgroundColor:"#e4e3e3"}}></Box>
          <Box sx={{textAlign:"center"}}>
            <Typography variant="h6" sx={{mb:1}}>محمد محمدی</Typography>
            <Typography variant="body2">پروفایل شما کامل <span style={{color:"red"}}>نیست</span></Typography>
          </Box>
        </Box>

        <Box sx={{display:"flex",justifyContent:"space-between",gap:"1rem", alignItems:"center",mt:5}}>
          <Typography>پروفایل میزبان</Typography>
          <Typography>50%</Typography>
          <Button  variant="contained" onClick={()=>{navigate("/account/profile")}}>ویرایش</Button>
        </Box>

      </Box>
    </>}
  
    </>
  );
}
