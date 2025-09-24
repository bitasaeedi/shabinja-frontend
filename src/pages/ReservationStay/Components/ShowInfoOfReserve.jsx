import { Button, Divider, Skeleton, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import React, { useContext } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ButtonForEditDates from "./ButtonForEditDates";
import ButtonEditCount from "./ButtonEditCount";
import InfoOfUser from "./InfoOfUser";
import { ReservationStayContext } from "../ReservationStay";
import moment from "moment-jalaali";
import { PriceHostTourListApi } from "../../../api/toureApis";
import { useNavigate } from "react-router-dom";
const ShowInfoOfReserve = () => {
  moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

  const { paramsValues, stepName } = useContext(ReservationStayContext);
  const navigate = useNavigate();
  const handleShowDateLikeStr = (shamsidate) => {
    const mStartDate = moment(shamsidate, "jYYYY/jMM/jDD");
    const formattedStart = mStartDate.format("jD jMMMM");
    return formattedStart; // Outputs: 5 تیر
  };

  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: {xs:"center" , md:"end"},
          flexDirection:{xs:"column" , md:"row"}
        }}
      >
        {/* right part */}
        <Box>
          {/* تاریخ */}
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{ my: 2 }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
                <Box>
                  <CalendarMonthOutlinedIcon />
                </Box>

                <Box display="column" alignItems="center">
                  <Typography variant="subtitle1" color={"grey"}>
                    تاریخ سفر
                  </Typography>

                  <Typography variant="p" fontWeight="bold">
                    {paramsValues?.start ? (
                      `${handleShowDateLikeStr(
                        paramsValues?.start
                      )} - ${handleShowDateLikeStr(paramsValues?.end)}`
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box textAlign="end">
              {stepName === "preview" && <ButtonForEditDates />}
            </Box>
          </Box>

          {/* تعداد مسافران */}
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{ my: 2 }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
                <Box>
                  {" "}
                  <PeopleAltOutlinedIcon />
                </Box>

                <Box display="column" alignItems="center">
                  <Typography variant="subtitle1" color={"grey"}>
                    تعداد مسافران
                  </Typography>

                  <Typography variant="p" fontWeight="bold">
                    {paramsValues?.count ? (
                      <> {paramsValues?.count} نفر</>
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box textAlign="end">
              {stepName === "preview" && <ButtonEditCount />}
            </Box>
          </Box>
          {/* اطلاعات مسافر */}

          <InfoOfUser />
        </Box>

        {/* left part */}

        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            mb: 5,
            mt:{xs:2 , md:0}
          }}
          onClick={() => {
            navigate("/account/reservations")
          }}
        >
          پنل رزرو ها
        </Button>
      </Box>
      <Divider />
    </>
  );
};

export default ShowInfoOfReserve;
