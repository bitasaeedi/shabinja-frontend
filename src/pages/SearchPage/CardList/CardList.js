import React, { useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import MapToggleButton from "../components/MapToggleButton";
import CardHouseDetails from "../../../components/Cards/CardHouseDetails/CardHouseDetails";
import HomeCardSkeleton from "../../../components/Cards/HomeCards/HomeCardSkeleton";
import SkeletonCardHouseDetails from "../../../components/Cards/CardHouseDetails/SkeletonCardHouseDetails";

const CardList = ({ data = [], showMap, toggleMap, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate total pages and current page data
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <Box sx={{ mb: 10 }} className=" ">
      <Grid
        container
        // spacing={3}
        justifyContent="center"
        className=" mx-0 px-0"
      >
        {(loading ? Array.from({ length: itemsPerPage }) : currentData).map(
          (item, index) => (
            <Grid
              item
              xs={showMap ? 12 : 12}
              sm={showMap ? 12 : 12}
              md={showMap ? 12 : 6}
              lg={showMap ? 6 : 4}
              key={index}
              sx={{ display: "flex", justifyContent: "center", mb: 1 }}
            >
              {loading ? (
                <SkeletonCardHouseDetails />
              ) : (
                <CardHouseDetails myData={item} isMapOpen={showMap} />
              )}
            </Grid>
          )
        )}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />

      {/* Map Toggle Button */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <MapToggleButton isMapOpen={showMap} onClick={toggleMap} />
      </Box>
    </Box>
  );
};

export default CardList;
