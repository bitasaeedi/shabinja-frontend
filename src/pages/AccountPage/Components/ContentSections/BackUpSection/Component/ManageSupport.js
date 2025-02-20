import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ChatComponent from "./ChatComponent";
import { Email, Call, HelpOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ManageSupport = () => {
  return (
    <Box>
      {/* <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{
          fontSize: "18px",
          display: { xs: "none", md: "flex" },
        }}
      >
        پشتیبانی
      </Typography> */}
      <Box
        sx={{
          // py: { xs: 1, md: 0 },
          p: 3,
        }}
        className="shado borde rounded"
      >
        <Grid container spacing={3} justifyContent="space-between">
          <Grid
            item
            xs={"12"}
            lg="6"
            sx={{
              order: 1,
              px: "auto",
             
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ChatComponent />
          </Grid>
          <Grid
            item
            xs="12"
            lg="6"
            sx={{ display: { xs: "none", md: "block" }, order: 0 }}
          >
            <Box sx={{}}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                پشتیبانی شبینجا، همیشه کنار شما
              </Typography>
              <Typography variant="body1" color="#000">
                برای راحتی شما، امکان چت آنلاین فراهم شده است. در این بخش
                می‌توانید سوالات خود را بپرسید، پیام ارسال کنید و با تیم
                پشتیبانی ما در ارتباط باشید.
              </Typography>
            </Box>
            <Box display="flex" mt={4} gap={2} justifyContent="space-between">
              {[
                {
                  title: "سوالات متداول",
                  icon: <HelpOutline color="primary" />,
                  link: "/help",
                },
                {
                  title: "ارسال ایمیل",
                  icon: <Email color="primary" />,
                  link: "/contact",
                },
                {
                  title: "تماس با ما",
                  icon: <Call color="primary" />,
                  link: "/contact",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 120,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: 1,
                    "&:hover": {},
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={item?.link}
                >
                  <CardActionArea>
                    <CardContent>
                      <Box display="flex" justifyContent="center" mb={1}>
                        {item.icon}
                      </Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          fontSize: 16,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ManageSupport;
