import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ShieldIcon from "@mui/icons-material/Shield";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
const ItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#0d47a1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1), // Adjust padding for mobile
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  "& svg": {
    fontSize: 30,
    color: "#0d47a1",
    transition: "color 0.3s ease",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 25, // Smaller icon size on mobile
  },
}));

const Title = styled(Typography)(({ theme, isMobile }) => ({
  fontSize: isMobile ? "0.875rem" : "1.25rem", // Smaller font size for mobile
  fontWeight: "bold",
  color: "#0d47a1",
  transition: "color 0.3s ease",
}));

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
        px: 4,
        py: 6,
        // backgroundColor: `#f9f9f9`,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: theme.spacing(4),
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          alignItems: "stretch",
          justifyItems: "center", // Ensure alignment of all items in the grid
        }}
      >
        {features.map((feature, index) => (
          <ItemWrapper key={index}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <Title isMobile={isMobile}>{feature.title}</Title>
          </ItemWrapper>
        ))}
      </Box>
    </Box>
  );
};

export default ResponsiveFeatures;
