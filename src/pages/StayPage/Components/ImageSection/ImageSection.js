import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { StayPageContext } from "../../StayPage";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
import { useParams } from "react-router-dom";
import SliderDetailsPage from "../../../../components/Sliders/SliderDetailsPage";
import CardImage from "../../../../components/Cards/CardImage/CardImage";
import SwiperImageOverlay from "./SwiperImageOverlay";

const ImageSection = () => {
  const { staycode } = useParams();

  const [listImages, setListImages] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

  const [loadedImages, setLoadedImages] = useState([]);
  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    setLoadedImages([]);
    const images = stayPageContext.infoOfStay?.hostImages || [];
    setListImages(images);
  }, [stayPageContext.infoOfStay]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Image Grid */}
      <Grid container spacing={2}>
        {/* Main Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: 280, sm: 300, md: "300px", lg: "380px" },
          }}
        >
          <SliderDetailsPage lists={[...listImages]} />
          <SwiperImageOverlay
            onLike={() => console.log("Liked!")}
            onShare={() => console.log("Shared!")}
            onNext={() => console.log("Next!")}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: 220, sm: 300, md: "300px", lg: "380px" },
            display: { xs: "none", md: "inherit" },
            p: 0, // حذف padding
          }}
        >
          <Grid
            container
            spacing={1} // حذف فاصله بین Grid itemها
            sx={{ height: "100%" }}
          >
            {listImages.slice(1, 5).map((item, index) => (
              <Grid
                item
                xs={6}
                key={index + 1}
                sx={{
                  height: "50%",
                  p: 0, // حذف padding داخلی
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
