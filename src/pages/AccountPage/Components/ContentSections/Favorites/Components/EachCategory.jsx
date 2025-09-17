import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeCard from "../../../../../../components/Cards/HomeCards/HomeCards";
import { useLocation, useParams } from "react-router-dom";
import CategoryPopOver from "./CategoryPopOver";
import SkeletonCard from "./SkeletonCard";
import SearchOff from "@mui/icons-material/SearchOff";
const baseUrl = API_URL;

const NoValueComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        pt: 4,
        mt: 4,
        textAlign: "center",
        color: "text.secondary",
        minHeight: "40vh",
      }}
    >
      <SearchOff sx={{ fontSize: 60, color: "#aaa", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        هیچ اقامتگاهی برای نمایش وجود ندارد
      </Typography>
    </Box>
  );
};

export default function EachCategory() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null); //open menu
  const [isOpen, setIsOpen] = useState(false); //open module
  const [type, setType] = useState(""); //edit , delete
  const [categoryItem, setCategoryItem] = useState();
  const [id, setId] = useState();
  const [isFavorite, setIsFavorite] = useState(true);

  console.log("mycategoryItem1:", categoryItem);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePopOver = () => {
    setIsOpen(false);
  };

  function changeFavoriteList() {
    setIsFavorite(!isFavorite);
  }

  const fetchCategoryList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/UserFavoriteCategoryHostTour/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("list response", response.data);
      setCategoryItem(response?.data?.data);
      console.log("categoryItem", response?.data?.data);
      return response.data;
    } catch (error) {
      console.log("listError:", error?.response?.data);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    const segments = location.pathname.split("/");
    setId(segments[segments.length - 1]);
  }, [location]);

  useEffect(() => {
    if (id) {
      fetchCategoryList();
    }
  }, [isOpen, id, isFavorite]);

  return (
    <>
      <Box mx={2}>
        {/* menu  */}
        <Box mr={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={handleClick}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "4px",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => {
                setIsOpen(true);
                setType("ویرایش");
                handleClose();
              }}
            >
              <ListItemText>ویرایش</ListItemText>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>

            <MenuItem
              onClick={() => {
                setIsOpen(true);
                setType("حذف");
                handleClose();
              }}
            >
              <ListItemText>حذف لیست</ListItemText>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </Box>

        {/* show items */}
        {categoryItem ? (
          <Typography variant="h5">
            {categoryItem[0]?.userFavoriteCategoryTitle}
          </Typography>
        ) : (
          ""
        )}

        <Grid
          container
          gap={"1.5rem"}
          sx={{
            margin: "2.5rem 0 1rem",
            justifyContent: "space-around",
            alignItems: "flex-start",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {categoryItem ? (
            categoryItem.length > 0 ? (
              categoryItem.map((item, i) => {
                const categoryProps = {
                  title: item.hostTourTitle,
                  minPrice: item.price,
                  address: item.address,
                  images: item.images,
                  guid: item.hostTourGuid,
                  isLiked: true,
                  id: item.hostTourId,
                  isFavorite: true,
                  rate:item.rate,
                  countRate:item.countRate,
                };

                return (
                  <Grid item key={i} sx={{ flex: "0 0 auto" }}>
                    <HomeCard
                      changeFavoriteList={changeFavoriteList}
                      myData={categoryProps}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <NoValueComponent />
              </Grid>
            )
          ) : (
            [...Array(4)].map((_, i) => (
              <Grid item key={i} sx={{ flex: "0 0 auto" }}>
                <SkeletonCard />
              </Grid>
            ))
          )}
        </Grid>

        {/* module */}
        {categoryItem ? (
          <CategoryPopOver
            isOpen={isOpen}
            type={type}
            handleClose={handleClosePopOver}
            categoryInfo={categoryItem[0]}
          />
        ) : null}
      </Box>
    </>
  );
}
