import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
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

import AssignmentIcon from "@mui/icons-material/Assignment";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CardUploadedImage from "./Componnets/CardUploadedImage";
import HomeDoc from "./Componnets/UploadDoctHome.js/HomeDoc";
import NationDoc from "./Componnets/UploadDoctHome.js/NationDoc";

const DocumentOfStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {},
  });

  // useEffect(() => {
  //   console.log(manageStepsContext?.hostInfoUpdating, "hostInfoUpdating");
  // }, [manageStepsContext?.hostInfoUpdating]);

  const onSubmit = async (data) => {
    setLoading(true);
    const {} = data;
    const myData = {};
    if (
      manageStepsContext?.stayCodeToComplete &&
      manageStepsContext?.hostInfoUpdating?.fileHost &&
      manageStepsContext?.hostInfoUpdating?.nationallImage
    ) {
      // await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(true);
  };

  const isNextDisabled = () => {
    return !(
      manageStepsContext?.hostInfoUpdating?.fileHost &&
      manageStepsContext?.hostInfoUpdating?.nationallImage
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={8}
          sx={
            {
              // display: { xs: "none", md: "block" },
            }
          }
        >
          <Grid container spacing={3}>
            <HomeDoc />
            <NationDoc />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={
            {
              // display: { xs: "none", md: "block" },
            }
          }
        >
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16,
            }}
          >
            <CardContent
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  mb: 1,
                }}
              >
                <ContactPageIcon sx={{ mr: 1 }} />
                مدارک صاحب اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                بارگذاری مدارک مالکیت و شناسایی برای احراز هویت الزامی است
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

export default DocumentOfStay;
