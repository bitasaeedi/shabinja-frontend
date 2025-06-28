import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import FolderOffIcon from "@mui/icons-material/FolderOff";

const StackedImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "190px",
  height: "180px",
  margin: "10px auto 0",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#e8e8e8",
    transform: "rotate(8deg)", //-5
    zIndex: -2,
  },
  "&::after": {
    transform: "rotate(4deg)", //5
    zIndex: -1,
  },
}));

const StackedImage = styled("img")({
  display: "block",
  width: "100%",
  height: "100%",
  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  position: "relative",
  zIndex: 1,
  padding: ".2rem",
  backgroundColor: "#e8e8e8",
  transform: "rotate(0deg)", //1,
  cursor: "pointer",
});
const StackedDiv = styled("div")({
  display: "block",
  width: "100%",
  height: "100%",
  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  position: "relative",
  zIndex: 1,
  padding: ".2rem",
  backgroundColor: "#e8e8e8",
  transform: "rotate(0deg)", //1,
  cursor: "pointer",
});

export default function StackedImageComponent({ imgSrc }) {
  console.log("img", imgSrc);

  return (
    <>
      {imgSrc ? (
        <StackedImageWrapper>
          <StackedImage
            src={DownloadImageApi(imgSrc)}
            alt="Sydney Opera House"
          />
        </StackedImageWrapper>
      ) : (
        <StackedImageWrapper>
          <StackedDiv
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FolderOffIcon sx={{ fontSize: 60, color: "#bbb" }} />
          </StackedDiv>
        </StackedImageWrapper>
      )}
    </>
  );
}
