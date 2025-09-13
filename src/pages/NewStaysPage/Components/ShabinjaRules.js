import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
const baseUrl = API_URL;

function ValidCode({ checkCode , handleCode }) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp?.code) {
            const digits = otp.code.split("").slice(0, 5); // تبدیل به آرایه [ "1","2","3","4","5" ]
            setOtp(digits);
  
            // پر شدن همه اینپوت‌ها → می‌تونی مستقیم به handleCode هم بدی
            handleCode(digits.join(""));
  
            // آخرین اینپوت blur شه
            if (inputsRef.current[4]) {
              inputsRef.current[4].blur();
            }
          }
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.error(err);
        });
    }
  }, []);
  

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // فقط اعداد

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    handleCode(newOtp)

    if (value) {
      if (index < 4) {
        // حرکت به خانه بعدی
        inputsRef.current[index + 1].focus();
      } else {
        // اگر آخرین خانه بود و همه پر شدن، فوکوس برداشته شود
        const isAllFilled = newOtp.every((digit) => digit !== "");
        if (isAllFilled) {
          inputsRef.current[index].blur(); // برداشتن فوکوس
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // برگشت به خانه قبلی
    }
  };

  const handleSubmit = async () => {
    // const code = otp.join("");
    // if (code.length === 5) {
    //   try {
    //     const result = await checkValidCode(number, code);
    //     console.log(result, "check");
    //     if (result?.issuccess) {
    //       handleManageAlert(true, "success", result?.message);
    //     } else {
    //       handleManageAlert(true, "error", result?.message);
    //     }
    //   } catch (error) {
    //     console.error("Error checking validation code:", error);
    //     handleManageAlert(true, "error", "خطا در بررسی کد");
    //   } finally {
    //     handleShowCode(false);
    //   }
    // } else {
    //   alert("کد کامل نیست!");
    // }

    const code = otp.join("");
    if (code.length === 5) {
      // checkCode(code);
      handleCode(code)
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" gap={0.6} sx={{ direction: "rtl" }}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            inputRef={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: ".9rem",
                padding: "4px 4px",
                border: "none", // خط دور داخلی حذف شد
                outline: "none",
                borderBottom: "1px solid gray", // خط دور هنگام focus حذف شد
              },
            }}
            sx={{
              width: 30,
              height: 25,
              border: "none", // Border دور TextField حذف شد
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" }, // خط پایه حذف
                "&:hover fieldset": { border: "none" }, // خط hover حذف
                "&.Mui-focused fieldset": { border: "none" }, // خط focus حذف
              },
            }}
          />
        ))}
      </Box>
      {/* <Button variant="contained" onClick={handleSubmit}>
        تایید
      </Button> */}
    </Box>
  );
}

