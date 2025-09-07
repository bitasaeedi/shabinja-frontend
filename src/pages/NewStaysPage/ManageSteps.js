import React, { useState, useRef, useEffect, createContext } from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
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
  HostTourSearchOneApiForEdit,
  HostTourUpdateApi,
  UploadDocumentsApi,
} from "../../api/toureApis";
import { useNavigate } from "react-router-dom";
import {
  GetAccommodationSpace,
  GetOtherItemTourList,
  getProvinceList,
  GetRollesList,
} from "../../api/PublicApis";
import CancelRules from "./Components/CancelRules";
import OffConditions from "./Components/OffConditions";
import ShabinjaRules from "./Components/ShabinjaRules";
import DocumentOfStay from "./Components/DocumentOfStay";
import MyAlertMui from "../../components/MyAlertMui/MyAlertMui";
import { CalculateStepNum } from "./Components/Componnets/CalculateStepNum";
import SteperNewStay from "./Components/SteperNewStay";
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
  // {
  //   label: "توصیف موقعیت اقامتگاه",
  //   activeLabel: "توصیف موقعیت اقامتگاه",
  //   stepNumber: 3,
  //   componentLevel: (
  //     <Box sx={{ minHeight: "30vh" }}>
  //       <DescribGeoStay />
  //     </Box>
  //   ),
  // },
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
    label: "قرارداد شبینجا",
    activeLabel: "قرارداد شبینجا",
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
  const [listAccommodationSpace, setListAccommodationSpace] = useState([]);
  const [listTypeHostLoc, setListTypeHostLoc] = useState([]); // نوع منطقه
  const [listTypeHost, setListTypeHost] = useState([]); // نوع اقامتگاه
  const [provinceList, setProvinceList] = useState([]); // استانها
  const [lastedStep, setLastedStep] = useState(null);
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

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
    handleSearchListAccommodationSpace();
  }, [stayCodeToComplete]);
  //
  //   دریافت اطلاعات اقامتگاه
  const handleGetInfoStay = async () => {
    const hostResult = await HostTourSearchOneApiForEdit(stayCodeToComplete);
    setHostInfoUpdating({
      ...hostResult?.data,
    });
    console.log(hostResult?.data, "stay info");
    handleFindLastStep(hostResult?.data);

    return hostResult;
  };

  // پیدا کردن آخرین مرحله
  const handleFindLastStep = async (data) => {
    console.log("manageSteps => handleFindLastStep", data);
    
    const result = CalculateStepNum(data);
    console.log(result, "result handleFindLastStep");
    setLastedStep(result || 1);
    if (!activeStep) {
      handleStepChange(result || 1);
    }

   
  };

  //  ایجاد اقامتگاه
  const handleCreateStay = async (data) => {
    const hostResult = await HostTourCreateApi(data);
    if (hostResult?.issuccess) {
      navigate(`/new-stay/${hostResult?.data?.guid}`);
    } else {
      handleMangeAlert(true, "error", hostResult?.message || "Upload failed");
    }
  };

  //  به روز رسانی اقامتگاه
  const handleUpdateStay = async (data) => {
    const myData = {
      ...hostInfoUpdating,
      ...data,
    };

    const hostResult = await HostTourUpdateApi(myData, stayCodeToComplete);
    console.log(myData, "handleUpdateStay", stayCodeToComplete, hostResult);
    if (hostResult?.issuccess) {
      await handleGetInfoStay();
      return true;
    } else {
      handleMangeAlert(true, "error", hostResult?.message || "Upload failed");
      return false;
    }

    // return hostResult;
  };

  //
  const handleUploadDocumentsApi = async (data) => {
    const myData = {
      ...data,
    };
    // console.log(myData, "handleUpdateStay", stayCodeToComplete);
    const hostResult = await UploadDocumentsApi(myData, stayCodeToComplete);
    if (hostResult?.issuccess) {
      await handleGetInfoStay();
      return true;
    } else {
      handleMangeAlert(true, "error", hostResult?.message || "Upload failed");
      return false;
    }

    // return hostResult;
  };

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
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

  // لیسست  فضای اقامتگاه
  const handleSearchListAccommodationSpace = async () => {
    const result = await GetAccommodationSpace();
    setListAccommodationSpace(result?.data || []);
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
          handleUploadDocumentsApi,

          hostInfoUpdating,
          setHostInfoUpdating,
          stayCodeToComplete: stayCodeToComplete,

          listEmkanat,
          listRules,
          listTypeHostLoc,
          listTypeHost,
          provinceList,
          listAccommodationSpace,
        }}
      >
        <SteperNewStay
          lastedStep={lastedStep}
          activeStep={activeStep}
          stepsConfig={stepsConfig}
          handleStepChange={handleStepChange}
          stepRefs={stepRefs}
        />
        {/* <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
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
                onClick={() => {
                  console.log(lastedStep, "lastedStep", index);
                  if (lastedStep >= index) {
                    handleStepChange(index);
                  }
                }}
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
        </Stepper> */}

        {/* Sticky Navigation Section */}
      </ManageStepsContext.Provider>

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
};

export default ManageSteps;
