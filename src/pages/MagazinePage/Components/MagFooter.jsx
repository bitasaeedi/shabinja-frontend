import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { MagPageContext } from "../MagazinePage";
import logo_with_name from "../../../images/shabinja_logo_with_name.png";
export default function MagFooter() {
  const {
    categoryList = [],
    tagsList,
    handleCategoryFilter,
  } = useContext(MagPageContext) || {};

  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          `${API_URL}/SocialNetwork/List`,
          { take: 10, skip: 0 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const sorted =
          response?.data?.data?.sort((a, b) => a.order - b.order) || [];
        setSocialMedia(sorted);
      } catch (e) {
        setSocialMedia([]);
      }
    };
    fetchSocialMedia();
  }, []);

  const leftCats =
    categoryList?.slice(0, Math.ceil((categoryList?.length || 0) / 2)) || [];
  const rightCats =
    categoryList?.slice(Math.ceil((categoryList?.length || 0) / 2)) || [];

  const leftTags =
    tagsList?.slice(0, Math.ceil((categoryList?.length || 0) / 2)) || [];
  const rightTags =
    tagsList?.slice(Math.ceil((categoryList?.length || 0) / 2)) || [];
  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: "#f9f9f9",
          color: "#333",
          py: { md: 6 },
          borderTop: "1px solid #ddd",
          zIndex: "100 !important",
          paddingTop: "1.2rem",
          pb: { xs: 13, md: 6 },
          position: "relative",
          px: { xs: 2, md: 25 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={0}>
            {/* Right: Logo and Social */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: { xs: "left", md: "right" },
                  gap: 1.5,
                }}
              >
                <Box
                  component="img"
                  src={logo_with_name}
                  sx={{ width: { xs: 150, md: 250 } }}
                />

                <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                  شبکه های اجتماعی
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {(socialMedia.length
                    ? socialMedia.slice(0, 5)
                    : new Array(3).fill(null)
                  )?.map((item, idx) =>
                    item ? (
                      <Link
                        key={idx}
                        to={item?.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#fff",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid black",
                        }}
                      >
                        <Box
                          component="img"
                          src={DownloadImageApi(item?.image?.url)}
                          alt={item?.title || "social"}
                          sx={{ width: 20, height: 20, objectFit: "contain" }}
                        />
                      </Link>
                    ) : (
                      <Box
                        key={`sk-${idx}`}
                        sx={{
                          background: "#fff",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            </Grid>
            {/* Left: Categories  */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ paddingLeft: "0 !importent", mt: { xs: 2, md: 0 } }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, textAlign: "center" }}
              >
                دسته بندی ها
              </Typography>

              {/* category */}
              <Grid container spacing={4} justifyContent="space-between">
                <Grid item xs={6} sx={{}}>
                  <Stack spacing={1} alignItems="flex-end">
                    {leftCats?.map((tag, idx) => (
                      <Typography
                        key={`lt-${idx}`}
                        variant="body2"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCategoryFilter(tag?.title);
                        }}
                      >
                        {tag?.title || tag}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1} alignItems="flex-start">
                    {rightCats?.map((tag, idx) => (
                      <Typography
                        key={`rt-${idx}`}
                        variant="body2"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCategoryFilter(tag?.title);
                        }}
                      >
                        {tag?.title || tag}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Left:  and Tags */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ paddingLeft: "0 !importent", mt: { xs: 2, md: 0 } }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, textAlign: "center" }}
              >
                تگ ها
              </Typography>

              {/* category */}
              <Grid container spacing={4} justifyContent="space-between">
                <Grid item xs={6} sx={{}}>
                  <Stack spacing={1} alignItems="flex-end">
                    {leftTags?.map((tag, idx) => (
                      <Typography
                        key={`lt-${idx}`}
                        variant="body2"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCategoryFilter(tag?.title);
                        }}
                      >
                        {tag?.title || tag}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1} alignItems="flex-start">
                    {rightTags?.map((tag, idx) => (
                      <Typography
                        key={`rt-${idx}`}
                        variant="body2"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCategoryFilter(tag?.title);
                        }}
                      >
                        {tag?.title || tag}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
