import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ShieldIcon from "@mui/icons-material/Shield";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ResponsiveFeatures = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      title: "پشتیبانی 24 ساعته",
      icon: <HeadsetMicIcon />,
    },
    {
      title: "ضمانت بازگشت هزینه",
      icon: <CurrencyExchangeIcon />,
    },
    {
      title: "اعتبار سنجی کاربران",
      icon: <VerifiedIcon />,
    },
    {
      title: "صحت اطلاعات اقامتگاه ها",
      icon: <ShieldIcon />,
    },
  ];

  return (
    <Box
      sx={{
        px: 0,
        py: 6,
        width: { xs: "95%", sm: "85%", md: "85%", lg: "78%", xl: "70%" },
        mx: "auto",
      }}
    >
      {isMobile ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1.5}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"center",
                  padding: ".9rem 2rem",
                  textAlign: "center",
                  color: "#0d47a1",
                 // boxShadow: "0 0px 4px -1px #8f8383",
                  borderRadius: "8px",
                }}
                className="border shadow-sm"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": {
                      fontSize: 18,
                      color: "#0d47a1",
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#0d47a1",
                    marginLeft: "5px",
                  }}
                >
                  {feature.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: theme.spacing(4),
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: ".9rem",
                textAlign: "center",
                color: "#0d47a1",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& svg": {
                    fontSize: 18,
                    color: "#0d47a1",
                  },
                }}
              >
                {feature.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#0d47a1",
                  marginLeft: "5px",
                }}
              >
                {feature.title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveFeatures;
