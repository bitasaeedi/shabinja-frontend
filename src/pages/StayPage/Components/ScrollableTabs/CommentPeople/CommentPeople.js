import { Box, Button, Grid, Typography, Skeleton, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CommentCardOfStay from "../../../../../components/Cards/CommentCardOfStay/CommentCardOfStay";
import CommentCardOfStaySkeleton from "../../../../../components/Cards/CommentCardOfStay/CommentCardOfStaySkeleton";
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

  const callBackInfo = (data) => {};

  // Check if data is still loading

  return (
    <>
      {(commentsList.length >= 0 || stayPageContext?.loading) && (
        <Box>
          <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
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
              pt: 1,
            }}
            className="rounded"
          >
            <Grid container spacing={1}>
              {stayPageContext?.loading
                ? [1, 2, 3, 4].map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <CommentCardOfStaySkeleton />
                    </Grid>
                  ))
                : commentsList?.slice(0, 4).map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <CommentCardOfStay comment={item} />
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
                color: "black",
                borderRadius: "5px",
                borderColor: "#bdbdbd",
              }}
            >
              {`مشاهده همه نظرات (${commentsList?.length} نظر)`}
            </Button>
          </Box>
        </Box>
      )}
      <PopOverShowComments
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        stayId={stayPageContext.infoOfStay?.id}
        callBackInfo={callBackInfo}
      />
    </>
  );
};

export default CommentPeople;
