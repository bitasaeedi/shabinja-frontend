import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../../App";
import CircleIcon from "@mui/icons-material/FiberManualRecord";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import API_URL from "../../config/apiConfig";
const baseUrl = API_URL;

const listRules = [
  "کلیه فرآیندهای خرید در وب‌سایت منطبق با قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف‌کننده است و متعاقباً کاربر موظف به رعایت قوانین و مقررات وب‌سایت در هنگام خرید است.",
  "شبینجا می‌تواند در صورت افزودن قابلیت‌ها و خدمات جدید و یا در جهت بهبود عملکرد، ضوابط و مقررات وب‌سایت را به‌روز‌رسانی کند.",
  "کاربران موظف هستند در هنگام ثبت‌نام و خرید، اطلاعات صحیح و معتبر وارد کنند. مسئولیت صحت این اطلاعات بر عهده کاربر است.",
  "هرگونه سوءاستفاده از خدمات وب‌سایت، حساب‌های کاربری یا اطلاعات سایر کاربران پیگرد قانونی خواهد داشت.",
  "پرداخت هزینه خدمات تنها از طریق درگاه‌های بانکی معتبر انجام می‌شود و شبینجا مسئولیتی در قبال تراکنش‌های خارج از سیستم پرداخت رسمی ندارد.",
  "کاربران نباید اطلاعات ورود به حساب خود را در اختیار دیگران قرار دهند. مسئولیت هرگونه سوءاستفاده ناشی از عدم رعایت این مورد، بر عهده خود کاربر است.",
  "استفاده از محتوای وب‌سایت از جمله متن، تصاویر و سایر داده‌ها بدون کسب اجازه کتبی از مدیریت شبینجا ممنوع است.",
  "شبینجا ممکن است در مواقع ضروری، حساب‌های کاربری را به دلایل امنیتی و تخلف‌های احتمالی به‌صورت موقت یا دائم مسدود کند.",
  "در صورت بروز هرگونه مشکل در فرآیند خرید یا استفاده از خدمات، کاربران می‌توانند از طریق پشتیبانی با شبینجا تماس بگیرند.",
  "لغو یا تغییر سفارش‌ها طبق قوانین مشخص‌شده در صفحه شرایط استفاده امکان‌پذیر است و کاربران ملزم به رعایت این قوانین هستند.",
  "هرگونه رفتار توهین‌آمیز یا نامناسب در نظرات، پیام‌ها یا ارتباط با پشتیبانی، منجر به مسدودسازی حساب کاربری خواهد شد.",
  "شبینجا متعهد به حفظ اطلاعات شخصی کاربران است و این اطلاعات بدون مجوز رسمی در اختیار شخص ثالث قرار نخواهد گرفت.",
  "کاربران می‌بایست پیش از نهایی کردن خرید، اطلاعات محصول یا خدمات موردنظر را به‌دقت بررسی کنند، زیرا شبینجا مسئولیتی در قبال انتخاب‌های اشتباه ندارد.",
  "ثبت‌نام و استفاده از خدمات شبینجا به معنای پذیرش کامل قوانین و مقررات وب‌سایت است.",
  "شبینجا حق دارد در شرایط اضطراری یا بروز خطاهای سیستمی، برخی از سفارش‌ها را لغو کند و مبلغ پرداختی را به کاربر بازگرداند.",
];

const RulesPage = () => {
  const appContext = useContext(AppContext);

  const [rulesData, setRulesData] = useState(null);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/RuleData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const structuredArray = response?.data?.data[0]?.value
        .split(/(?=[*@-])/g)
        .map((item) => item.trim()) // حذف فاصله‌های اضافه
        .filter((item) => item) // حذف موارد خالی
        .map((item) => {
          if (item.startsWith("*")) {
            return { type: "title", content: item.replace(/^\*/, "").trim() };
          } else if (item.startsWith("-")) {
            return { type: "li", content: item.replace(/^-/, "").trim() };
          } else if (item.startsWith("@")) {
            return { type: "text", content: item.replace(/^@/, "").trim() };
          } else {
            return null;
          }
        })
        .filter(Boolean);

      setRulesData(structuredArray);
      console.log(structuredArray, "response.data");
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  function renderContent(text) {
    return text.split(/\s+/).map((word, i) => {
      if (word.startsWith("+")) {
        return (
          <span
            key={i}
            style={{ fontSize: "10px", color: "blue", fontWeight: "bold" }}
          >
            {word.replace(/^\+/, "")}
          </span>
        );
      }
      return word + " ";
    });
  }

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
    fetchAboutData();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, mt: { xs: 0, md: 10 }, minHeight: "100vh" }}
    >
      <Box sx={{ py: 0, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#2c3e50",
            display: "flex",
            justifyContent: "center",
            fontSize: { xs: 25, md: 30 },
          }}
        >
          <Typography variant="inherit" sx={{}}>
            قوانین و مقررات
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              color: "primary.main",
              px: 1,
            }}
          >
            شبینجا{" "}
          </Typography>
        </Typography>

        <Box sx={{ mt: { xs: 4, md: 7 } }}>
          <Typography
            variant="h5"
            // gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 25 }, mb: ".2rem" }}
          >
            {rulesData &&
              rulesData[0]?.type === "title" &&
              rulesData[0]?.content}
          </Typography>

          <List sx={{ paddingLeft: 0, mx: 0, px: { xs: 2, md: 0 } }}>
            {rulesData &&
              rulesData
                .filter((item) => item.type === "li" || item.type === "text")
                .map((item, index) => (
                  <>
                    {item.type === "li" ? (
                      <ListItem
                        sx={{ mx: 0, px: 0, py: 0.5, alignItems: "flex-start" }}
                        key={index}
                      >
                        <ListItemIcon
                          sx={{ minWidth: { xs: 26, md: 30 }, pt: ".55rem" }}
                        >
                          <RemoveIcon sx={{ color: "#4486FA", fontSize: 13 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.content}
                          primaryTypographyProps={{
                            fontSize: "13px",
                            color: "#000000a1",
                            textAlign:"justify"
                          }}
                        />
                      </ListItem>
                    ) : (
                      <Box sx={{ fontSize: "16px", mt: { xs: 2, md: 2 } , textAlign:"justify" }}>
                        {renderContent(item.content)}
                      </Box>
                    )}
                  </>
                ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default RulesPage;
