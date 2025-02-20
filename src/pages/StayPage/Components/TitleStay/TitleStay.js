import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { StayPageContext } from "../../StayPage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const TitleStay = () => {
  const stayPageContext = useContext(StayPageContext);
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {stayPageContext?.infoOfStay?.title || ""}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: 2,
              backgroundColor: "white",
              color: "black",
              borderColor: "#ccc",
            }}
          >
            اشتراک‌گذاری
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
            sx={{
              borderRadius: 2,
              backgroundColor: "white",
              color: "black",
              borderColor: "#ccc",
            }}
          >
            افزودن به مورد علاقه‌ها
          </Button>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ marginBottom: 2 }}
      >
        {/* {`${stayPageContext?.infoOfStay?.accerss || ""}، ${
          stayPageContext?.infoOfStay?.room || ""
        } اتاق، ${stayPageContext?.infoOfStay?.minCapacity || ""}تا${
          stayPageContext?.infoOfStay?.maxCapacity || ""
        } نفر`} */}
      </Typography>
    </Box>
  );
};

export default TitleStay;