const contractSections = [
  {
    title: "تعاریف",
    text: `اقامتگاه: هر نوع ملک/فضا که برای اقامت کوتاه‌مدت عرضه می‌شود.\n
میهمان: استفاده‌کننده نهایی خدمات اقامت.\n
رزرو: هر سفارش موفق اقامت که از طریق شبینجا ثبت می‌شود.\n
کارمزد: مبلغی که شبینجا به ازای استفاده از خدمات پلتفرم و پرداخت‌یاری کسر می‌کند.\n
قوانین محلی: کلیه قوانین و مقررات ملی و محلی مرتبط با اسکان، گردشگری، بهداشت، ایمنی، مالیات، شهرداری، نیروی انتظامی و… در محل اقامتگاه.`,
  },
  {
    title: "موضوع قرارداد",
    text: `ارائه بستر آنلاین معرفی و بازاریابی اقامتگاه توسط شبینجا؛ مدیریت رزرو، اخذ وجه از میهمان به وکالت از میزبان، و تسویه‌ی خالص با میزبان طبق این شرایط. شبینجا صرفاً «واسطه بازاریابی و ارائه‌دهنده خدمات پلتفرمی» است و ارائه واقعی خدمات اقامت و تمامی تعهدات آن بر عهده میزبان می‌باشد.`,
  },
  {
    title: "احراز هویت و نمایندگی قانونی",
    items: [
      "مالک/منتفع قانونی یا دارای اختیار مکتوب برای عرضه اقامتگاه است.",
      "اطلاعات هویتی، ثبتی و تماس صحیح و به‌روز ارائه می‌دهد.",
      "هر زمان به درخواست شبینجا مدارک مالکیت/اجازه بهره‌برداری/وکالت‌نامه معتبر بارگذاری و تأیید می‌کند.",
    ],
  },
  {
    title: "مجوزها و انطباق قانونی",
    items: [
      "میزبان متعهد است قبل از انتشار و در طول فعالیت، تمامی مجوزهای لازم (از جمله در صورت شمول: مجوزهای گردشگری/بوم‌گردی، ضوابط شهرداری، استعلام اماکن، مقررات صنفی/بهداشتی/ایمنی، مقررات مجتمع/آپارتمان و …) را اخذ و معتبر نگه دارد.",
      "در صورت عدم وجود یا ابطال هر مجوز، یا ممنوعیت قانونی/محلی، تمامی مسئولیت‌ها، جریمه‌ها، خسارات و تبعات حقوقی/کیفری منحصراً بر عهده میزبان است.",
      "شبینجا مجاز است بنا به تشخیص خود، تا زمان ارائه مدارک معتبر، انتشار/نمایش/رزرو اقامتگاه را معلق یا لغو کند و عنداللزوم با مراجع ذیصلاح همکاری نماید.",
      "در صورت تعطیلی اجباری یا ممانعت قانونی از اسکان، میزبان موظف به استرداد وجوه میهمان و جبران هزینه‌های مرتبط (از جمله کارمزدهای بانکی/درگاه/پرداختی) به شبینجا است.",
    ],
  },
  {
    title: "استاندارد ایمنی، بهداشت و اطلاعات درست",
    items: [
      "میزبان تضمین می‌کند اقامتگاه از نظر ایمنی (گاز/برق، کپسول آتش‌نشانی، هشداردهنده دود/CO در صورت لزوم، مسیر خروج اضطراری و …) و بهداشت در وضعیت مناسب است.",
      "عکس‌ها، توضیحات، ظرفیت، آدرس، قوانین خانه و امکانات باید صحیح، به‌روز و غیرگمراه‌کننده باشد؛ هرگونه عدم انطباق، مسئولیت و هزینه‌های اصلاح/جبران را بر عهده میزبان می‌گذارد.",
      "میزبان هر حادثه/ادعا را بلافاصله به شبینجا اطلاع می‌دهد و مکلف به همکاری در رسیدگی است.",
    ],
  },
  {
    title: "قیمت‌گذاری، مالیات و صورتحساب",
    items: [
      "قیمت پایه، هزینه‌های جانبی و قوانین رزرو توسط میزبان تعیین و در پلتفرم نمایش داده می‌شود.",
      "تمامی مالیات‌ها، عوارض و تکالیف قانونی (از جمله مالیات بر درآمد/ارزش افزوده در صورت شمول) بر عهده میزبان است. شبینجا می‌تواند در صورت الزام قانونی، کسورات را اعمال و وجوه مربوط را ایصال کند.",
      "میزبان می‌پذیرد شبینجا به عنوان وکیل در وصول مطالبات میهمانان عمل کرده، کارمزد و هزینه‌های مقرر را کسر و مانده را طبق زمان‌بندی اعلامی تسویه نماید. در موارد اختلاف، چارج‌بک، تقلب یا شکایت، شبینجا مجاز به نگهداشت موقت وجوه/ایجاد رزرو تضمین تا تعیین تکلیف است.",
    ],
  },
  {
    title: "کارمزد و تسویه",
    items: [
      "کارمزد شبینجا برای هر رزرو: ۱۰٪ از مبلغ کل پرداختی میهمان + هزینه‌های پرداخت/بانکی (در صورت وجود).",
      "زمان‌بندی تسویه: تا ۷۲ ساعت پس از اتمام اقامت.",
      "در صورت لغو/عدم‌حضور/شکایت، تسویه طبق سیاست لغو و بازپرداخت شبینجا انجام می‌شود.",
    ],
  },
  {
    title: "رزرو، لغو و عدم‌حضور",
    items: [
      "میزبان موظف است یکی از سیاست‌های لغو تعریف‌شده در شبینجا را برای هر اقامتگاه انتخاب کند.",
      "هر لغو به موجب قانون، فورس‌ماژور یا ممنوعیت قانونی، مشمول بازپرداخت به میهمان است و مسئولیت تبعات مالی آن با میزبان می‌باشد.",
      "هرگونه بازپرداخت اضافی به تشخیص شبینجا در موارد خدمات نامطلوب/اطلاعات خلاف واقع، از حساب‌های آتی میزبان قابل کسر است.",
    ],
  },
  {
    title: "محتوا و حقوق مالکیت فکری",
    items: [
      "با بارگذاری محتوا، میزبان به شبینجا مجوز غیرانحصاری، رایگان و قابل انتقال برای نمایش و بازاریابی محتوا در وب/اپ و شبکه‌های اجتماعی می‌دهد.",
      "میزبان تضمین می‌کند حقوق اشخاص ثالث (مالکیت فکری/حریم خصوصی) نقض نمی‌شود.",
    ],
  },
  {
    title: "رفتار حرفه‌ای و عدم تبعیض",
    text: `میزبان متعهد به رفتار محترمانه، عدم تبعیض، و رعایت قوانین مرتبط با پذیرش میهمانان (از جمله ضوابط هویتی/ثبت اطلاعات میهمان مطابق قوانین محل) است.`,
  },
  {
    title: "مسئولیت‌ها، سلب مسئولیت و محدودیت مسئولیت",
    items: [
      "ماهیت خدمات شبینجا پلتفرمی/میانجی‌گری اطلاعاتی است و شبینجا مالک/استیجاردهنده اقامتگاه نیست.",
      "تمام خطرات و مسئولیت‌های ناشی از بهره‌برداری و اسکان با میزبان است؛ شامل، بدون محدودیت: خسارت به اشخاص/اموال، نقض قانون، مزاحمت‌های محیطی، شکایات همسایگان و …",
      "شبینجا مسئول سود از دست‌رفته/خسارات غیرمستقیم/نتیجه‌ای نیست. جمع مسئولیت شبینجا در هر ادعا حداکثر معادل کارمزد اخذشده از همان رزرو است.",
    ],
  },
  {
    title: "جبران خسارت",
    text: `میزبان متعهد است در برابر هر ادعا، جریمه، دعوی یا هزینه ناشی از: نقض این قرارداد/قانون، مجوز نداشتن، اطلاعات خلاف واقع، حوادث و …، شبینجا و مدیران/کارکنان/شرکای آن را جبران و مصون دارد.`,
  },
  {
    title: "راستی‌آزمایی، نظارت و تعلیق",
    text: `شبینجا می‌تواند هر زمان به‌صورت منطقی، مدارک/اصلاح اطلاعات را مطالبه، نمایش اقامتگاه را محدود و در صورت تخلف/ریسک، بدون اخطار قبلی تعلیق/حذف کند.`,
  },
  {
    title: "حریم خصوصی و داده‌ها",
    text: `پردازش داده‌های میزبان و میهمان مطابق «سیاست حریم خصوصی شبینجا» است. میزبان موظف به حفاظت از داده‌های میهمان و عدم استفاده خارج از چارچوب رزرو است.`,
  },
  {
    title: "مدت و خاتمه",
    text: `این قرارداد از تاریخ امضای الکترونیکی نافذ و تا زمان خاتمه توسط هر طرف (با اعلام از طریق درگاه/ایمیل ثبت‌شده) جاری است. خاتمه، رزروهای باز را تحت‌تأثیر قرار نمی‌دهد.`,
  },
  {
    title: "تغییرات",
    text: `شبینجا می‌تواند این شرایط را به‌روزرسانی کند. ادامه استفاده یا پذیرش نسخه جدید در پلتفرم به‌منزله موافقت با تغییرات است.`,
  },
  {
    title: "ابلاغ الکترونیکی",
    text: `اطلاع‌رسانی‌های قراردادی از طریق پیامک، ایمیل یا اعلان در حساب کاربری معتبر و ابلاغ‌شده انجام می‌شود.`,
  },
  {
    title: "امضای الکترونیکی و سوابق الکترونیکی",
    items: [
      "میزبان می‌پذیرد قبول این قرارداد از طریق وارد کردن کد یک‌بارمصرف (OTP) ارسالی به شماره موبایل احراز‌شده، و زدن دکمه «امضا قرارداد» و ثبت در حساب کاربری، معادل امضای دستی و دارای اعتبار قانونی است.",
      "سوابق فنی پذیرش شامل: نسخه قرارداد، تاریخ/ساعت (با منطقه زمانی)، IP، شناسه کاربر، شماره مرجع پیامک، شناسه نسخه و هش محتوای قرارداد ذخیره و به‌عنوان دلیل اثباتی نگهداری می‌شود.",
      "اعتبار این امضا و سوابق الکترونیکی مطابق قانون تجارت الکترونیکی ایران و قواعد «داده‌پیام» و «امضای الکترونیکی مطمئن»، به رسمیت شناخته می‌شود.",
    ],
  },
  {
    title: "قانون حاکم و حل اختلاف",
    text: `قانون حاکم: قوانین جمهوری اسلامی ایران.`,
  },
  {
    title: "کلیات",
    text: `بطلان هر بند، سایر بندها را بی‌اثر نمی‌کند. عدم اعمال یک حق، به‌منزله اسقاط آن نیست.`,
  },
];

