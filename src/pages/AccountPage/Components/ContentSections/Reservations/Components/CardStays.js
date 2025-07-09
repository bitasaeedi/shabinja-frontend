import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import { HandleShowDateLikeStr } from "../../../../../../components/DateFunctions/DateFunctions";
import StepperReserve from "../../../../../../components/Stepers/StepperReserve";
import ToRial from "../../../../../../components/ToRial/ToRial";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
const CardStays = ({ stay }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {};

  const stepsList = [
    {
      stepNum: 0,
      title: "ثبت درخواست",
    },
    {
      stepNum: 1,
      title: "تایید میزبان ",
    },
    {
      stepNum: 2,
      title: "پرداخت ",
    },
    {
      stepNum: 3,
      title: "تحویل کلید ",
    },
  ];
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: { xs: "none", md: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
        backgroundColor: "greay",
        borderBottom: { xs: "solid thin gray", md: "none" },
        my: 2,
        // border: "solid thin gray"
      }}
    >
      <Grid container>
        <Grid item xs="12" md="9">
          <Grid container spacing={2}>
            <Grid
              item
              xs={"auto"}
              // sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                component="img"
                src={DownloadImageApi(stay?.image)}
                alt="Apartment"
                sx={{
                  width: { xs: 80, md: 180 },
                  height: { xs: 80, md: 120 },
                  // height: "auto",
                  borderRadius: 1,
                  objectFit: "cover",
                  backgroundColor: "grey.200",
                }}
              />
            </Grid>
            {/* اطلاعات اقامتگاه */}
            <Grid xs item sx={{ pr: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {stay?.hostTourTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Box component="span" display="flex" alignItems="center">
                        <Box component="span" mr={0.5}>
                          📍
                        </Box>
                        {stay?.hostTourCityTitle}
                      </Box>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex ",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 13 }}
                      >
                        تعداد مهمان
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        // color="text.secondary"
                        fontWeight={"bold"}
                        sx={{ fontSize: 14 }}
                      >
                        {stay?.personCount} نفر
                      </Typography>
                    </Box>

                    <Box sx={{ borderLeft: "solid 1px gray", pl: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 13 }}
                      >
                        تاریخ اقامت
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        // color="text.secondary"
                        fontWeight={"bold"}
                        sx={{ fontSize: 14 }}
                      >
                        {`${HandleShowDateLikeStr(
                          stay?.start
                        )} - ${HandleShowDateLikeStr(stay?.end)}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: { md: "none" } }}>
                  <Box>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      گزینه‌ها
                      <MoreVertIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      <MenuItem
                        component={Link}
                        to={`/book/preorder/${stay?.orderNumber}`}
                      >
                        جزئیات رزرو
                      </MenuItem>
                      <MenuItem onClick={handleClose}>لغو </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* stepper */}
          <Grid container>
            <Grid item xs="12" sx={{ mt: 2 }}>
              <StepperReserve
                errorTab={stay?.expired}
                activeStep={stay?.state + 1 || 0}
                steps={["ثبت درخواست", "تایید میزبان", "پرداخت", "تحویل کلید"]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          sx={{ borderLeft: { xs: "none", md: "solid thin gray" }, pl: 2 }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            {/* میزبان */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* اسم میزبان */}
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 16 }}
                  >
                    میزبان
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    // color="text.secondary"
                    fontWeight={"bold"}
                    sx={{ fontSize: 20 }}
                  >
                    {stay?.hostTourUserFullName}
                  </Typography>
                </Box>
                {/* گزینه های بیشتر */}
                <Box>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to={`/book/preorder/${stay?.orderNumber}`}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      جزئیات رزرو
                    </MenuItem>
                    <MenuItem onClick={handleClose}>لغو </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>

            {/* پرداخت */}
            <Box sx={{ width: "100%", mt: { xs: 3, md: 0 } }}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 12 }}
                >
                  مبلغ کل:
                </Typography>
                <Typography
                  variant="subtitle1"
                  // color="text.secondary"
                  fontWeight={"bold"}
                  sx={{ fontSize: 20 }}
                >
                  {ToRial(stay?.price)}
                </Typography>
              </Box>

              {/* کلید */}
              <Button
                variant="contained"
                color="dark"
                fullWidth
                sx={{
                  color: "white",
                  fontSize: 18,
                  backgroundColor: "#212121", // Ensures dark background
                  "&:hover": {
                    opacity: 0.8,
                    backgroundColor: "#212121", // Maintain dark background on hover
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                    backgroundColor: "#212121", // Maintain dark background when clicked
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#424242", // Slightly lighter dark color when disabled
                    color: "rgba(255, 255, 255, 0.5)", // Semi-transparent white text
                    cursor: "not-allowed", // Show not-allowed cursor
                  },
                }}
                disabled={stay?.state !== 1}
              >
                {stay?.state === 0
                  ? "منتظر بمانید"
                  : stay?.state === 1
                  ? "پرداخت"
                  : stay?.state === 2
                  ? "به اقامتگاه بروید"
                  : "نامشخص"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardStays;
