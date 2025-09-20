import { Box, Button, Grid, Typography, Divider, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CommentCardOfStay from "../../../../../components/Cards/CommentCardOfStay/CommentCardOfStay";
import CommentCardOfStaySkeleton from "../../../../../components/Cards/CommentCardOfStay/CommentCardOfStaySkeleton";
import { StayPageContext } from "../../../StayPage";
import PopOverShowComments from "./PopOverShowComments/PopOverShowComments";
import axios from "axios";
import API_URL from "../../../../../config/apiConfig";
import AverageRate from "./AverageRate";
import AverageSkeletone from "./AverageSkeletone";
const baseUrl = API_URL;

const CommentPeople = ({ id , newComment }) => {

  const [commentsList, setCommentsList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const stayPageContext = useContext(StayPageContext);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/HostTour/ListCommentsTourForHome/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response?.data?.data, "show comments response");
      setCommentsList(response?.data?.data);
      stayPageContext?.getMobileInfo(response?.data?.data);
    } catch (error) {
      console.log("show comments Error:", error?.response?.data);
    }
  };

  useEffect(() => {
    // console.log("id: ",id);
    
    fetchData();
  
  }, [id , newComment]);

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
      <Box>
        <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

        {/* average rate */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: 18, md: 20 },
            marginBottom: ".5rem",
          }}
        >
          میانگین امتیازات
        </Typography>

        {commentsList && commentsList.rate !== undefined ? (
          <AverageRate rates={commentsList} />
        ) : (
          <AverageSkeletone/>
        )}

        {/* comment */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: 18, md: 20 },
            marginTop: "2rem",
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
              : commentsList?.items?.slice(0, 4).map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <CommentCardOfStay comment={item} />
                  </Grid>
                ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            onClick={handleButtonClick}
            variant="contained"
            // sx={{
            //   backgroundColor: "#eeeeee",
            //   color: "black",
            //   borderRadius: "5px",
            //   borderColor: "#bdbdbd",
            // }}
          >
            {`مشاهده همه نظرات (${commentsList?.countcomment || 0} نظر)`}
          </Button>
        </Box>
      </Box>

      <PopOverShowComments
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        stayId={stayPageContext.infoOfStay?.id}
        callBackInfo={callBackInfo}
        comments={commentsList?.items}
      />
    </>
  );
};

export default CommentPeople;
