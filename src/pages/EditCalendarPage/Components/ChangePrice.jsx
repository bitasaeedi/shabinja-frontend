import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
import { sendChangeRequest } from "./SendChangeRequest";

export default function ChangePrice({
  miladiDate,
  staycode,
  handleClosePopover,
}) {
  const [loading, setLoading] = useState(false);
  const [basePrice, setBasePrice] = useState("");
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const [validText, setValidText] = useState("");

  // alert
  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  // api
  const handleChangePrice = async () => {
    //valid
    if (!basePrice || isNaN(Number(basePrice))) {
      return setValidText("قیمت جدید را وارد کنید");
    }

    if (
      !miladiDate ||
      miladiDate.length < 2 ||
      !miladiDate[0] ||
      !miladiDate[1]
    ) {
      return setValidText("بازه تاریخی انتخاب نشده است");
    }

    setValidText("");
    setLoading(true);
    //post api
    const result = await sendChangeRequest({
      HostTourGuid: staycode,
      State: 0,
      PriceBase: basePrice,
      Start: miladiDate[0],
      End: miladiDate[1],
    });

    if (result) {
      setLoading(false);

      setTimeout(() => {
        handleMangeAlert(true, "success", "عملیات با موفقیت انجام شد");
        setTimeout(() => {
          handleClosePopover();
        }, 3000);
      }, 1000);
    } else {
      setLoading(false);
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ".7rem",
          width: "100%",
          mt: 3,
          px: 1,
        }}
      >
        <TextField
          label="قیمت جدید"
          variant="outlined"
          fullWidth
          value={basePrice}
          onChange={(e) => {
            setBasePrice(e.target.value);
          }}
        />

        <Typography
          color="error"
          sx={{ width: "100%", direction: "ltr" }}
          variant="body2"
        >
          {validText}
        </Typography>

        <CustomButton loading={loading} handleChange={handleChangePrice} />
        

        {/* show alert */}
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
  );
}
