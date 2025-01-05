import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { StayPageContext } from "../../../StayPage";

const CommentPeople = () => {
  const [commentsList, setCommentsList] = useState([]);
  const stayPageContext = useContext(StayPageContext);
  useEffect(() => {
    const textList = stayPageContext.infoOfStay?.commentsTour || [];
    var list = textList || [];
    setCommentsList(list);
  }, [stayPageContext.infoOfStay]);

  return (
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
          //   backgroundColor: "#e9e9e9",
          width: "100%",
          //   display: "flex",
          //   justifyContent: "space-around"
          px: 2,
          pt: 1,
        }}
        className="rounded"
      >
        <Grid container spacing={1}>
          {commentsList.map((item, index) => (
            <Grid item xs={12} md={12} key={index}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    // my: 1,
                  }}
                >
                  {index}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CommentPeople;
