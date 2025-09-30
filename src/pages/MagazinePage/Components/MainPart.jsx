import React from "react";
import SidebarPart from "./SidebarPart";
import ContentPart from "./ContentPart";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import MagPosts from "./MagPosts";
export default function MainPart() {
  const { id } = useParams();
  console.log("id", id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          margin: "3.5rem 3rem",
          paddingBottom: "3rem",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        {/* side bar */}
        {id ? null : <SidebarPart myWidth={"24%"} />}

        {/* content part */}
        {id ? <MagPosts /> : <ContentPart myWidth={"74%"} />}
        {/* <ContentPart myWidth={"72%"} /> */}
      </Box>
    </>
  );
}
