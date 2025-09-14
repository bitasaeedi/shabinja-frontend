import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import InputeContainer from "./Componnets/InputeContainer";
import CounterComponent from "../../../components/CounterComponent/CounterComponent";
import PeopleIcon from "@mui/icons-material/People";

const Counter = ({ label, count, increment, decrement }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mt: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontSize: { xs: 16, md: 18 },
        fontWeight: { xs: 300, md: 500 },
        color: "#333",
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: { xs: 170, md: 300 },
      }}
    >
      <Button
        variant="outlined"
        onClick={increment}
        sx={{
          fontSize: { xs: 20, md: 25 },
          minWidth: { xs: 25, md: 30 },
          height: { xs: 25, md: 30 },
          borderRadius: "10%",
          padding: 0,
          borderColor: "#000",
        }}
      >
        +
      </Button>
      <Typography
        sx={{
          fontSize: { xs: 14, md: 16 },
          minWidth: "30px",
          textAlign: "center",
        }}
      >
        {count === 0 ? "نامشخص" : `${count} نفر`}
      </Typography>
      <Button
        variant="outlined"
        onClick={decrement}
        disabled={count <= 1}
        sx={{
          fontSize: { xs: 20, md: 25 },
          minWidth: { xs: 25, md: 30 },
          height: { xs: 25, md: 30 },
          borderRadius: "10%",
          padding: 0,
          borderColor: "#000",
        }}
      >
        -
      </Button>
    </Box>
  </Box>
);

const CapacityStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);

  const [loading, setLoading] = useState(false);
  const [buttonName, setButtonName] = useState("بعدی");
  const [standardCapacity, setStandardCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {},
  });

  // Store original values for comparison
  const [originalValues] = useState({
    minCapacity: manageStepsContext?.hostInfoUpdating?.minCapacity || 0,
    maxCapacity: manageStepsContext?.hostInfoUpdating?.maxCapacity || 0,
  });

  useEffect(() => {
    setStandardCapacity(manageStepsContext?.hostInfoUpdating?.minCapacity);
    setMaxCapacity(manageStepsContext?.hostInfoUpdating?.maxCapacity);
  }, [manageStepsContext?.hostInfoUpdating]);

  const hasFormChanged = useCallback(() => {
    return (
      standardCapacity !== originalValues.minCapacity ||
      maxCapacity !== originalValues.maxCapacity
    );
  }, [standardCapacity, maxCapacity, originalValues]);

  const hasOriginalData = useCallback(() => {
    return originalValues.minCapacity > 0 || originalValues.maxCapacity > 0;
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = standardCapacity > 0 && maxCapacity >= standardCapacity;
    const isUpdateMode = manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();
    
    console.log("isFormComplete:", isFormComplete, "isUpdateMode:", isUpdateMode, "formHasChanged:", formHasChanged, "hasOriginal:", hasOriginal);
    
    // Only show "ثبت" if:
    // 1. We're in update mode AND
    // 2. Form is complete AND 
    // 3. Form has changed AND
    // 4. We have original data (not just filling empty form)
    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [standardCapacity, maxCapacity, hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

  const onSubmit = async (data) => {
    setLoading(true);
    const {} = data;
    const myData = {
      minCapacity: standardCapacity,
      maxCapacity: maxCapacity,
    };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    return !(standardCapacity > 0 && maxCapacity >= standardCapacity);
  };
  return (
    <>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={8}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <InputeContainer label="ظرفیت استاندارد" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={standardCapacity}
                  increment={() => {
                    setStandardCapacity(standardCapacity + 1);
                    if (standardCapacity + 1 > maxCapacity) {
                      setMaxCapacity(standardCapacity + 1);
                    }
                  }}
                  decrement={() =>
                    setStandardCapacity(Math.max(0, standardCapacity - 1))
                  }
                  unit="نفر"
                  minValue={1}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label="حداکثر ظرفیت" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={maxCapacity}
                  increment={() => setMaxCapacity(maxCapacity + 1)}
                  decrement={() => {
                    const newValue = Math.max(0, maxCapacity - 1);
                    setMaxCapacity(newValue);
                    if (newValue < standardCapacity) {
                      setStandardCapacity(newValue);
                    }
                  }}
                  unit="نفر"
                  minValue={1}
                />
              </Box>
            </InputeContainer>
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
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
                <PeopleIcon sx={{ mr: 1 }} />
                ظرفیت اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                با مشخص کردن مشخصات اقامتگاه خود، جستجو اقامتگاه خود را راحت‌تر
                کنید.
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

export default CapacityStay;
