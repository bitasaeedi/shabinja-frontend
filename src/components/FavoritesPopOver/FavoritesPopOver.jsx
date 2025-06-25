import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  SwipeableDrawer,
  Popover,
  Button,
  InputBase,
  Input,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import styled from "@emotion/styled";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Ensure it takes up the full width
  border: "1px solid #777777a1",
  borderRadius: 5,
  padding: ".2rem 1rem",
  cursor: "pointer",
  marginTop: "1rem",
}));

function NotExist() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          padding: "2rem",
          pt: "rem",
        }}
      >
        <PlaylistRemoveIcon sx={{ fontSize: 60, color: "grey.500" }} />

        <Typography
          variant="h6"
          sx={{ mt: 3, fontSize: "18px", color: "grey.600" }}
        >
          هنوز هیچ لیستی ایجاد نکرده‌اید!
        </Typography>
      </Box>
    </>
  );
}

const list=[
  { name: "جنوب گردی", image: "../../assest/images/pool.png" },
  { name: "شمال", image: "../../assest/images/pool.png" },
  { name: "کردستان", image: "../../assest/images/pool.png" },
]

export default function FavoritesPopOver({ isLiked, handleClose, popWidth }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [categoryList, setCategoryList] = useState([]);
  const [showAddInput, setShowAddInput] = useState(false);

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(isLiked)}
      onClose={handleClose}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0",
          backgroundColor: "#ffff",
        },
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ color: "white" }}>عنوان</Typography>
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            width: "50px",
            height: "8px",
            borderRadius: "20%",
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          padding: " 0 1rem",
          minHeight: "250px",
        }}
      >
        {/* {children ? children :"اطلاعاتی یافت نشد."}ّ */}
      </Box>
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(isLiked)}
      //   anchorEl={anchorEl}
      onClose={handleClose}
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
          mt: 10,
          zIndex: 100,
          padding:"10px 20px"
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          padding: "18px 16px",
          width: "500px",
        }}
      >
        {/* title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "auto",
          }}
        >
          <Typography variant="h6" mb={3} fontSize={"18px"}>
            علاقه مندی های شما
          </Typography>
          <CloseIcon
            sx={{ fontSize: "18px", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>

        {/* add list */}
        <Button
          variant="contained"
          startIcon={
            <PlaylistAddIcon sx={{ fontSize: "24px", marginBottom: ".2rem" }} />
          }
          sx={{ p: ".6rem 1.1rem" }}
          onClick={() => {
            setShowAddInput(!showAddInput);
          }}
        >
          اضافه کردن لیست جدید
        </Button>

        {/* add input */}

        {showAddInput ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <StyledInputBase placeholder="نام لیست ..."/>
            <IconButton
              sx={{
                border: "1px solid #77777799",
                height: "auto",
                padding: ".4rem",
                borderRadius: "5px",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
              }}
              onClick={() => {
                setShowAddInput(false);
              }}
            >
              <AddIcon sx={{ color: "#777" }} />
            </IconButton>
          </Box>
        ) : (
          "" )}


        {/* lists */}
        <Box
  sx={{
    mt: 3,
  }}
>
  {categoryList ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "1rem",
        
      }}
    >
      {list.map((l, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            padding: ".5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            component="img"
            src={require("../../assest/images/pool.png")}
            alt=""
            sx={{
              width: "50px",
              height: "50px",
            }}
          />
          <Typography variant="body1">{l.name}</Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <NotExist />
  )}
</Box>

      </Box>
    </Popover>
  );
}
