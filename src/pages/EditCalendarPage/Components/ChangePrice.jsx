import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import axios from "axios";
import React, { useContext, useState } from 'react'
import CustomButton from './CustomButton'
import { EditCalendarPageContext } from '../EditCalendarPage';
import API_URL from "../../../config/apiConfig";
import moment from 'moment-jalaali';
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
const baseUrl = API_URL;
export default function ChangePrice() {

    const [loading,setLoading]= useState(false);
    const [basePrice, setBasePrice] = useState('');
    const { staycode,selectedDays } = useContext(EditCalendarPageContext);
    const [showAlertSetting, setShowAlertSetting] = useState({
        show: false,
        status: "error",
        message: "خطای نامشخص",
      });
    
      const [validText,setValidText]=useState('');

// alert
    const handleMangeAlert = (show, status, message) => {
        setShowAlertSetting({
          show,
          status,
          message,
        });
      };
// shamsi be miladi
    const handleDate=(shamsi)=>{
        const miladiDate = moment(shamsi, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        return miladiDate
    }
// api
    const handleChangePrice = async ()=>{

    if (!basePrice || isNaN(Number(basePrice))) {
        return setValidText("قیمت جدید را وارد کنید");
    }

    if (!selectedDays || selectedDays.length < 2 || !selectedDays[0] || !selectedDays[1]) {
        return setValidText( "بازه تاریخی انتخاب نشده است");
    }

        try{
             setValidText( "");
            setLoading(true)
            const token = localStorage.getItem("access_token");
            const response = await axios.post(
                `${baseUrl}/PriceHostTour`,
                {
                    HostTourGuid: staycode,
                    State: 0,
                    WeekendPrice: 0,
                    WeekdayPrice: 0,
                    AutumPrice: 0,
                    OtherPrice: 0,
                    PriceBase: basePrice,
                    Start: handleDate(selectedDays[0]),
                    End: handleDate(selectedDays[1]),
                    NotAvailable: false,
                    MonthlyDiscount: 0,
                    WeeklyDiscount: 0,
                    InstantBooking: 0,
                    MinimumBookingDay: 1,
                    MaximumBookingDay: 1,
                    CharterNowDiscount: 1,
                    CharterOneDayAgoDiscount: 1,
                    CharterTwoDayAgoDiscount: 2
                }, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            )

            console.log(response.data)
           setLoading(false)
            setTimeout(() => handleMangeAlert(true, "success", "عملیات با موفقیت انجام  شد") , 1000);
            return response.data;
        }catch (error) {
        console.log("Error:", error?.response);
        setTimeout(() => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد") , 1000);
        return error?.response?.data;
      }

    }


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
              label="قیمت جدید"
              variant="outlined"
              fullWidth 
              value={basePrice}
              onChange={(e)=>{setBasePrice(e.target.value)}}/>

    <Typography color="error"    sx={{ width: "100%", direction: "ltr" }}
  variant="body2">{validText}</Typography>
  
    <CustomButton variant='contained' onClick={() => handleChangePrice()}>
    {loading ? (
            <>
              <CircularProgress
                size={20}
                sx={{
                  color: "white",
                  marginRight: "8px",
                }}
              />
            </>
          ):
         "ثبت تغییرات"}</CustomButton>
    {showAlertSetting?.show && (
          <MyAlertMui
            message={showAlertSetting?.message || ""}
            handleClose={() =>
              handleMangeAlert(
                false,
                showAlertSetting?.status,
                showAlertSetting?.message
              )
            }
            status={showAlertSetting?.status}
          />
        )}
              
        </Box>
   </>
  )
}
