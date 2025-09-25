import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReservationStayContext } from "../../pages/ReservationStay/ReservationStay";
import API_URL from "../../config/apiConfig";
const baseUrl = API_URL;

function showPrice(title, price) {
  let priceToShow = price?.toLocaleString() || 0;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "14px" }} variant="body2">
        {title}
      </Typography>
      <Typography sx={{ fontSize: "14px" }} variant="body2">
        {priceToShow} تومان
      </Typography>
    </Box>
  );
}

export default function WalletPayment() {
  const { infoOfReserve = {} ,handleWithdraw, handleMangeAlert , handleClosePopover , handleSetTrackingCode } = useContext(ReservationStayContext);
  const [balance, setBalance] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  // console.log("balance", infoOfReserve);

  // get balance
  const getDate = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/Wallet/Inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("balance data", response?.data?.data);
      setBalance(response?.data?.data);
    } catch (error) {
      console.error(
        "Error fetch balance:",
        error?.response?.data || error.message
      );
    }
  };

  const handleMangeWithdraw = async () => {
    setIsLoading(true);
    // try {
    //   const token = localStorage.getItem("access_token");

    //   const response = await axios.get(
    //     `${baseUrl}/HostTourOrder/Payment/${infoOfReserve?.guid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log("withdraw data", response?.data?.data);
    //   setWithdraw(response?.data?.data);

    //   if (response?.data?.data?.state === "Success") {
    //     handleClosePopover();
    //     handleMangeAlert(true, "success", "برداشت از کیف پول با موفقیت انجام شد");
    //     handleSetTrackingCode(response?.data?.data?.trackingCode);
    //   } else {
    //    // window.location.href = response?.data?.data?.link
    //    handleMangeAlert(true, "success", "انتقال به درگاه با موفقیت انجام شد");
    //    console.log("response?.data?.data?.link", response?.data?.data?.link);
    //   }
    // } catch (error) {
    //   console.error(
    //     "Error fetch balance:",
    //     error?.response?.data || error.message
    //   );
    // } finally {
    //   setIsLoading(false);
    // }
    await handleWithdraw();
    setIsLoading(false);

  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: {xs:"1rem 1rem 0" , md:"1rem 2rem 0"},
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            border: "1px solid #e0e0e0",
            padding: "20px 20px",
            borderRadius: "10px",
          }}
        >
          {/* مبلغ قابل پرداخت */}
          {showPrice("مبلغ قابل پرداخت", infoOfReserve?.mainPrice)}

          {/* موجودی کیف پول */}
          {showPrice("موجودی کیف پول", balance?.withdrawableInventory)}

          {/* کسری کیف پول */}
          {Number(infoOfReserve?.mainPrice) >
          Number(balance?.withdrawableInventory)
            ? showPrice(
                "کسری کیف پول",
                infoOfReserve?.mainPrice - balance?.withdrawableInventory
              )
            : showPrice("کسری کیف پول", 0)}
        </Box>

        {Number(infoOfReserve?.mainPrice) < Number(balance?.withdrawableInventory) ? (
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              handleMangeWithdraw();
            }}
            disabled={isLoading}
            sx={{ width: {xs:"70%" , md:"50%"}, margin: "1.5rem auto 0" }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                در حال پردازش...
              </>
            ) : (
              "برداشت از کیف پول"
            )}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              handleMangeWithdraw();
            }}
            disabled={isLoading}
            sx={{ width: "50%", margin: "1.5rem auto 0" }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                در حال پردازش...
              </>
            ) : (
              "انتقال به درگاه"
            )}
          </Button>
        )}
       
        {/* {resultText && (
          <Typography
            sx={{
              fontSize: "14px",
              color: resultText?.color,
              textAlign: "center",
              mt: 1,
            }}
            variant="body2"
          >
            {resultText?.title}
          </Typography>
        )} */}
      </Box>
    </>
  );
}
