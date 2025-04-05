import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SignpostIcon from '@mui/icons-material/Signpost';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
const DescribGeoStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    setLoading(true)
    const {} = data;
    const myData = {};
    manageStepsContext?.handleNext(); // موقت
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false)
  };

  const isNextDisabled = () => !true;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormGroup>
            <Grid container spacing={0}></Grid>
          </FormGroup>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  mb: 1,
                }}
              >
                <SignpostIcon sx={{ mr: 1 }} />
                توصیف موقعیت اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                فاصله‌ی اقامتگاه خود را تا مکان های مهم مششخص کنید.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default DescribGeoStay;
