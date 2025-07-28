import { Box } from "@mui/material";
import React from "react";

const FastSearchcomponentMobile = ({ lists, children, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        // gap: 2, // Consistent spacing between cards
        justifyContent: { xs: "center", sm: "center" },
        width: "100%",
        // maxWidth: "1200px", // Optional: Limit the container width
        // padding: 2,
      }}
      className=" px-0 mx-0 mt-2"
    >
      {lists.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
          className=" px-0 mx-0"
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              myData: item,
            })
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FastSearchcomponentMobile;
