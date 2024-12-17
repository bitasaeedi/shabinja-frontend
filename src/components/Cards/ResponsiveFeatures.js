import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ShieldIcon from "@mui/icons-material/Shield";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

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
      title: "اعتبار سنجی میزبان و مهمان",
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
        width: { xs: "95%", md: "80%" },
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: theme.spacing(4),
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          justifyItems: "space-between",
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              alignItems: "start",
              justifyContent: "flex-start",
              padding: theme.spacing(2),
              textAlign: "center",
              color: "#0d47a1",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(1),
              },
            }}
          >
            <Box
              sx={{
                marginBottom: theme.spacing(1.5),
                "& svg": {
                  fontSize: 20,
                  color: "#0d47a1",
                  transition: "color 0.3s ease",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: 16,
                },
              }}
            >
              {feature.icon}
            </Box>
            <Typography
              sx={{
                fontSize: isMobile ? "0.875rem" : "1.25rem",
                fontWeight: "bold",
                color: "#0d47a1",
                marginLeft: "5px",
                transition: "color 0.3s ease",
              }}
            >
              {feature.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResponsiveFeatures;
