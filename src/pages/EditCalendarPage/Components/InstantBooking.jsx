import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
import { sendChangeRequest } from "./SendChangeRequest";

export default function InstantBooking({
  miladiDate,
  staycode,
  handleClosePopover,
}) {
  const [loading, setLoading] = useState(false);
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
  const handleChange = async () => {
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
      State: 4,
      InstantBooking: true,
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
          gap: "1rem",
          width: "100%",
          mt: 6,
          px: 1,
        }}
      >
        <Typography variant="h6">آیا می خواهید رزو آنی انجام دهید؟</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
            mt: 5,
            mb: 3,
          }}
        >
          <Button
            onClick={() => {
              handleChange();
            }}
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
          >
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
            ) : (
              "تایید"
            )}
          </Button>

          <Button
            onClick={() => {
              handleClosePopover();
            }}
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
          >
            لغو
          </Button>
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            mt: 1,
          }}
        >
          برای حذف تغییرات داده شده به مشاهده مقادیر رجوع کنید
        </Typography>
        
        {/* show error */}
        <Typography
          color="error"
          sx={{ width: "100%", direction: "ltr" }}
          variant="body2"
        >
          {validText}
        </Typography>

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
