import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { StayPageContext } from "../../../StayPage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const OffStay = () => {
  const [ruleItemsList, setRuleItemsList] = useState([]);
  const stayPageContext = useContext(StayPageContext);
  useEffect(() => {
    const textList = stayPageContext.infoOfStay?.rolItemTourIds || "";
    var list = textList.split(",");
    setRuleItemsList(list);
  }, [stayPageContext.infoOfStay]);

  return (
    <Box>
      <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: 18, md: 20 },
        }}
      >
        تخفیف‌ها
      </Typography>

      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={"12"} sx={{ display: "flex" }}>
          <Stack className="border rounded px-2 py-2 " sx={{ minWidth: 120 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontSize: 14, color: "red" }}>
                % {stayPageContext.infoOfStay?.discountWeeky}
                <Typography
                  component={"span"}
                  variant="h6"
                  sx={{ fontSize: 14, color: "black", ml: 1 }}
                >
                  تخفیف
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontSize: 14 }}
              >{`بیش از ${7} شب`}</Typography>
            </Box>
          </Stack>
          <Stack
            className="border rounded px-2 py-2 mx-1 "
            sx={{ minWidth: 120 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontSize: 14, color: "red" }}>
                % {stayPageContext.infoOfStay?.discountMonth}
                <Typography
                  component={"span"}
                  variant="h6"
                  sx={{ fontSize: 14, color: "black", ml: 1 }}
                >
                  تخفیف
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontSize: 14 }}
              >{`بیش از ${30} شب`}</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OffStay;
