import React from "react";
import errorImg from "./Lost in Travel Scenery 404.png";
import { Box ,Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate =useNavigate()
  return (
    <>
     <Box
     sx={{
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        bgcolor:"#FAFAF9",
        height:"100vh",
        pt:{xs: 16, md:8}
     }}
     >
        {/* img */}
        <Box
        component='img'
        src={errorImg}
        alt="404"
        sx={{
            width:{xs:"310px" , md:"550px"} , 
            // height:"500px"
        }}
        />
        {/* text */}
        <Typography variant="h5">
            صحفه مورد نظر یافت نشد
        </Typography>

        <Button variant="contained" sx={{mt:4}} onClick={()=>{navigate("/")}}>
            بازگشت به صحفه اصلی
        </Button>

     </Box>
    </>
  );
}
