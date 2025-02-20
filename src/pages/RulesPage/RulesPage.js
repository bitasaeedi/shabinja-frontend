import React, { useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppContext } from "../../App";
import CircleIcon from "@mui/icons-material/FiberManualRecord";

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

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, fontSize: { xs: 20, md: 24 } }}
          >
            قوانین عمومی
          </Typography>
          <List sx={{ paddingLeft: 0, mx: 0 }}>
            {listRules.map((item, index) => (
              <ListItem sx={{ mx: 0, px: 0 }} key={index}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CircleIcon sx={{ color: "#000", fontSize: 12 }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    textAlign: "justify",
                  }}
                >
                  {item}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default RulesPage;
