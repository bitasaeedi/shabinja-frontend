import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FilterSection from "./FilterSection/FilterSection";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import { useLocation } from "react-router-dom"; // Import useLocation

const AllProperty = () => {
  const location = useLocation();
  const [typeHome, setTypeHome] = useState({});
  const listPropertiys = ItemsFastSearch;
  useEffect(() => {
    window.scroll(0, 0);
    const page = listPropertiys.find(
      (item) => item.linkAddres === location.pathname
    );
    console.log(page, "page");
    setTypeHome(page);
  }, []);

  const handleSearch = async () => {};
  return (
    <Box
      className="w-100 p-0"
      sx={{
        // backgroundColor: "red",
        minHeight: "150vh",
      }}
    >
      {/* Sticky Box */}
      <FilterSection />
      {/* Main Content */}
      <Box sx={{ padding: "16px", marginTop: "65px" }}>
        <Typography variant="h5">{typeHome?.description}</Typography>
      </Box>
    </Box>
  );
};

export default AllProperty;
