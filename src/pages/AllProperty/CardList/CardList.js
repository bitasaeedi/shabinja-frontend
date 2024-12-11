import React, { useState } from "react";
import { Box, Pagination } from "@mui/material";
import HomeCard from "../../../components/Cards/HomeCards/HomeCards";

const CardList = ({ data }) => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get data for the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 10,
      }}
    >
      {/* Responsive Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          // gap: 2, // Consistent spacing between cards
          justifyContent: { xs: "center", sm: "space-around" },
          width: "100%",
          // maxWidth: "1200px", // Optional: Limit the container width
          padding: 2,
        }}
      >
        {currentData.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 calc(25% - 16px)", // 4 cards per row with a gap of 16px
              maxWidth: "calc(25% - 16px)", // Ensure cards stay within their space
              minWidth: "250px", // Minimum width for cards
              display: "flex",
              justifyContent: "center",
              my: 1,
            }}
          >
            <HomeCard myData={item} />
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{ mt: 3 }}
      />
    </Box>
  );
};

export default CardList;
