import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import { Grid, Box, Typography } from "@mui/material";
import StackedImageComponent from "./StackedImageComponent";
import { useNavigate } from "react-router-dom";
import StackedImageSkeleton from "./StackedImageSkeleton";
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
        هیچ لیستی برای نمایش وجود ندارد
      </Typography>
    </Box>
  );
};

export default function ShowAllCategories() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState();

  const fetchCategoryList = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/UserFavoriteCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("all list response", response?.data);
      setCategoryList(response?.data?.data);
      return response.data;
    } catch (error) {
      console.log("all listError:", error?.response?.data);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: "1rem 3rem",
        }}
      >
        <Grid container spacing={4}>
          {categoryList ? 
          (categoryList.length !==0 ? 
          (categoryList.map((list, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={index}
                  onClick={() => {
                    navigate(`/account/favorites/${list.id}`);
                  }}
                >
                  <StackedImageComponent imgSrc={list.image} />
                  <Typography
                    align="center"
                    variant="h6"
                    marginTop="5px"
                    fontSize="16px"
                  >
                    {list.title}
                  </Typography>
                </Grid>
              ))):
              (
                <Grid item xs={12}>
                  <NoValueComponent />
                </Grid>
              )
            )
            : Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                 <StackedImageSkeleton/>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
