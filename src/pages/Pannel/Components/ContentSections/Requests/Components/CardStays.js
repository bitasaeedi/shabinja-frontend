import {
  Box,
  Button,
  Card,
  Grid,
  Typography,

} from "@mui/material";
import React, { useContext, useState } from "react";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import {
  ConvertToShamsi,
  HandleShowDateLikeStr,
} from "../../../../../../components/DateFunctions/DateFunctions";
import StepperReserve from "../../../../../../components/Stepers/StepperReserve";
import ToRial from "../../../../../../components/ToRial/ToRial";

import { ContainerMainContext } from "../ContainerMain";
import DialogAskQuestion from "../../../../../../components/SweetAlert/DialogAskQuestion";

const CardStays = ({ stay }) => {

  const { handleAcceptRequest, handleReject, handleDeleteRequest } =
    useContext(ContainerMainContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      stepNum: 1001,
      title: "تحویل کلید ",
    },
  ];

  // پذیرش درخواست اقامتگاه
  const handleNextLevele = async () => {
    handleClose();
    handleAcceptRequest(stay?.guid);
  };

  // رد درخواست
  const handleDelete = async () => {
    handleReject(stay?.guid);
    setOpenConfirm(false);
  };

  const handleDeleteReq = async () => {
    handleDeleteRequest(stay?.guid);
    setOpenConfirmDelete(false);
  };

  return (
    <>
      <Card
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: {
            xs: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            md: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
          backgroundColor: "greay",
          borderBottom: { xs: "none", md: "none" },
          my: 2,
          px: 1,
          // border: "solid thin gray"
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs="12" md="9">
            <Grid container spacing={0}>

              {/* عکس اقامتگاه */}
              <Grid item xs={"auto"}>
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

              {/* اطلاعاتن اقامتگاه */}
              <Grid xs item sx={{ pl: 1 }}>
                <Box
                  sx={{
                    width: "100%",

                    mx: 0,
                  }}
                >
                  <Box>
                    {/* اسم اقامتگاه و ادرس */}
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {stay?.hostTourTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box
                          component="span"
                          display="flex"
                          alignItems="center"
                        >
                          <Box component="span" mr={0.5}>
                            📍
                          </Box>
                          {stay?.hostTourCityTitle}
                        </Box>
                      </Typography>
                    </Box>
                    
                    {/* قسمت مشخصات رزرو */}
                    <Box
                      sx={{
                        mt: 1,
                        width: "100%",
                        display: "flex ",
                        mx: 0,
                        // justifyContent: {
                        //   xs: "space-between",
                        //   md: "flex-start",
                        // },
                      }}
                    >
                      {/* تعداد مهمان */}
                      <Box sx={{ mr: 1 }}>
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

                      {/* تاریخ اقامت */}
                      <Box
                        sx={{
                          borderLeft: "solid 1px gray",
                          pl: 2,
                        }}
                      >
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
                    {/* === */}
                  </Box>
                </Box>
              </Grid>

            </Grid>

            {/* stepper */}
            <Grid container>
              <Grid item xs="12" sx={{ mt: 2 }}>
                <StepperReserve
                  errorTab={stay?.expired}
                  activeStep={stay?.state ===4 ? 1 : (stay?.state + 1 || 0)}
                  steps={[
                    "ثبت درخواست",
                    "تایید میزبان",
                    "پرداخت",
                    "تحویل کلید",
                  ]}
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
                      میهمان
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      // color="text.secondary"
                      fontWeight={"bold"}
                      sx={{ fontSize: 16 }}
                    >
                      {stay?.fullName}
                    </Typography>
                  </Box>
                  {/* گزینه های بیشتر */}

                  {/* <Box>
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
                      // component={Link}
                      // to={`/book/preorder/${stay?.orderNumber}`}
                      onClick={() => {
                        handleNextLevele();
                      }}
                    >
                      تایید میزبان
                    </MenuItem>
                   
                  </Menu>
                </Box> */}
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
                    sx={{ fontSize: 16 }}
                  >
                    {ToRial(stay?.facktorPrice)}
                    <Typography variant="span" sx={{ mx: 1 }}>
                      تومان
                    </Typography>
                  </Typography>
                </Box>

                {/* کلید */}
                {stay?.state === 0 && (
                  <Box>
                    <Button
                      onClick={handleNextLevele}
                      variant="contained"
                      color="dark"
                      fullWidth
                      size={"small"}
                      sx={{
                        color: "white",
                        // fontSize: 16,
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
                    >
                      تایید درخواست
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenConfirm(true);
                      }}
                      variant="text"
                      color="error"
                      fullWidth
                      sx={{
                        mt: 1,
                        // fontSize: 18,
                      }}
                      size={"small"}
                    >
                      رد درخواست
                    </Button>
                  </Box>
                )}
                {(stay?.state === 3 || stay?.state === 2) && (
                  <Button
                    onClick={() => {
                      setOpenConfirmDelete(true);
                    }}
                    variant="text"
                    color="error"
                    fullWidth
                    sx={{
                      mt: 1,
                      fontSize: 18,
                    }}
                  >
                    حذف از تاریخچه
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* رد درخواست */}
      {openConfirm && (
        <DialogAskQuestion
          handleClose={() => setOpenConfirm(false)}
          handleConfirm={handleDelete}
          openConfirm={openConfirm}
          title={"تایید رد درخواست"}
          question={"   آیا مطمئن هستید که می‌خواهید این درخواست را رد کنید؟"}
          confirmText={"رد درخواست"}
        />
      )}

      {/* حذف درخواست */}
      {openConfirmDelete && (
        <DialogAskQuestion
          handleClose={() => setOpenConfirmDelete(false)}
          handleConfirm={handleDeleteReq}
          openConfirm={openConfirmDelete}
          title={" تایید حذف  درخواست"}
          question={
            "   آیا مطمئن هستید که می‌خواهید این درخواست را از تاریخچه حذف کنید؟"
          }
          confirmText={"حذف "}
        />
      )}
    </>
  );
};

export default CardStays;
