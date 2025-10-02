import React from "react";
import SidebarPart from "./SidebarPart";
import ContentPart from "./ContentPart";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import MagPosts from "./MagPosts";
export default function MainPart({ isMobile }) {
  const { id } = useParams();
  // console.log("id", id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: isMobile ? "2rem 0rem" : "3.5rem 3rem",
          paddingBottom: "3rem",
          gap: isMobile ? "2rem" : "1rem",
          justifyContent: "space-between",
        }}
      >
        {/* side bar */}
        {id ? null : <SidebarPart myWidth={"24%"} isMobile={isMobile} />}

        {/* content part */}
        {id ? <MagPosts isMobile={isMobile} /> : <ContentPart myWidth={"74%"} isMobile={isMobile} />}
        {/* <ContentPart myWidth={"72%"} /> */}
      </Box>
    </>
  );
}
