import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CommentCardOfStay from "../../../../../../components/Cards/CommentCardOfStay/CommentCardOfStay";
const PopOverShowComments = ({ anchorEl, handleClosePopover }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}}
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
            نظرات
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClosePopover}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* <Divider /> */}
      <Box
        sx={{
          padding: "18px 16px",
          width: "100%",
        }}
      >
        <Grid container spacing={1}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <CommentCardOfStay showReplyes={true} item={item} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      <Box
        sx={
          {
            // padding: "8px 16px",
          }
        }
      ></Box>
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      //   anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          //   mt: 10,
          maxWidth: "45vw",
          //   maxHeight: "93vh",
          mx: "auto",
          pb: 2,
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0, // Ensure `top` is defined
          zIndex: 100,
        }}
        className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white border-bottom"
      >
        <Box>
          <Typography variant="h5" sx={{ fontSize: "20px" }}>
            نظرات
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClosePopover}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          px: 2,
          mt: 2,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
          <Grid item xs={12} md={12} key={index}>
            <CommentCardOfStay showReplyes={true} item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Popover>
  );
};

export default PopOverShowComments;
