import React, { useContext, useEffect, useState, useCallback } from "react";
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
  const [buttonName, setButtonName] = useState("بعدی");
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {},
  });

  // Store original values for comparison
  const [originalValues] = useState({
    fileHost: manageStepsContext?.hostInfoUpdating?.fileHost || "",
    nationallImage: manageStepsContext?.hostInfoUpdating?.nationallImage || "",
  });

  const hasFormChanged = useCallback(() => {
    return (
      manageStepsContext?.hostInfoUpdating?.fileHost !== originalValues.fileHost ||
      manageStepsContext?.hostInfoUpdating?.nationallImage !== originalValues.nationallImage
    );
  }, [manageStepsContext?.hostInfoUpdating?.fileHost, manageStepsContext?.hostInfoUpdating?.nationallImage, originalValues]);

  const hasOriginalData = useCallback(() => {
    return originalValues.fileHost || originalValues.nationallImage;
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = manageStepsContext?.hostInfoUpdating?.fileHost && manageStepsContext?.hostInfoUpdating?.nationallImage;
    const isUpdateMode = manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();

    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [manageStepsContext?.hostInfoUpdating?.fileHost, manageStepsContext?.hostInfoUpdating?.nationallImage, hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

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
        buttonText={buttonName}
      />
    </>
  );
};

export default DocumentOfStay;
