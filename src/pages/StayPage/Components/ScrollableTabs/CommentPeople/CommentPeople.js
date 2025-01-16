import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CommentCardOfStay from "../../../../../components/Cards/CommentCardOfStay/CommentCardOfStay";
import { StayPageContext } from "../../../StayPage";
import PopOverShowComments from "./PopOverShowComments/PopOverShowComments";

const CommentPeople = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const stayPageContext = useContext(StayPageContext);
  useEffect(() => {
    const textList = stayPageContext.infoOfStay?.commentsTour || [];
    console.log(textList, "textList", stayPageContext.infoOfStay);
    var list = textList || [];
    setCommentsList(list);
  }, [stayPageContext.infoOfStay]);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Open popover only if not active
  };

  // Function to handle popover close
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: 18, md: 20 },
          }}
        >
          نظرات
        </Typography>
        <Box
          sx={{
            width: "100%",
            // px: 2,
            pt: 1,
          }}
          className="rounded"
        >
          <Grid container spacing={1}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CommentCardOfStay />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            sx={{
              backgroundColor: "#eeeeee",
              // fontSize: 16,
              color: "black",
              borderRadius: "5px",
              borderColor: "#bdbdbd",
            }}
            // size="small"
          >
            مشاهده همه نظرات (127 نظر)
          </Button>
        </Box>
      </Box>

      <PopOverShowComments
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
      />
    </>
  );
};

export default CommentPeople;
