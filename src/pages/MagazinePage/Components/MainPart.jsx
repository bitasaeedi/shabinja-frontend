import React from "react";
import SidebarPart from "./SidebarPart";
import ContentPart from "./ContentPart";
import { Box } from "@mui/material";
export default function MainPart() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "50vh",
          margin: "3.5rem 2.3rem 40rem",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        {/* content part */}
        <ContentPart myWidth={"72%"} />

        {/* side bar */}
        <SidebarPart myWidth={"24%"} />
      </Box>
    </>
  );
}
