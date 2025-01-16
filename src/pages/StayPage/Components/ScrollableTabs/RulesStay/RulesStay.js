import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { StayPageContext } from "../../../StayPage";

const RulesStay = () => {
  const [ruleItemsList, setRuleItemsList] = useState([]);
  const stayPageContext = useContext(StayPageContext);
  useEffect(() => {
    const textList = stayPageContext.infoOfStay?.rolItemTourIds || "";
    var list = textList.split(",");
    setRuleItemsList(list);
  }, [stayPageContext.infoOfStay]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: 18, md: 20 },
        }}
      >
        قوانین اقامتگاه
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
          {ruleItemsList.map((item, index) => (
            <Grid item xs={12} md={12} key={index}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    // my: 1,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RulesStay;
