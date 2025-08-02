import React, { useEffect, useState } from "react";
import { Box, Typography, Button, InputBase, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import styled from "@emotion/styled";
import axios from "axios";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import { DownloadImageApi } from "../../api/DownloadImageApi";
import API_URL from "../../config/apiConfig";
import MyAlertMui from "../MyAlertMui/MyAlertMui";
import FavoritesFieldSkeleton from "./FavoritesFieldSkeleton";
const baseUrl = API_URL;
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Ensure it takes up the full width
  border: "1px solid #777777a1",
  borderRadius: 5,
  padding: ".2rem 1rem",
  cursor: "pointer",
  marginTop: "1rem",
}));

function NotExist() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          padding: "2rem",
          pt: "rem",
        }}
      >
        <PlaylistRemoveIcon sx={{ fontSize: 60, color: "grey.500" }} />

        <Typography
          variant="h6"
          sx={{ mt: 3, fontSize: "18px", color: "grey.600" }}
        >
          هنوز هیچ لیستی ایجاد نکرده‌اید!
        </Typography>
      </Box>
    </>
  );
}

export default function FavoritesField({
  isLiked,
  handleClose,
  myWidth,
  stayId,
  changeFavColor,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categoryList, setCategoryList] = useState();
  const [showAddInput, setShowAddInput] = useState(false);
  const [loading,setLoading]=useState(true);
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

  //get list
  const fetchCategoryList = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/UserFavoriteCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("list response", response.data);
      setCategoryList(response.data.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log("listError:", error?.response?.data);
      setLoading(false);
      return error?.response?.data;
    }
  };

  // add name of list
  const onSubmit = async (data) => {
    console.log("d", data);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategory`,
        {
          Title: data.newList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("add response", response.data);
      reset();
      setShowAddInput(false);

      fetchCategoryList();
      setTimeout(() => {
        handleMangeAlert(true, "success", "لیست اضافه شد");
      }, 1000);

      return response.data;
    } catch (error) {
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
      console.log("Error:", error?.response);
      return error?.response?.data;
    }
  };
  // add to list
  const handleAddStayToList = async (listId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategoryHostTour`,
        {
          UserFavoriteCategoryId: listId,
          HostTourId: stayId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("add response", response.data);
      fetchCategoryList();
      changeFavColor();
      
      setTimeout(() => {
        handleMangeAlert(true, 
           response?.data?.issuccess ?
          "success":"warning",
          response?.data?.issuccess ?
          "اقامتگاه به لیست اضافه شد":"این اقامتگاه قبلا به لیستی اضافه شده");
        setTimeout(() => {
        //  handleClose()
        }, 2000);
      }, 1000);

      return response.data;
    } catch (error) {
      console.log("Error:", error?.response?.data);
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
      return error?.response?.data;
    }
  };

  useEffect(() => {
    if (isLiked) {
      fetchCategoryList();
    }
  }, [isLiked]);

  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "18px 16px",
          width: myWidth ? "500px" : "100%",
        }}
      >
        {/* title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "auto",
          }}
        >
          <Typography variant="h6" mb={3} fontSize={"18px"}>
            علاقه مندی های شما
          </Typography>
          <CloseIcon
            sx={{ fontSize: "18px", cursor: "pointer" }}
            onClick={() => {
              handleClose();
            }}
          />
        </Box>

        {/* add list */}
        <Button
          variant="contained"
          type="button"
          startIcon={
            <PlaylistAddIcon sx={{ fontSize: "24px", marginBottom: ".2rem" }} />
          }
          sx={{ p: ".6rem 1.1rem" }}
          onClick={() => {
            setShowAddInput(!showAddInput);
          }}
        >
          اضافه کردن لیست جدید
        </Button>

        {/* add input */}

        {showAddInput ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <StyledInputBase
                  placeholder="نام لیست ..."
                  {...register("newList", {
                    required: "نام لیست نباید خالی باشد",
                    validate: (value) =>
                      value.trim() !== "" || "نام لیست نباید فقط فاصله باشد",
                  })}
                />
                {errors.newList && (
                  <Typography variant="caption" color="error">
                    {errors.newList.message}
                  </Typography>
                )}
              </Box>

              <IconButton
                type="submit"
                sx={{
                  border: "1px solid #77777799",
                  height: "auto",
                  padding: ".4rem",
                  borderRadius: "5px",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                <AddIcon sx={{ color: "#777" }} />
              </IconButton>
            </Box>
          </form>
        ) : (
          ""
        )}

        {/* lists */}
        <Box
          sx={{
            mt: 3,
            cursor: "pointer",
          }}
        >
          {loading ? (
            <FavoritesFieldSkeleton />
          ) : categoryList ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {categoryList.map((list, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".6rem",
                    padding: ".5rem",
                    borderRadius: "6px",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => {
                    handleAddStayToList(list.id);
                  }}
                >
                  {list.image ? (
                    <Box
                      component="img"
                      src={DownloadImageApi(list.image)}
                      alt=""
                      
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "6px",
                      }}
                    />
                  ) : (
                    <FolderOffIcon
                      sx={{
                        fontSize: 15,
                        color: "#bbb",
                        width: "50px",
                        height: "50px",
                        padding: ".9rem",
                        border: "1px solid #bbb",
                        borderRadius: "6px",
                      }}
                    />
                  )}

                  <Typography variant="body1">{list.title}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <NotExist />
          )}
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
      </Box>
    </>
  );
}
