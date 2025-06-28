import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import { Grid, Box, Typography } from "@mui/material";
import StackedImageComponent from "./StackedImageComponent";
import { useNavigate } from "react-router-dom";
import StackedImageSkeleton from "./StackedImageSkeleton";
const baseUrl = API_URL;

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
      console.log("all list response", response.data);
      setCategoryList(response.data.data);
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
          margin: "0 3rem",
        }}
      >
        <Grid container spacing={4}>
          {categoryList
            ? categoryList.map((list, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
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
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                 <StackedImageSkeleton/>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
