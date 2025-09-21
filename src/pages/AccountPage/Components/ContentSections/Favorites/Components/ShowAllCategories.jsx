import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import {
  Grid,
  Box,
  Typography,
  CardMedia,
  CardContent,
  Skeleton,
  Card,
} from "@mui/material";
import StackedImageComponent from "./StackedImageComponent";
import { useNavigate } from "react-router-dom";
import StackedImageSkeleton from "./StackedImageSkeleton";
import SearchOff from "@mui/icons-material/SearchOff";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
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
        pb: { xs: 5, md: 0 },
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
        <Grid container spacing={3}>
          {categoryList ? (
            categoryList.length !== 0 ? (
              categoryList.map((list, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={index}
                  onClick={() => navigate(`/account/favorites/${list.id}`)}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={DownloadImageApi(list?.image)}
                      alt={list.title}
                      sx={{
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                    <CardContent
                      sx={{
                        "&:last-child": {
                          pb: 1, // یا هر مقدار دلخواه
                        },
                        textAlign: "center",
                        bgcolor: "#ffffff25",
                        p: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "text.primary", mb: 0 ,fontSize:"1.2rem"}}
                      >
                        {list.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <NoValueComponent />
              </Grid>
            )
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  sx={{ mx: "auto", mt: 1 }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}
