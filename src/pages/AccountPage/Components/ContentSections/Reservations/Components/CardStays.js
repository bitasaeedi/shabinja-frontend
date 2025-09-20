// لیست اقامتگاه های صحفه رزرو
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import {
  ConvertToShamsi,
  HandleShowDateLikeStr,
} from "../../../../../../components/DateFunctions/DateFunctions";
import StepperReserve from "../../../../../../components/Stepers/StepperReserve";
import ToRial from "../../../../../../components/ToRial/ToRial";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import CancelDialog from "./CancelDialog";
import MyAlertMui from "../../../../../../components/MyAlertMui/MyAlertMui";
import { ContainerMainContext } from "../ContainerMain";
const baseUrl = API_URL;

const CardStays = ({ stay, onRemove }) => {
  const { handleGetMyReserve } = useContext(ContainerMainContext);

  const [loadingCancel, setLoadingCancel] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancelReason, setCancelReason] = useState(null);
  const open = Boolean(anchorEl);
  const [openCancel, setOpenCancel] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeReason(value) {
    setCancelReason(value);
  }
  // cancel reservation
  const handleCancell = async () => {
    setLoadingCancel(true);
    console.log("ap", cancelReason);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/HostTourOrder/Cancelled/${stay?.guid}/${cancelReason}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("رزرو با موفقیت لغو شد");
      handleMangeAlert(true, "success", "رزرو با موفقیت لغو شد");

      // Remove the card from the UI after successful cancellation
      if (onRemove && stay?.guid) {
        onRemove(stay.guid);
      }

      return response.data;
    } catch (error) {
      console.log("Error:", error?.response?.data);
      console.log("لغو ناموفق");
      handleMangeAlert(true, "success", "لغو ناموفق");
      return error?.response?.data;
    } finally {
      handleClose();
      setLoadingCancel(false);
    }
  };

  // عدم  تحوبل کلید
  const notDeliver = async () => {
    console.log("cancell");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/HostTourOrder/NotDelivered/${stay?.guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("در اسرع وقت بررسی می شود")
      handleGetMyReserve();
      handleMangeAlert(true, "success", "در اسرع وقت رسیدگی می شود");

      return response.data;
    } catch (error) {
      console.log("error for not deliver", error?.response);
      handleMangeAlert(true, "error", "درخواست شما با خطا مواجه شد");
      return error?.response?.data;
    }
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: { md: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
        backgroundColor: "greay",
        borderBottom: { xs: "none", md: "none" },
        my: 2,
        px: 1,
        // border: "solid thin gray"
      }}
    >
      <Grid container>
        <Grid item xs="12" md="9">
          <Grid container spacing={2}>
            {/* image */}
            <Grid
              item
              xs={"auto"}
              // sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                onClick={() => navigate(`/stay/${stay?.hostTourId}`)}
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
                  cursor: "pointer",
                }}
              />
            </Grid>
            {/* اطلاعات اقامتگاه */}
            <Grid xs item sx={{ pl: 10 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                {/* اسم اقامتگاه */}
                <Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/stay/${stay?.hostTourId}`)}
                    >
                      {stay?.hostTourTitle}
                    </Typography>

                    {/* menu */}
                    <Box sx={{ display: { md: "none" } }}>
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
                          id="basic-menu-mobile"
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
                          {stay?.state === 2 && (
                            <MenuItem onClick={handleCancell}>لغو</MenuItem>
                          )}
                        </Menu>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" display="flex" alignItems="center">
                      <Box component="span" mr={0.5}>
                        📍
                      </Box>
                      {stay?.hostTourCityTitle}
                    </Box>
                  </Typography>
                </Box>

                {/* اطلاعات اقامتگاه */}
                <Box
                  sx={{
                    mt: 1,
                    display: "flex ",
                    //  justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ minWidth: "80px" }}>
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
                        ConvertToShamsi(stay?.start)
                      )} - ${HandleShowDateLikeStr(
                        ConvertToShamsi(stay?.end, 1)
                      )}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* stepper */}

          <Grid container>
            <Grid item xs="12" sx={{ mt: 2 }}>
              <StepperReserve
                errorTab={
                  stay?.state === 4 || stay?.state === 5 || stay?.state === 6
                    ? true
                    : stay?.expired
                }
                activeStep={(() => {
                  const s = stay?.state ?? 0;
                  if (s === 5) return 3; // delivered/cancelled mapping previously
                  if (s === 4) return 1; // map 4 to step 1 as requested
                  if (s === 6) return 3;
                  const base = s + 1;
                  return Number(base) ? base : 0;
                })()}
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
                    sx={{ fontSize: 12 }}
                  >
                    میزبان
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    // color="text.secondary"
                    fontWeight={"bold"}
                    sx={{ fontSize: 16 }}
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
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
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
                    {stay?.state === 2 && (
                      <MenuItem onClick={() => setOpenCancel(true)}>
                        لغو
                      </MenuItem>
                    )}
                    {stay?.state === 3 && (
                      <MenuItem
                        onClick={() => {
                          notDeliver();
                        }}
                      >
                        عدم تحویل کلید
                      </MenuItem>
                    )}
                    <CancelDialog
                      changeReason={changeReason}
                      open={openCancel}
                      setOpen={setOpenCancel}
                      handleCancel={handleCancell}
                      loadingCancel={loadingCancel}
                    />
                  </Menu>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                mt: 2.5,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 13 }}
              >
                کد رزرو:
              </Typography>
              <Typography
                variant="subtitle1"
                color="black"
                fontWeight={"bold"}
                sx={{ fontSize: 15, display: "inline-block" }}
              >
                {stay?.orderNumber || ""}
              </Typography>
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
                  sx={{ fontSize: 17, mb: 0.5 }}
                >
                  {ToRial(stay?.facktorPrice)}
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
                disabled={stay?.state !== 1 || stay?.expired === true}
                onClick={() => {
                  stay?.state === 1
                    ? navigate(`/book/preorder/${stay?.orderNumber}`)
                    : console.log("0");
                }}
              >
                {stay?.state === 5
                  ? "لغو شده"
                  : stay?.state === 6
                  ? "عدم تحویل کلید"
                  : stay?.state === 4
                  ? "رد توسط میزبان"
                  : stay?.expired === true
                  ? " منقضی شده"
                  : stay?.state === 0
                  ? "منتظر بمانید"
                  : stay?.state === 1
                  ? "پرداخت"
                  : stay?.state === 2
                  ? "به اقامتگاه بروید"
                  : stay?.state === 3
                  ? "کلید تحویل داده شده"
                  : "نامشخص"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showAlertSetting?.show && (
        <MyAlertMui
          message={showAlertSetting?.message || ""}
          handleClose={() =>
            handleMangeAlert(
              false,
              showAlertSetting?.status,
              showAlertSetting?.message
            )
          }
          status={showAlertSetting?.status}
        />
      )}
    </Card>
  );
};

export default CardStays;
