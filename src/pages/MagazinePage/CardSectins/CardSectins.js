import React, { useContext, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import CardHouseDetails from "../../../components/Cards/CardHouseDetails/CardHouseDetails";

import SkeletonCardHouseDetails from "../../../components/Cards/CardHouseDetails/SkeletonCardHouseDetails";

import CardMagSkeleton from "../../../components/Cards/CardMagazins/CardMagSkeleton";
import CardMagazin from "../../../components/Cards/CardMagazins/CardMagazin";

const CardSectins = ({ data = [], showMap, toggleMap, loading }) => {
  //   const searchPageContext = useContext(SearchPageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math
    .ceil
    // searchPageContext?.resutSearchTours?.countAll / itemsPerPage
    ();

  const handlePageChange = (event, value) => {
    // searchPageContext?.setCurrentPage(value);
  };

  return (
    <Box sx={{ pb: 10, mt: 4 }} className=" ">
      <Grid
        container
        // spacing={3}
        justifyContent="center"
        className=" mx-0 px-0"
      >
        {(loading ? Array.from({ length: itemsPerPage }) : data).map(
          (item, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center", mb: 2 }}
            >
              {loading ? (
                <CardMagSkeleton />
              ) : (
                <CardMagazin myData={item} isMapOpen={showMap} />
              )}
            </Grid>
          )
        )}
      </Grid>

      {/* Pagination */}
      {/* <Pagination
        count={totalPages} // تعداد کل صفحات
        page={searchPageContext?.currentPage} // شماره صفحه درحال حاضر
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      /> */}
    </Box>
  );
};

export default CardSectins;
