import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import { AppContext } from "../../App";
import FormContact from "./Components/FormContact";
import { InfoContact } from "./Components/InfoContact";
import axios from "axios";
import API_URL from "../../config/apiConfig";
const baseUrl = API_URL;

const ContactPage = () => {

  const appContext = useContext(AppContext);
  

  const [contactData, setContactData] = useState(null);

  const fetchContactData = async () => {
    try {
      const token = localStorage.getItem("access_token");
  
      const response = await axios.get(`${baseUrl}/ContactData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactData(response?.data?.data);
      
    } catch (error) {
      console.error(
        "Error :",
        error?.response?.data || error.message
      );
      return error?.response?.data;
    }
  };

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
    fetchContactData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: { xs: 0, md: 4 } }}>
      <Box sx={{ py: { xs: 2, md: 8 }, px: { xs: 2, md: 5 } }}>
        <Grid container spacing={0} justifyContent={"center"}>
          {/* <Grid
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
          </Grid> */}
          {contactData ? (
            <Grid
            xs="12"
            md="8"
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
                {contactData[5]?.value}
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
            <InfoContact contactData={contactData} />
          </Grid>
          ):(
            <Grid
            xs="12"
            md="8"
            sx={{
              px: { xs: 0, md: 4 },
              order: { xs: 0, md: 1 },
            }}
          >
            <Skeleton  variant="rectangular" width="100%" height={100} />
          </Grid>
          )}
          
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
