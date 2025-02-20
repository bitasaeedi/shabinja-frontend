import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyMap from "../../../components/MyMap/MyMap";
import MapOutlined from "@mui/icons-material/MapOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
const SelectLocation = () => {
  const manageStepsContext = useContext(ManageStepsContext);

  const [loading, setLoading] = useState(false);
  const [newPosition, setNewPosition] = useState(null);
  const [defaultPosition, setDefaultPosition] = useState(null);
  useEffect(() => {
    if (manageStepsContext?.hostInfoUpdating?.loc) {
      setNewPosition(manageStepsContext?.hostInfoUpdating?.loc);
    } else if (manageStepsContext?.hostInfoUpdating?.cityTitle) {
      handleGetDefaultPosition();
    }
  }, [manageStepsContext?.hostInfoUpdating]);
  // دریافت موقعیت جدید از نقشه
  const returnNewPositionOnDrag = (lat, lng, id) => {
    setNewPosition(`${lat},${lng}`);
  };

  // دریافت موقعیت شهر
  const handleGetDefaultPosition = async () => {
    const result = await geocodeLocation(
      manageStepsContext?.hostInfoUpdating?.cityTitle,
      manageStepsContext?.hostInfoUpdating?.cityTitle
    );
    setDefaultPosition(
      result?.lat ? `${result?.lat},${result?.lon}` : "35.6892523,51.3896004"
    );
  };

  // به روز رسانی موقعیت جدید
  const onSubmit = async () => {
    if (!newPosition) {
      return;
    }
    setLoading(true);
    var myData = { loc: newPosition };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const geocodeLocation = async (city, province) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          city
        )}&state=${encodeURIComponent(province)}&format=json&limit=1`
      );
      const data = await response.json();
      // console.log(data, "geocodeLocation");
      if (data.length > 0) {
        // console.log(data[0], "detaile ");
        const { lat, lon } = data[0];

        console.log(`${lat},${lon}`);
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        // setDefaultPosition("35.6892523,51.3896004");
        return { lat: parseFloat(35.6892523), lon: parseFloat(51.3896004) };
        // throw new Error("Location not found");
      }
    } catch (error) {
      // console.error("Error during geocoding:", error);
      return { lat: parseFloat(35.6892523), lon: parseFloat(51.3896004) };

      return null;
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Map Section */}
        <Grid item xs={12} md={8}>
          {/* <Typography variant="h6" gutterBottom>
          انتخاب موقعیت در نقشه
        </Typography> */}
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: { xs: 13, md: 16 } }}
          >
            لطفاً مکان‌نمای نقشه را با دقت به محل اقامتگاه خود منتقل کنید.
          </Typography>
          <Alert
            severity="error"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                textAlign: "justify",
                fontSize: { xs: 13, md: 16 },
              }}
            >
              موقعیت مکانی (لوکیشن) را به دقت انتخاب کنید
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: "justify",
                fontSize: { xs: 13, md: 16 },
              }}
            >
              در صورت انتخاب اشتباه، امکان کنسل شدن رزرو توسط کاربران وجود دارد.
            </Typography>
          </Alert>
          <Box
            sx={{
              mt: 2,
              height: 300,
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {defaultPosition || newPosition ? (
              <MyMap
                points={[
                  // manageStepsContext?.hostInfoUpdating,
                  {
                    id: 1,
                    loc: newPosition ? newPosition : defaultPosition,
                  },
                ]}
                dragable={true}
                returnNewPositionOnDrag={returnNewPositionOnDrag}
                zoomDefault={12}
                scrollWheelZoomBool={false}
                showPopup={false}
              />
            ) : (
              <>loading ...</>
            )}
          </Box>
        </Grid>

        {/* Information Section */}
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
                <LocationOnOutlinedIcon sx={{ mr: 1 }} />
                مکان اقامتگاه روی نقشه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
                با حرکت مکان‌نما روی نقشه، آن را به محل دقیق اقامتگاه خود منتقل
                کنید. این کار به کاربران کمک می‌کند تا مکان دقیق اقامتگاه شما را
                بیابند.
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
        nexDisable={!newPosition}
      />
    </>
  );
};

export default SelectLocation;
