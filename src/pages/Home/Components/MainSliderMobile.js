import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const imagename = {
  name: "یزد",
  image:
    "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRKjC8GlPbbEFzE6JbY9Jv6gvqjXF9Rl_n-mSEU2Ou7WBbKcgnzAagRzZ_vSukLCqT8UvbAnfxqjfey_VwenlKntvG-I4PbmVOSB89Byg",
};
const MainSliderMobile = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: 0,
            paddingBottom:
              "56.25%" /* Aspect ratio 9:16 for vertical rectangle */,
            position: "relative",
            "@media (max-width: 768px)": {
              paddingBottom: "66.66%" /* Aspect ratio 2:3 on smaller screens */,
            },
            mt: 3,
          }}
        >
          <img
            src={imagename.image}
            alt={imagename.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 5,
              objectFit:
                "cover" /* Ensures the image covers the box without distortion */,
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default MainSliderMobile;
