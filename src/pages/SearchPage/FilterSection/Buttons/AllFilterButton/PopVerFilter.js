import React, { createContext, useEffect, useRef, useState } from "react";
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
import ContainerFilters from "./Component/ContainerFilters";
import {
  GetOtherItemTourList,
  GetRollesList,
} from "../../../../../api/PublicApis";
export const PopVerFilterContext = createContext();

const PopVerFilter = ({ callBackFunc, anchorEl, handleClosePopover }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const [listRolles, setListRolles] = useState([]);
  const [selectedListRolles, setSelectedListRolles] = useState([]);
  // ----
  const [listOtherItem, setListOtherItem] = useState([]);
  const [selectedListOtherItem, setSelectedListOtherItem] = useState([]);

  useEffect(() => {
    handleGetRol();
    handleGetOtherItemTourList();
  }, []);

  useEffect(() => {
    console.log(selectedListRolles, "selectedListRolles" , selectedListOtherItem);
  }, [selectedListOtherItem, selectedListRolles]);
  // دریافت لیست قوانین
  const handleGetRol = async () => {
    const myList = await GetRollesList();
    setListRolles(myList.data || []);
    return myList;
  };

  const handleGetOtherItemTourList = async () => {
    const myList = await GetOtherItemTourList();
    setListOtherItem(myList.data || []);
    return myList;
  };

  const counterRef = useRef();

  const handleSubmitFilters = (listFilters) => {
    
  };

  return (
    <>
      <PopVerFilterContext.Provider
        value={{
          handleSubmitFilters: handleSubmitFilters,
          // ---
          listRolles: listRolles,
          selectedListRolles: selectedListRolles,
          setSelectedListRolles: setSelectedListRolles,
          // ---
          listOtherItem: listOtherItem,
          selectedListOtherItem: selectedListOtherItem,
          setSelectedListOtherItem: setSelectedListOtherItem,
        }}
      >
        {isMobile ? (
          <SwipeableDrawer
            anchor="bottom"
            open={Boolean(anchorEl)}
            onClose={handleClosePopover}
            onOpen={() => {}} // Optional: Add logic if needed when opening
            PaperProps={{
              sx: {
                maxHeight: "92vh", // Full-screen height
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px 12px 0 0", // Rounded top corners
                backgroundColor: "#ffff",
              },
            }}
          >
            {/* Fixed Header */}
            <Box
              sx={{
                position: "sticky",
                top: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
            >
              <Box>
                <Typography variant="h5" sx={{ fontSize: "20px" }}>
                  فیلترها
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleClosePopover}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider />

            {/* Scrollable Content */}
            <Box
              sx={{
                flex: 1, // Fills available space
                overflowY: "auto", // Makes content scrollable
                padding: "16px",
              }}
            >
              <ContainerFilters />
            </Box>

            <Divider />

            {/* Fixed Footer */}
            <Box
              sx={{
                position: "sticky",
                bottom: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-2 bg-white border-top border-muted"
            >
              <Button
                sx={{
                  color: "black",
                }}
                variant="text"
                size="small"
                // onClick={() => handleSubmitFilters(null)}
              >
                حذف فیلتر
              </Button>
              <Button
                sx={{
                  bgcolor: "black",
                }}
                variant="contained"
                size="small"
                onClick={() => handleSubmitFilters()}
              >
                ذخیره تغییرات
              </Button>
            </Box>
          </SwipeableDrawer>
        ) : (
          <Popover
            open={Boolean(anchorEl)}
            // anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                mt: 8,
                width: "500px",
                maxHeight: "500px",
                backgroundColor: "#ffff",
                px: 0,
                overflowY: "auto", // Allow vertical scrolling
              },
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
            >
              <Box>
                <Typography variant="h5" sx={{ fontSize: "20px" }}>
                  فیلترها
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleClosePopover}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              ref={counterRef}
              sx={{
                mt: 1,
                // padding: "16px",
                width: "100%",
                height: "100%",
                px: 0,
              }}
            >
              <ContainerFilters />
            </Box>

            {/* footer */}
            <Box
              sx={{
                position: "sticky",
                bottom: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-3 bg-white border-top border-muted"
            >
              <Button
                sx={{
                  color: "black",
                }}
                variant="text"
                size="small"
                // onClick={() => handleSubmitFilters(null)}
              >
                حذف فیلتر
              </Button>
              <Button
                sx={{
                  bgcolor: "black",
                }}
                variant="contained"
                size="small"
                onClick={() => handleSubmitFilters()}
              >
                ذخیره تغییرات
              </Button>
            </Box>
          </Popover>
        )}
      </PopVerFilterContext.Provider>
    </>
  );
};

export default PopVerFilter;
