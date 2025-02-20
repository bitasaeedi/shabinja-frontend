import React, { useState, useRef, useEffect, createContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Header from "../../layout/header/Header";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SelectAddress from "./Components/SelectAddress";
import SelectLocation from "./Components/SelectLocation";
import UplaodImages from "./Components/UplaodImages";
import AboutStay from "./Components/AboutStay";
import InfoStay from "./Components/InfoStay";
import { Typography } from "@mui/material";
import EmkanatStay from "./Components/EmkanatStay";
import RulesStay from "./Components/RulesStay";
import PriceStay from "./Components/PriceStay";
import CapacityStay from "./Components/CapacityStay";
import SpaceSleepStay from "./Components/SpaceSleepStay";
import {
  GetTypeHostListApi,
  GetTypeHostLocListApi,
  HostTourCreateApi,
  HostTourSearchOneApi,
  HostTourSearchOneApiForEdit,
  HostTourUpdateApi,
} from "../../api/toureApis";
import { useNavigate } from "react-router-dom";
import {
  GetOtherItemTourList,
  getProvinceList,
  GetRollesList,
} from "../../api/PublicApis";
import CancelRules from "./Components/CancelRules";
import OffConditions from "./Components/OffConditions";
import ShabinjaRules from "./Components/ShabinjaRules";
import DocumentOfStay from "./Components/DocumentOfStay";
import DescribGeoStay from "./Components/DescribGeoStay";
export const ManageStepsContext = createContext();
// تنظیمات مراحل
const stepsConfig = [
  {
    label: "آدرس",
    activeLabel: "آدرس اقامتگاه خود را مشخص کنید",
    stepNumber: 1,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <SelectAddress />
      </Box>
    ),
  },
  {
    label: "نقشه",
    activeLabel: "انتخاب محل دقیق روی نقشه",
    stepNumber: 2,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <SelectLocation />
      </Box>
    ),
  },
  {
    label: "نوع اقامتگاه",
    activeLabel: "نوع اقامتگاه را وارد کنید",
    stepNumber: 5,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <InfoStay />
      </Box>
    ),
  },

  {
    label: "مشخصات اقامتگاه",
    activeLabel: "مشخصات اقامتگاه را وارد کنید",
    stepNumber: 4,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <AboutStay />
      </Box>
    ),
  },
  {
    label: "ظرفیت اقامتگاه",
    activeLabel: "ظرفیت اقامتگاه را مشخص کنید ",
    stepNumber: 5,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <CapacityStay />
      </Box>
    ),
  },
  {
    label: "فضای خواب",
    activeLabel: "فضای خواب",
    stepNumber: 5,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <SpaceSleepStay />
      </Box>
    ),
  },
  {
    label: "امکانات اقامتگاه",
    activeLabel: "امکانات اقامتگاه را انتخاب کنید",
    stepNumber: 6,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <EmkanatStay />
      </Box>
    ),
  },
  {
    label: "توصیف موقعیت اقامتگاه",
    activeLabel: "توصیف موقعیت اقامتگاه",
    stepNumber: 3,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <DescribGeoStay />
      </Box>
    ),
  },
  {
    label: "تصاویر اقامتگاه",
    activeLabel: "تصاویر اقامتگاه را آپلود کنید",
    stepNumber: 3,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <UplaodImages />
      </Box>
    ),
  },
  {
    label: "مدارک اقامتگاه",
    activeLabel: "مدارک مربوط به اقامتگاه را آپلود کنید ",
    stepNumber: 3,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <DocumentOfStay />
      </Box>
    ),
  },

  {
    label: "قوانین اقامتگاه",
    activeLabel: "قوانین اقامتگاه را مشخص کنید",
    stepNumber: 7,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <RulesStay />{" "}
      </Box>
    ),
  },
  {
    label: "قوانین لغو رزرو",
    activeLabel: "قوانین لغو رزرو را انتخاب کنید",
    stepNumber: 7,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <CancelRules />{" "}
      </Box>
    ),
  },

  {
    label: "نرخ اقامتگاه",
    activeLabel: "نرخ اقامتگاه را تعیین کنید",
    stepNumber: 9,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <PriceStay />
      </Box>
    ),
  },
  {
    label: "تخفیف گذاری ",
    activeLabel: "تخفیف گذاری",
    stepNumber: 9,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <OffConditions />
      </Box>
    ),
  },
  {
    label: "قوانین شبینجا",
    activeLabel: "قوانین شبینجا",
    stepNumber: 9,
    componentLevel: (
      <Box sx={{ minHeight: "30vh" }}>
        <ShabinjaRules />
      </Box>
    ),
  },
];

