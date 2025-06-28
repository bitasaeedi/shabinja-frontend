import {
  Box,
  Button,
  InputBase,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import MyAlertMui from "../../../../../../components/MyAlertMui/MyAlertMui";
import { useNavigate } from "react-router-dom";
const baseUrl = API_URL;

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Ensure it takes up the full width
  borderRadius: 5,
  //   padding: ".2rem 1rem",
  cursor: "pointer",
  outline: "black",
}));

export default function CategoryPopOver({
  isOpen,
  type,
  handleClose,
  categoryInfo,
}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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

  // delete
  const deleteCategoryList = async (guid) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategory/${guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("list response", response.data);
      setTimeout(() => {
        handleMangeAlert(true, "success", "لیست حذف شد");
        setTimeout(() => {
          navigate("/account/favorites/all")
        }, 3000);
      }, 1000);
      
      return response.data;
    } catch (error) {
      console.log("listError:", error?.response?.data);
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
      return error?.response?.data;
    }
  };

  //edit
  const editCategoryList = async (id, guid) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategory/Update`,
        {
          Title: name,
          Id: categoryInfo.userFavoriteCategoryId,
          Guid: categoryInfo.userFavoriteCategoryGuid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("list response", response.data);

      setTimeout(() => {
        handleMangeAlert(true, "success", "نام لیست تغییر یافت.");
        setTimeout(() => {
          handleClose()
        }, 3000);
      }, 1000);
      

      
      return response.data;
    } catch (error) {
      console.log("listError:", error?.response?.data);
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
      return error?.response?.data;
    }
  };

  return (
    <>
      <Popover
        open={Boolean(isOpen)}
        // anchorEl={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            mt: 10,
            zIndex: 2000,
            padding: "25px 30px",
          },
        }}
      >
        <Box
          sx={{
            width: "370px",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          {/* title */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "auto",
              width: "100%",
            }}
          >
            <Typography variant="h6" mb={3} fontSize={"18px"}>
              {type} لیست
            </Typography>
            <CloseIcon
              sx={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                handleClose();
              }}
            />
          </Box>

          {type === "ویرایش" ? (
            <StyledInputBase
              label="نام جدید"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Typography variant="h6" fontSize={16} mt={2} mb={1}>
              آیا مطمنید که می خواهید این لیست را حذف کنید؟
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ mt: "1.5rem", px: "2rem" }}
            onClick={() => {
              type === "ویرایش"
                ? editCategoryList()
                : deleteCategoryList(categoryInfo.userFavoriteCategoryGuid);
            }}
          >
            {type === "ویرایش" ? " ثبت تغییرات" : "حذف"}
          </Button>
        </Box>
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
      </Popover>
    </>
  );
}