const ShabinjaRules = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  console.log("stayData" ,manageStepsContext );
  
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState({value:0,text:"امضای قرار داد"});
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const navigate = useNavigate();

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show: show || false,
      status: status || "error",
      message: message || "خطای نامشخص",
    });
  };

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      acceptRules: false, // Checkbox default value
    },
  });

  const handleCode= (myCode)=>{
    
    
    let newCode =  myCode.join("");
    console.log("myCode" , myCode , " newCode" , newCode);
    setCode(newCode)
  }

  const onSubmit = async () => {
    setLoading(true);
    
      if (manageStepsContext?.stayCodeToComplete) {
        const result = await manageStepsContext?.handleUpdateStay(true);
        if (result) {
          navigate(`/pannel/stays`);
        }
    }
    setLoading(false);
  };

  const sendCode = async () => {
    setButtonLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/User/SendSmsCode/${manageStepsContext?.hostInfoUpdating?.title}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
        handleMangeAlert(true, "success", "کد تایید با موفقیت ارسال شد");
        setShowCode(true);
        setButtonText({value:1,text:"تایید کد"})
    } catch (error) {
      console.log("Error:", error?.response?.data);
      handleMangeAlert(true, "error", "خطا در ارسال کد تایید");
      return error?.response?.data;
    } finally {
      setButtonLoading(false);
    }
  };

  const checkCode = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/User/ConfigContract/${code}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("re", response);
      
    if(response?.data?.issuccess){
      handleMangeAlert(true, "success", "قرارداد با موفقیت تایید شد");
      setShowCode(false);
      setIsSuccess(true);
      setButtonText({value:2 , text:"قرارداد امضا شد"})
    }else{
      handleMangeAlert(true, "error", "کد احراز هویت اشتباه است")
    }
       
      
      return response.data;
    } catch (error) {
      console.log("Error:", error?.response?.data);
      handleMangeAlert(true, "error", "خطا در تایید قرارداد");
      return error?.response?.data;
    }
  };

  // Check whether the "acceptRules" checkbox is selected
  const isNextDisabled = !watch("acceptRules");

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormGroup>
            <Grid container spacing={2}>
              {/* Rules Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    maxHeight: { xs: "300px", md: "400px" },
                    overflowY: "auto",
                    // border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: 2,
                    fontSize: { xs: 14, md: 16 },
                  }}
                  className="border shadow-sm"
                >
                  <Typography fontSize={14}>
                    <Typography fontSize={15} gutterBottom>
                      قرارداد همکاری میزبانی و شرایط استفاده میزبان «شبینجا»
                    </Typography>

                    <Typography fontSize={14} mb={2}>
                      آخرین به‌روزرسانی:{" "}
                      <Typography
                        fontSize={14}
                        color="#393939"
                        component={"span"}
                      >
                        1404/06/22
                      </Typography>
                    </Typography>
                  </Typography>

                  {contractSections.map((section, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      {/* title */}
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {index + 1}) {section.title}
                      </Typography>

                      {section.text && (
                        <Typography
                          component="div"
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: "pre-line",
                            overflowWrap: "break-word",
                            lineHeight: 1.5,
                          }}
                        >
                          {section.text.split("\n").map((line, index) => (
                            <div key={index}>{line}</div> // هر خط داخل div جدا
                          ))}
                        </Typography>
                      )}

                      {section.items &&
                        section.items.map((item, idx) => (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            key={idx}
                            sx={{ mt: 1, textAlign: "justify" }}
                          >
                            {idx + 1}. {item}
                          </Typography>
                        ))}
                    </Box>
                  ))}
                </Box>
              </Grid>

             

              {/* Checkbox to accept rules */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 5,
                  mt: 2,
                }}
              >
                <Button
                  variant= {buttonText.value!==2 ? "contained" : "text"}
                  
                  onClick={() => {
                    buttonText.value===0 ? sendCode():checkCode();                   
                  }}
                  disabled={buttonText.value!==2 ? buttonLoading : true}
                  startIcon={buttonLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
                    "&.Mui-disabled": {
                      color: buttonText.value === 2 ? "black" : undefined, // متن سیاه فقط وقتی buttonText==2
                    },
                  }}
              >
                  {buttonLoading ? "در حال ارسال..." : buttonText.text}
                </Button>

                {showCode && <ValidCode checkCode={checkCode} handleCode={handleCode} />}
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
          {/* Sidebar Card */}
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
                قوانین شبینجا
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                پذیرش قوانین شبینجا برای ثبت اقامتگاه الزامی است.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fixed Buttons */}
      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={!isSuccess}
      />

      {/* Alert Component */}
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

export default ShabinjaRules;