const ManageSteps = ({ stayCodeToComplete }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);
  const stepRefs = useRef([]); // Array of refs for steps
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view
  const [hostInfoUpdating, setHostInfoUpdating] = useState({});
  const [listEmkanat, setListEmkanat] = useState([]);
  const [listRules, setListRules] = useState([]);
  const [listTypeHostLoc, setListTypeHostLoc] = useState([]); // نوع منطقه
  const [listTypeHost, setListTypeHost] = useState([]); // نوع اقامتگاه
  const [provinceList, setProvinceList] = useState([]); // استانها
  const [lastStep, setLastStep] = useState(null);
  useEffect(() => {
    if (!stayCodeToComplete) {
      handleStepChange(0);
    } else {
      handleGetInfoStay(stayCodeToComplete);
    }
    handleSearchListEmkanat(); // جستجو لیست امکانات
    handleSearchListRules();
    handleGetTypeHostLoc();
    handleGetTypeHost();
    handleSearchProvince();
  }, [stayCodeToComplete]);

  //   دریافت اطلاعات اقامتگاه
  const handleGetInfoStay = async () => {
    const hostResult = await HostTourSearchOneApiForEdit(stayCodeToComplete);
    setHostInfoUpdating({
      ...hostResult?.data,
    });
    handleFindLastStep(hostResult?.data);

    return hostResult;
  };

  // پیدا کردن آخرین مرحله
  const handleFindLastStep = async (data) => {
    if (!activeStep) {
      handleStepChange(1);
    }
  };

  //  ایجاد اقامتگاه
  const handleCreateStay = async (data) => {
    const hostResult = await HostTourCreateApi(data);
    navigate(`/new-stay/${hostResult?.data?.guid}`);
  };

  //  به روز رسانی اقامتگاه
  const handleUpdateStay = async (data) => {
    const myData = {
      ...hostInfoUpdating,
      ...data,
    };
    // console.log(myData, "handleUpdateStay", stayCodeToComplete);
    const hostResult = await HostTourUpdateApi(myData, stayCodeToComplete);
    await handleGetInfoStay();
    return hostResult;
  };

  //   تعویض مرحله تکمیل فرم
  const handleStepChange = (step) => {
    setActiveStep(step);

    const stepElement = stepRefs.current[step < 1 ? step : step - 1];
    if (stepElement) {
      const topOffset = isMobile ? 40 : 100; // Adjust based on header or spacing
      const elementPosition =
        stepElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: "smooth",
      });
    }
  };

  const handleNext = async () => {
    if (activeStep < stepsConfig.length - 1) {
      handleStepChange(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      handleStepChange(activeStep - 1);
    }
  };

  // لیسست امکانات
  const handleSearchListEmkanat = async () => {
    const result = await GetOtherItemTourList();
    setListEmkanat(result?.data || []);
  };
  // لیست قوانین
  const handleSearchListRules = async () => {
    const result = await GetRollesList();
    setListRules(result?.data || []);
  };

  // نوع منطقه
  const handleGetTypeHostLoc = async () => {
    const result = (await GetTypeHostLocListApi()) || {};
    setListTypeHostLoc(result?.data || []);
  };
  // نوع اقامتگاه
  const handleGetTypeHost = async () => {
    const result = (await GetTypeHostListApi()) || {};
    setListTypeHost(result?.data || []);
  };

  // استان ها
  const handleSearchProvince = async () => {
    const result = await getProvinceList();
    const list = result?.data || [];
    setProvinceList(list);
  };

  return (
    <>
      <ManageStepsContext.Provider
        value={{
          handleNext,
          handlePrevious,
          handleStepChange,

          handleGetInfoStay,
          handleCreateStay,
          handleUpdateStay,

          hostInfoUpdating,
          setHostInfoUpdating,
          stayCodeToComplete: stayCodeToComplete,

          listEmkanat,
          listRules,
          listTypeHostLoc,
          listTypeHost,
          provinceList,
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          {stepsConfig.map((step, index) => (
            <Step
              key={index}
              ref={(el) => (stepRefs.current[index] = el)} // Assign ref to each step
              className="cursor-pointer"
            >
              <StepLabel
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => handleStepChange(index)}
              >
                {activeStep === index ? (
                  <Typography variant="h6">{step.activeLabel}</Typography>
                ) : (
                  <Typography>{step.label}</Typography>
                )}
              </StepLabel>
              <StepContent
                sx={{
                  px: { xs: 1, md: 2 },
                }}
              >
                {step.componentLevel}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* Sticky Navigation Section */}
      </ManageStepsContext.Provider>
    </>
  );
};

export default ManageSteps;
