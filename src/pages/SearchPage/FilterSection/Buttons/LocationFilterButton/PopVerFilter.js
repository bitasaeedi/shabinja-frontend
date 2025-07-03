import React, { useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SelectCity from "../AllFilterButton/Component/SelectCity";
import { useContext } from "react";
import { SearchPageContext } from "../../../SearchPage";
import { useEffect } from "react";
import { useState } from "react";

const PopVerFilter = ({ anchorEl, handleClosePopover, callBackFunc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile
  const searchPageContext = useContext(SearchPageContext);
  const [selectedListCity, setSelectedListCity] = useState([]);
  const [listProvince, setListProvince] = useState([]);

  useEffect(() => {
    setListProvince(searchPageContext?.resutSearchTours?.provinces || []);
  }, [searchPageContext?.resutSearchTours?.provinces]);

  useEffect(() => {
    const listValues = searchPageContext.listFiltersInUrl;
    var cityList = [];
    listValues.forEach((element) => {
      if (element.label === "cities") {
        cityList = element?.value?.split(",") || [];
      }
    });

    setSelectedListCity(cityList);
  }, [searchPageContext.listFiltersInUrl.length]);

  const handleFilter = (list = []) => {
    const value =
      list?.length > 0 ? selectedListCity.map((item) => item) : null;
    callBackFunc(value);
  };
  
  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "600px", // Full-screen height
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0", // Rounded top corners
          backgroundColor: "#ffff",
        },
      }}
    ></SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: 2,
          width: "460px",
          backgroundColor: "#ffff",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          pt: 1,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#333",
            marginBottom: 1,
          }}
        >
          انتخاب شهر
        </Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseIcon />
        </IconButton>
      </Box>

      
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            px: 2,
          }}
        >
          <Box
            sx={{
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            <SelectCity
              showAllInitially={true}
              title={"انتخاب شهر"}
              list={listProvince.map((item) => ({
                id: item?.id,
                title: item?.title,
                searchtitle: item?.title,
                cities: item?.cities.map((city) => ({
                  id: city?.id,
                  title: city?.title,
                  searchtitle: city?.title,
                })),
              }))}
              listSelected={selectedListCity}
              handleChangeListSelected={setSelectedListCity}
            />
          </Box>


          {/* <hr /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Button
              sx={{
                color: "black",
              }}
              variant="text"
              size="small"
              disabled={selectedListCity < 1}
              onClick={() => handleFilter([])}
            >
              حذف فیلتر
            </Button>
            <Button
              sx={{
                bgcolor: "black",
              }}
              variant="contained"
              size="small"
              // disabled={count < 1}
              onClick={() => handleFilter(selectedListCity)}
            >
              ثبت تغییرات
            </Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default PopVerFilter;
