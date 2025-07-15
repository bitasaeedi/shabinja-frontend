import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import jalaali from "jalaali-js";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
import ShowValuesSkeleton from "./ShowValuesSkeleton";
const baseUrl = API_URL;

const listButtons = [
  {
    title: "تغییر قیمت",
    state: 0,
  },
  {
    title: "پر و خالی ",
    state: 1,
  },
  {
    title: "تخفیف عادی",
    state: 2,
  },
  {
    title: "لحظه آخری",
    state: 3,
  },
  {
    title: "رزرو آنی",
    state: 4,
  },
  {
    title: "حداقل و حداکثر",
    state: 5,
  },
  {
    title: "ایام پیک",
    state: 6,
  },
];

const titlesList = [
  [
    //state 0
    {
      title: "قیمت",
      apiKey: "priceBase",
    },
  ],
  [
    //state 1
    {
      title: "پر و خالی",
      apiKey: "",
    },
  ],
  [
    //state 2
    {
      title: "هفتگی",
      apiKey: "weeklyDiscount",
    },
    {
      title: "ماهانه",
      apiKey: "monthlyDiscount",
    },
  ],
  [
    //state 3
    {
      title: "همان روز",
      apiKey: "charterNowDiscount",
    },
    {
      title: "یک روز قبل",
      apiKey: "charterOneDayAgoDiscount",
    },
    {
      title: "دو روز قبل",
      apiKey: "charterTwoDayAgoDiscount",
    },
  ],
  [
    //state 4
    {
      title: "رزرو آنی",
      apiKey: "",
    },
  ],
  [
    //state 5
    {
      title: "حداقل",
      apiKey: "minimumBookingDay",
    },
    {
      title: "حداکثر",
      apiKey: "maximumBookingDay",
    },
  ],
  [
    //state 6
    {
      title: "ایام پیک",
      apiKey: "",
    },
  ],
];

export default function ShowValues({ staycode }) {
  const [activeBtn, setActiveBtn] = useState(0);
  const [valuesList, setValuesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  // alert
  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  const getInfos = async () => {
    setLoading(true); // show loading state
    setValuesList([]);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/PriceHostTour/GetAllState/${staycode}/${activeBtn}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setValuesList(response?.data?.data);
      console.log("valuesList",valuesList.length);

      setLoading(false); // hide loading state
    } catch (error) {
      console.log(error?.response);

      return error?.response;
    }
  };

  //change date to shamsi
  function toShamsiDate(isoString) {
    const date = new Date(isoString);
    const { jy, jm, jd } = jalaali.toJalaali(date);
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(
      2,
      "0"
    )}`;
  }

  const handleDelete = async (guid) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${baseUrl}/PriceHostTour/Delete/${guid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getInfos();
      handleMangeAlert(true, "success", "عملیات با موفقیت انجام شد");
      return true;
    } catch (error) {
      console.log(error?.response);
      handleMangeAlert(true, "error", "عملیات با خطا مواجه شد");

      return error?.response;
    }
  };

  useEffect(() => {
    getInfos();
  }, [activeBtn]);

  return (
    <>
      <Box>
        {/* buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 3,
            gap: "6px",
            mb: 3,
          }}
        >
          {listButtons.map((btn, index) => {
            return (
              <Button
                key={index}
                variant="outlined"
                onClick={() => {
                  setActiveBtn(btn.state);
                }}
                sx={{
                  backgroundColor:
                    activeBtn === btn.state ? "#287dfa" : "transparent",
                  color: activeBtn === btn.state ? "white" : "#287dfa",
                  "&:hover": {
                    backgroundColor:
                      activeBtn === btn.state ? "#287dfa" : "#f5f5f5",
                  },
                }}
              >
                {btn.title}
              </Button>
            );
          })}
        </Box>

        {/* infos */}
        {loading ? (
          <ShowValuesSkeleton />
        ) : valuesList.length === 0 ? (
          <Box sx={{ textAlign: "center", my: 8, color: "#888" }}>
            هیچ داده‌ای برای نمایش وجود ندارد.
          </Box>
        ) : (
          valuesList?.map((info, index) => (
            <Box
              key={index}
              sx={{
                my: 2,
                border: "1px solid #d1d1d1",
                borderRadius: "5px",
                padding: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "7px",
                  }}
                >
                  <Box>تاریخ :</Box>
                  <Box> از {toShamsiDate(info.start)}</Box>
                  <Box> تا {toShamsiDate(info.end)}</Box>
                </Box>

                {titlesList[activeBtn]?.map((value, index) => {
                  // each field
                  let apiKey = value.apiKey;

                  if (apiKey === "") return null;

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        my: 2,
                      }}
                    >
                      <Box sx={{ minWidth: "70px" }}>{value.title} :</Box>

                      <Box
                        sx={{
                          border: "1px solid #d1d1d1",
                          padding: ".5rem 2rem",
                        }}
                      >
                        {info[apiKey]}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <IconButton
                onClick={() => {
                  handleDelete(info.guid);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
      {showAlertSetting?.show && (
        <MyAlertMui
          message={showAlertSetting?.message || ""}
          handleClose={() =>
            handleMangeAlert(
              false,
              showAlertSetting?.status,
              showAlertSetting?.message
            )
          }
          status={showAlertSetting?.status}
        />
      )}
    </>
  );
}
