import React, { useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { AppContext } from "../../App";
import FormContact from "./Components/FormContact";
import { InfoContact } from "./Components/InfoContact";

const ContactPage = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: { xs: 0, md: 4 } }}>
      <Box sx={{ py: 4, px: { xs: 2, md: 5 } }}>
        <Grid container spacing={0}>
          <Grid
            xs="12"
            md="6"
            sx={{
              px: { xs: 0, md: 4 },
              order: { xs: 1, md: 0 },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              align="right"
              gutterBottom
              sx={{
                fontSize: 24,
                mb: 4,
              }}
            >
              تماس با ما
            </Typography>
            <FormContact />
          </Grid>
          <Grid
            xs="12"
            md="6"
            sx={{
              px: { xs: 0, md: 4 },
              order: { xs: 0, md: 1 },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  display: "flex",
                }}
              >
                <Typography variant="inherit" sx={{}}>
                  تماس با
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{
                    color: "primary.main",
                    px: 1,
                  }}
                >
                  {` شبینجا `}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: 14, textAlign: "justify" }}
              >
                کاربر عزیز شبینجا؛ باعث خرسندی ماست که دیدگاه‌های ارزشمندتان را
                با ما به اشتراک بگذارید. در صورت داشتن هرگونه شکایت، پیشنهاد،
                انتقاد یا نظر درباره خدمات وب‌سایت شبینجا، می‌توانید از طریق
                شماره{" "}
                <span dir="ltr" className="px-1 font-weight-bold ">
                  021-91011295
                </span>{" "}
                با ما تماس بگیرید یا از فرم زیر برای ارسال پیام خود استفاده
                کنید.
              </Typography>
            </Box>
            <Typography
              variant="h5"
              align="right"
              gutterBottom
              sx={{
                fontSize: 24,
                mb: 2,
                mt: { xs: 6, md: 8 },
              }}
            >
              ارتباط با ما
            </Typography>
            <InfoContact />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
