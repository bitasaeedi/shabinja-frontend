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
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import SwitchSelect from "../../../components/CheckBoxSelect/SwitchSelect";
import InputeContainer from "./Componnets/InputeContainer";
import CounterComponent from "../../../components/CounterComponent/CounterComponent";

const list = [
  { id: "12:00", title: "12 ظهر", value: 12 },
  { id: "13:00", title: "1 ظهر", value: 13 },
  { id: "14:00", title: "2 ظهر", value: 14 },
  { id: "15:00", title: "3 عصر", value: 15 },
  { id: "16:00", title: "4 عصر", value: 16 },
  { id: "17:00", title: "5 عصر", value: 17 },
  { id: "18:00", title: "6 عصر", value: 18 },
  { id: "19:00", title: "7 عصر", value: 19 },
  { id: "20:00", title: "8 شب", value: 20 },
  { id: "21:00", title: "9 شب", value: 21 },
  { id: "22:00", title: "10 شب", value: 22 },
  { id: "23:00", title: "11 شب", value: 23 },
  { id: "00:00", title: "12 نیمه‌شب", value: 24 },
  { id: "01:00", title: "1 بامداد", value: 1 },
  { id: "02:00", title: "2 بامداد", value: 2 },
  { id: "03:00", title: "3 بامداد", value: 3 },
  { id: "04:00", title: "4 بامداد", value: 4 },
  { id: "05:00", title: "5 بامداد", value: 5 },
  { id: "06:00", title: "6 صبح", value: 6 },
  { id: "07:00", title: "7 صبح", value: 7 },
  { id: "08:00", title: "8 صبح", value: 8 },
  { id: "09:00", title: "9 صبح", value: 9 },
  { id: "10:00", title: "10 صبح", value: 10 },
  { id: "11:00", title: "11 صبح", value: 11 },
];

const RulesStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [selectedList, setSelectedList] = useState([]);
  const [nightCount, setNightCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      start: manageStepsContext?.hostInfoUpdating?.start || "",
      end: manageStepsContext?.hostInfoUpdating?.end || "",
    },
  });

  const startInput = watch("start");
  const endInput = watch("end");
  const [filteredEndList, setFilteredEndList] = useState([]);

  useEffect(() => {
    var rulesSelected =
      manageStepsContext?.hostInfoUpdating?.rolItemTourIds || [];
      rulesSelected = rulesSelected.map((item) => parseFloat(item));
    setSelectedList(rulesSelected);
  }, [manageStepsContext?.hostInfoUpdating?.rolItemTourIds]);

  useEffect(() => {
    if (startInput) {
      const startIndex = list.findIndex((item) => item.id === startInput);
      if (startIndex !== -1) {
        const selectedStart = list[startIndex];
        const updatedList = list.filter(
          (item) =>
            item.value < selectedStart?.value &&
            item.value >= selectedStart?.value - 4
        );
        updatedList.sort((a, b) => a.value - b.value);
        setFilteredEndList(updatedList);
      }
    }
  }, [startInput]);

  const onSubmit = async (data) => {
    setLoading(true);
    const { start, end } = data;
    const myData = { start, end, rolItemTourIds: selectedList };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => !(startInput && endInput && nightCount > 0);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormGroup>
            <Grid container spacing={0}>
              {manageStepsContext?.listRules.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <SwitchSelect
                    item={item}
                    handleSelect={(item, isSelected) =>
                      setSelectedList((prev) =>
                        isSelected
                          ? [...prev, item]
                          : prev.filter((selected) => selected !== item)
                      )
                    }
                    listSelected={selectedList}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              {/* <Grid item xs={12}>
                <InputeContainer
                  label={"حداقل تعداد شب رزرو"}
                  flexOnMobile={true}
                >
                  <Box sx={{ width: "100%" }}>
                    <CounterComponent
                      count={nightCount}
                      increment={() => setNightCount(nightCount + 1)}
                      decrement={() =>
                        setNightCount(Math.max(1, nightCount - 1))
                      }
                      unit={"شب"}
                      minValue={1}
                    />
                  </Box>
                </InputeContainer>
              </Grid> */}

              <Grid item xs={12}>
                <InputeContainer label={"ساعت ورود"}>
                  <Controller
                    name="start"
                    control={control}
                    rules={{ required: "انتخاب الزامی است" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          setValue("end", "");
                          field.onChange(e);
                        }}
                      >
                        {list.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.id}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </InputeContainer>
              </Grid>

              <Grid item xs={12}>
                <InputeContainer label={"ساعت خروج"}>
                  <Controller
                    name="end"
                    control={control}
                    rules={{ required: "انتخاب الزامی است" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        size="small"
                        {...field}
                        select
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        disabled={!(filteredEndList?.length !== 0)}
                      >
                        {filteredEndList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.id}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </InputeContainer>
              </Grid>
            </Grid>
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
                <GavelOutlinedIcon sx={{ mr: 1 }} />
                قوانین اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                در این قسمت قوانین اقامتگاه را مشخص کنید.
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

export default RulesStay;
