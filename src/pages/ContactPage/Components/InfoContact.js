import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const InfoContact = ({ contactData }) => {
  return (
    <Box>
      <Grid container sx={{ mt: 3 }}>

        {/* تلفن پشتیبانی */}
        <Grid item xs={12} md={4} sx={{ mt: { xs: 2, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 1 }}>
              <PhoneInTalkOutlinedIcon sx={{ fontSize: 35 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                {contactData[1]?.title}
              </Typography>
              <Typography variant="body2">{contactData[1]?.value}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* سامانه پیامکی */}
        <Grid item xs={12} md={4} sx={{ mt: { xs: 5, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 1 }}>
              <SmsOutlinedIcon sx={{ fontSize: 35 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                {contactData[2]?.title}
              </Typography>
              <Typography variant="body2">{contactData[2]?.value}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* ایمیل */}
        <Grid item xs={12} md={4} sx={{ mt: { xs: 5, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 1 }}>
              <EmailOutlinedIcon sx={{ fontSize: 35 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                {contactData[3]?.title}
              </Typography>
              <Typography variant="body2">{contactData[3]?.value}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* آدرس */}
        <Grid item xs={12} sx={{ mt: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 1 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 35 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                {contactData[4]?.title}
              </Typography>
              <Typography variant="body2">{contactData[4]?.value}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
