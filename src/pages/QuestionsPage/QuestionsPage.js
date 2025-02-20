import React, { useContext, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppContext } from "../../App";

const questions = [
  {
    question: "چطور می‌توانم در سایت ثبت نام کنم؟",
    answer:
      "برای ثبت نام در سایت شبینجا، ابتدا باید در صفحه اصلی گزینه «ثبت نام» را انتخاب کنید. سپس، فرم ثبت نام که شامل ورود اطلاعاتی مانند نام کاربری، آدرس ایمیل، و رمز عبور است، را به دقت تکمیل کنید. پس از تأیید قوانین و مقررات سایت، بر روی دکمه ثبت نام کلیک کنید",
  },
  {
    question: "فراموشی رمز عبور چطور برطرف می‌شود؟",
    answer:
      "برای بازیابی رمز عبور، روی گزینه 'فراموشی رمز عبور' کلیک کنید و دستورالعمل‌های ارسال شده به ایمیل خود را دنبال کنید.",
  },
  {
    question:
      "آیا ثبتنام اجباری است؟ آیا میتوان بدون حساب کاربری رزرو انجام داد؟ ",
    answer:
      "ثبت نام اجباری نیست، اما برای مدیریت بهتر رزروها و دریافت اطلاعات دقیق‌تر، داشتن حساب کاربری توصیه می‌شود.",
  },
  {
    question:
      "آیا امکان ویرایش اطلاعات پروفایل (مانند شماره تماس یا ایمیل) وجود دارد؟ ",
    answer:
      "بله، شما می‌توانید از طریق تنظیمات پروفایل خود اطلاعات تماس و ایمیل را ویرایش کنید.",
  },
  {
    question: "چطور می‌توانم یک اقامتگاه را جستجو کنم؟",
    answer:
      "با استفاده از نوار جستجو در صفحه اصلی می‌توانید نام شهر یا منطقه مورد نظر خود را وارد کنید و لیست اقامتگاه‌ها را مشاهده نمایید.",
  },
  {
    question: "آیا می‌توانم فیلترها را برای یافتن اقامتگاه مناسب تنظیم کنم؟",
    answer:
      "بله، شما می‌توانید از فیلترهای متنوع مانند قیمت، امکانات، و موقعیت مکانی برای یافتن اقامتگاه مناسب استفاده کنید.",
  },
  {
    question: "امتیازات و نظرات دیگر مهمان‌ها چطور قابل دیدن هستند؟",
    answer:
      "در صفحه هر اقامتگاه، می‌توانید نظرات و امتیازات مهمانان قبلی را مشاهده کنید.",
  },
  {
    question: "آیا می‌توانم اقامتگاه‌هایی را که به دنبال آنها هستم، ذخیره کنم؟",
    answer:
      "بله، شما می‌توانید با افزودن اقامتگاه‌ها به لیست علاقه‌مندی‌های خود، آنها را بعداً بررسی کنید.",
  },
  {
    question: "چطور می‌توانم یک اقامتگاه را رزرو کنم؟",
    answer:
      "پس از انتخاب اقامتگاه مورد نظر، روی گزینه 'رزرو' کلیک کنید و مراحل پرداخت را تکمیل نمایید.",
  },
];

const QuestionsPage = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: { xs: 0, md: 4 } }}>
      <Box sx={{ py: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#2c3e50",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="inherit" sx={{}}>
            سوالات متداول
          </Typography>
          {/* <Typography
            variant="inherit"
            sx={{
              color: "primary.main",
              // px: 1,
            }}
          >
            شبینجا{" "}
          </Typography> */}
        </Typography>

        {questions.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 0,
              boxShadow: "none",
              border: "none",
              "&:before": { display: "none" },
              borderBottom: "1px solid #ddd",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 2 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: 14, md: 18 } }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ my: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  textAlign: "justify",
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default QuestionsPage;
