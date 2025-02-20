import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const InfoContact = () => {
  return (
    <Box>
      <Grid container sx={{ mt: 3 }}>
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
                تلفن پشتیبانی:
              </Typography>
              <Typography variant="body2">021-91011295</Typography>
            </Box>
          </Box>
        </Grid>

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
                سامانه پیامکی:
              </Typography>
              <Typography variant="body2">10009105719700</Typography>
            </Box>
          </Box>
        </Grid>

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
                ایمیل :
              </Typography>
              <Typography variant="body2">support@shabinja.com</Typography>
            </Box>
          </Box>
        </Grid>

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
                آدرس:
              </Typography>
              <Typography variant="body2">
                دفتر مرکزی : کردستان ، سنندج ، بهاران ، بلوار زکریای رازی ،
                ساختمان پارک علم و فناوری کردستان ، طبقه اول، واحد 116 کدپستی :
                6617739434
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
