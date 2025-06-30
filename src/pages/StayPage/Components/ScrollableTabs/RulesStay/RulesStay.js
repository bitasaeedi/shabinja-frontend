import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { StayPageContext } from "../../../StayPage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { GetRollesList } from "../../../../../api/PublicApis";
import RowRules from "./RowRules";

const RulesStay = () => {
  const [ruleItemsList, setRuleItemsList] = useState([]);
  const [allRules, setAllRules] = useState([]);
  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    handleGetAllItems();
    const textList = stayPageContext.infoOfStay?.rolItemTourIds || "";
    const list = textList.split(",");
    setRuleItemsList(list);
  }, [stayPageContext.infoOfStay]);

  // useEffect(() => {
  //   const textList = stayPageContext.infoOfStay?.rolItemTourIds || "";
  //   var list = textList.split(",");
  //   setRuleItemsList(list);
  // }, [stayPageContext.infoOfStay]);

  const handleGetAllItems = async () => {
    try {
      const result = await GetRollesList();
      setAllRules(result?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box>
      <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: 18, md: 20 },
        }}
      >
        قوانین اقامتگاه
      </Typography>

      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={"12"} sx={{ display: "flex" }}>
          <Stack className="border rounded px-2 py-2 " sx={{ minWidth: 120 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontSize: 14 }}
                color="textSecondary"
              >
                <AccessTimeIcon sx={{ mr: 1, fontSize: 18 }} />
                ساعت ورود از
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 15 }}
              >{`${stayPageContext.infoOfStay?.start} `}</Typography>
            </Box>
          </Stack>
          <Stack
            className="border rounded px-2 py-2 mx-1 "
            sx={{ minWidth: 120 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontSize: 14 }}
                color="textSecondary"
              >
                <AccessTimeIcon sx={{ mr: 1, fontSize: 18 }} />
                ساعت خروج تا
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 15 }}
              >{`${stayPageContext.infoOfStay?.end} `}</Typography>
            </Box>
          </Stack>
        </Grid>

        {allRules.map((item, index) => (
          <Grid item xs={12} md={12} key={index}>
            <RowRules item={item} ruleItemsList={ruleItemsList} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RulesStay;
