import React, { useContext, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import MapToggleButton from "../components/MapToggleButton";
import CardHouseDetails from "../../../components/Cards/CardHouseDetails/CardHouseDetails";
import HomeCardSkeleton from "../../../components/Cards/HomeCards/HomeCardSkeleton";
import SkeletonCardHouseDetails from "../../../components/Cards/CardHouseDetails/SkeletonCardHouseDetails";
import { SearchPageContext } from "../SearchPage";

const CardList = ({ data = [], showMap, toggleMap, loading }) => {
  const searchPageContext = useContext(SearchPageContext);
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(
    searchPageContext?.resutSearchTours?.countAll / itemsPerPage
  );

  const handlePageChange = (event, value) =>
    searchPageContext?.setCurrentPage(value);

  return (
    <Box sx={{ mb: { xs: 5, md: 8 } }} className=" ">
      <Grid
        container
        spacing={3} // فاصله همیشه ثابت
        justifyContent="flex-start"
      >
        {(loading ? Array.from({ length: itemsPerPage }) : data).map(
          (item, index) => (
            <Grid
              item
              key={index}
              xs={12} // موبایل 1 ستون
              sm={6} // تبلت 2 ستون
              md={4} // دسکتاپ 3 ستون
              lg={showMap ? 4 : 3} // با نقشه 3 ستون، بدون نقشه 4 ستون
              xl={showMap ? 3 : 3} // خیلی بزرگ → 4 یا 6 ستون
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
        count={totalPages} // تعداد کل صفحات
        page={searchPageContext?.currentPage} // شماره صفحه درحال حاضر
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{
          mt: { xs: 4, md: 15 },
          display: "flex",
          justifyContent: "center",
        }}
      />

      {/* Map Toggle Button */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <MapToggleButton isMapOpen={showMap} onClick={toggleMap} />
      </Box>
    </Box>
  );
};

export default CardList;
