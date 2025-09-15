import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
  Collapse,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SelectCheckBox from "../../../components/CheckBoxSelect/SelectCheckBox";
import { GetOtherItemTourList } from "../../../api/PublicApis";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
const EmkanatStay = ({}) => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);
  const [buttonName, setButtonName] = useState("بعدی");

  const [selectedList, setSelectedList] = useState([]);

  // Store original values for comparison
  const [originalValues] = useState({
    otherItemTourIds: manageStepsContext?.hostInfoUpdating?.otherItemTourIds || [],
  });

  useEffect(() => {
    var emkanatList =
      manageStepsContext?.hostInfoUpdating?.otherItemTourIds || [];
    emkanatList = emkanatList.map((item) => parseFloat(item));
    setSelectedList(emkanatList);
  }, [manageStepsContext?.hostInfoUpdating?.otherItemTourIds]);

  const hasFormChanged = useCallback(() => {
    const originalIds = (originalValues.otherItemTourIds || []).map((item) => parseFloat(item));
    return JSON.stringify(selectedList.sort()) !== JSON.stringify(originalIds.sort());
  }, [selectedList, originalValues]);

  const hasOriginalData = useCallback(() => {
    return (originalValues.otherItemTourIds || []).length > 0;
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = selectedList?.length > 0;
    const isUpdateMode = manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();

    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [selectedList, hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

  const onSubmit = async (data) => {
    setLoading(true);
    const myData = { otherItemTourIds: selectedList };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const handleSelect = (item, isSelected) => {
    if (isSelected) {
      setSelectedList((prev) => [...prev, item]);
    } else {
      setSelectedList((prev) => prev.filter((selected) => selected !== item));
    }
  };

  const isNextDisabled = () => {
    return selectedList?.length <= 0;
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            امکانات و تجهیزات موجود در اقامتگاه خود را مشخص کنید
          </Typography>
          <FormGroup>
            <Grid container spacing={0}>
              {manageStepsContext?.listEmkanat.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  md={6} // Full width on small screens, half width on medium if `twoColumn` is true
                  key={index}
                >
                  <SelectCheckBox
                    item={item}
                    handleSelect={handleSelect}
                    listSelected={selectedList || []}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Grid>

        {/* کارت */}
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
              top: 16, // Keeps card sticky for larger screens
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
                gutterBottom
              >
                <BathtubOutlinedIcon sx={{ mr: 1 }} />
                امکانات اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
                در این قسمت امکانات موجود در اقامتگاه را مشخص کنید. .
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={onSubmit}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={isNextDisabled()}
        buttonText={buttonName}
      />
    </>
  );
};

export default EmkanatStay;
