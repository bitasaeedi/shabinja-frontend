import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";

import { StayPageContext } from "../../StayPage";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
import { useParams } from "react-router-dom";
import SliderDetailsPage from "../../../../components/Sliders/SliderDetailsPage";
import CardImage from "../../../../components/Cards/CardImage/CardImage";

const ImageSection = () => {
  const { staycode } = useParams();
  const [listImages, setListImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    setLoadedImages([]);
    const images = stayPageContext.infoOfStay?.hostImages || [];
    setListImages(images);
  }, [stayPageContext.infoOfStay]);

  return (
    <Box>
      {/* Image Grid */}
      <Grid container spacing={2}>
        {/* Main Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ height: { xs: 220, sm: 300, md: "300px", lg: "380px" } }}
        >
          <SliderDetailsPage lists={[...listImages]} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: 250, md: "300px", lg: "380px" },
            display: { xs: "none", md: "inherit" },
          }}
        >
          <Grid container spacing={1} sx={{ height: "100%" }}>
            {listImages.slice(1, 5).map((item, index) => (
              <Grid
                item
                xs={6}
                key={index + 1}
                sx={{
                  height: "50%",
                  // border: "1px solid #eeeeee",
                }}
              >
                <CardImage myData={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageSection;
