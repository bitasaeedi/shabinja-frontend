import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSearchOneApi } from "../../../../../../api/Users.api";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";

export default function Profile({ isMobile, myWidth }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState();

  // fetch data
  const fetchData = async () => {
    const data = await UserSearchOneApi();
    console.log("data", data.data);
    setInfo(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const boxProps = isMobile
    ? {
        height: "180px",
        width: "100%",
        padding: "1rem 1.5rem",
      }
    : {
        height: "220px",
        width: { md: "60%", lg: myWidth },
        padding: "2rem 1.5rem",
        marginBottom: { md: "1.5rem", lg: "0" },
      };

  const bottomBoxMargin = isMobile ? 3 : 5;

  return (
    <Box className="shadow borde rounded" sx={{ ...boxProps }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#e4e3e3",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={DownloadImageApi(info?.image?.url)}
            alt="profile"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {info?.firstName || "کاربر"} {info?.lastName}
          </Typography>
          <Typography variant="body2">
            پروفایل شما کامل{" "}
            {info?.percentageCompletion == 100 ? (
              <span style={{ color: "#2974e5" }}>است</span>
            ) : (
              <span style={{ color: "red" }}>نیست</span>
            )}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          mt: bottomBoxMargin,
        }}
      >
        <Typography>پروفایل میزبان</Typography>
        <Typography>{info?.percentageCompletion}%</Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/account/profile");
          }}
        >
          ویرایش
        </Button>
      </Box>
    </Box>
  );
}
