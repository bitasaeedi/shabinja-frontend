import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { AppContext } from "../../App";
import CircleIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import AboutImage from "./AboutUsImage/aboutUs.jpg";
const baseUrl = API_URL;
const AboutUs = () => {
  const appContext = useContext(AppContext);

  const [aboutData, setAboutData] = useState([]);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/AboutData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const structuredArray = response?.data?.data[0]?.value
        .split(/(?=[*-])/g) // جدا کردن قبل از هر * یا -
        .map((item) => item.trim()) // حذف فاصله‌های اضافه
        .filter((item) => item) // حذف موارد خالی
        .map((item) => {
          if (item.startsWith("*")) {
            return { type: "title", content: item.replace(/^\*/, "").trim() };
          } else if (item.startsWith("-")) {
            return { type: "text", content: item.replace(/^-/, "").trim() };
          } else {
            return null;
          }
        })
        .filter(Boolean);

      setAboutData(structuredArray);
      console.log(structuredArray, "response.data");
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  function renderContent(text) {
    if (typeof text !== "string") return text; // اگه رشته نبود همون رو برگردون
    return text.split(/\s+/).map((word, i) => {
      if (word.startsWith("+")) {
        return (
          <span key={i} style={{ color: "#287dfa", fontWeight: "bold" }}>
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

  // decode html
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, mt: { xs: 0, md: 4 }, minHeight: "100vh" }}
    >
      <Box sx={{ py: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          // align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#2c3e50",
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 5,
          }}
        >
          <Typography variant="inherit" sx={{ mr: 0.5 }}>
            درباره
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              color: "primary.main",
            }}
          >
            شبینجا{" "}
          </Typography>
        </Typography>

        <Box>
          {aboutData?.slice(0, -1).map((item, index) => {
            if (item.type === "title") {
              return (
                <Typography
                  variant="h3"
                  key={index}
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: 20, md: 26 },
                    my: 1.5,
                  }}
                >
                  {renderContent(item.content)}
                </Typography>
              );
            } else if (item.type === "text") {
              return (
                <Typography
                  variant="body1"
                  key={index}
                  sx={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  {renderContent(item.content)}
                </Typography>
              );
            } else {
              return null;
            }
          })}
        </Box>

        {/* img */}
        <Box>
          <Box
            component="img"
            src={AboutImage}
            sx={{ width: "100%", height: "350px", my: 3 }}
          />
        </Box>

        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: 20, md: 26 },
              my: 1.5,
            }}
          >
            {renderContent(aboutData[aboutData?.length - 1]?.content)}
          </Typography>
        </Box>

        {/* <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, fontSize: { xs: 20, md: 24 } }}
          >
            شبینجا، همراه لحظات خاص سفر شما
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            سفر، فراتر از یک جابه‌جایی ساده است؛ تجربه‌ای ناب از کشف مکان‌های
            جدید، تعامل با فرهنگ‌های مختلف و خلق خاطراتی که تا همیشه در ذهن باقی
            می‌ماند. در دنیای مدرن امروز، یافتن یک اقامتگاه مناسب که بتواند حس
            آرامش، امنیت و راحتی را برای شما فراهم کند، یکی از مهم‌ترین بخش‌های
            برنامه‌ریزی سفر است. شبینجا با این هدف راه‌اندازی شد که مسافران
            بتوانند به‌سادگی، در سریع‌ترین زمان ممکن و با اطمینان کامل، بهترین
            اقامتگاه را برای سفر خود انتخاب کنند.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            ما که هستیم؟
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            شبینجا یک پلتفرم پیشرفته در حوزه رزرو آنلاین اقامتگاه، هتل،
            بوم‌گردی، ویلا و سوئیت است که با بهره‌گیری از تکنولوژی‌های روز دنیا
            و همکاری با میزبانان حرفه‌ای، امکان رزرو سریع، امن و آسان را برای
            مسافران فراهم می‌کند. ما به دنبال ارائه تجربه‌ای فراتر از یک رزرو
            ساده هستیم؛ تجربه‌ای که شامل امکانات مدرن، پشتیبانی لحظه‌ای و خدمات
            متنوع گردشگری باشد تا سفری خاطره‌انگیز برای شما رقم بخورد.
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            ماموریت و چشم‌انداز ما
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            در شبینجا، مأموریت ما چیزی فراتر از یک پلتفرم رزرو اقامتگاه است. ما
            به دنبال ایجاد یک اکوسیستم جامع گردشگری هستیم که هر مسافر بتواند از
            لحظه تصمیم‌گیری برای سفر تا پایان آن، تجربه‌ای بی‌نقص و لذت‌بخش
            داشته باشد.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            اهداف ما
          </Typography>
          <List sx={{ paddingLeft: 0, mx: 0 }}>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                ایجاد یک تجربه رزرو آسان و سریع: رابط کاربری ساده و جذاب که به
                شما امکان می‌دهد تنها با چند کلیک، بهترین اقامتگاه را انتخاب
                کنید.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                ارائه گزینه‌های متنوع و مقرون‌به‌صرفه: از اقامتگاه‌های بوم‌گردی
                در دل طبیعت گرفته تا هتل‌های لوکس شهری و ویلاهای اختصاصی، برای
                هر نوع سلیقه و بودجه گزینه‌ای داریم.
              </ListItemText>
            </ListItem>

            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                هدف ما ایجاد یک شبکه گسترده از خدمات سفر است که با استفاده از
                فناوری‌های روز، سفری راحت و به‌یادماندنی برای همه فراهم کند.
              </ListItemText>
            </ListItem>

            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                ایجاد یک جامعه گردشگری فعال: فراهم کردن بستری برای تبادل تجربه
                میان مسافران و معرفی بهترین مقاصد و اقامتگاه‌ها.
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            چرا شبینجا
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            در دنیای دیجیتال امروز، انتخاب اقامتگاه مناسب یک چالش بزرگ است. با
            افزایش گزینه‌های مختلف، مقایسه بین امکانات، قیمت‌ها و نظرات کاربران
            می‌تواند گیج‌کننده باشد. شبینجا با ارائه یک سیستم جامع و کاربرپسند،
            این روند را برای شما ساده و لذت‌بخش می‌کند.
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            ویژگی‌های منحصربه‌فرد شبینجا
          </Typography>
          <List sx={{ paddingLeft: 0 }}>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                تنوع بالای اقامتگاه‌ها: بیش از هزاران گزینه اقامتی از جمله
                بوم‌گردی، اقامتگاه سنتی، کلبه‌های جنگلی، ویلاهای مدرن، هتل‌های
                لوکس و حتی خانه‌های محلی با استانداردهای بالا.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                جستجوی هوشمند و فیلترهای متنوع: امکان جستجوی اقامتگاه بر اساس
                موقعیت جغرافیایی، قیمت، امکانات رفاهی، نظرات کاربران و
                دسترسی‌های محلی.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                تنوع بالای اقامتگاه‌ها: بیش از هزاران گزینه اقامتی از جمله
                بوم‌گردی، اقامتگاه سنتی، کلبه‌های جنگلی، ویلاهای مدرن، هتل‌های
                لوکس و حتی خانه‌های محلی با استانداردهای بالا.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                پرداخت امن و رزرو فوری: سیستم پرداخت آنلاین با بالاترین سطح
                امنیت، همراه با امکان رزرو لحظه‌ای و تأیید سریع میزبان.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                پشتیبانی ۲۴ ساعته و مشاوره سفر: تیم پشتیبانی حرفه‌ای ما همیشه در
                کنار شماست تا هرگونه سوال، مشکل یا نیاز شما را در سریع‌ترین زمان
                ممکن برطرف کند.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                نظرات و امتیازات کاربران: قبل از رزرو، می‌توانید نظرات سایر
                مسافران را مطالعه کنید و بهترین تصمیم را بگیرید.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                امکانات سفارشی‌سازی سفر: پیشنهادهای ویژه بر اساس سلیقه،
                علاقه‌مندی‌ها و تجربیات قبلی شما.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ mx: 0, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ color: "primary.main", fontSize: 12 }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textAlign: "justify",
                }}
              >
                تخفیف‌های ویژه و جشنواره‌های فصلی: بهره‌مندی از بهترین قیمت‌ها و
                پیشنهادات ویژه در زمان‌های خاص سال.
              </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            همکاری با شبینجا
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            ما در شبینجا به دنبال گسترش همکاری‌های خود با میزبانان، صاحبان
            اقامتگاه، راهنمایان گردشگری و شرکت‌های حمل‌ونقل هستیم. اگر میزبان
            هستید و قصد دارید اقامتگاه خود را در شبینجا ثبت کنید، ما بستری
            حرفه‌ای برای معرفی و جذب مسافران بیشتر در اختیار شما قرار می‌دهیم.
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}
          >
            مزایای همکاری با شبینجا
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, textAlign: "justify" }}
          >
            دسترسی به هزاران مسافر در سراسر ایران - امکان مدیریت رزروها و تقویم
            به‌صورت آنلاین - پشتیبانی و مشاوره رایگان برای بهبود کیفیت خدمات
            اقامتگاه شما
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} /> */}
        {/* <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              mt: 4,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
            }}
          >
            با{" "}
            <Typography
              variant="inherit"
              sx={{
                color: "primary.main",
                px: 1,
              }}
            >
              شبینجا{" "}
            </Typography>{" "}
            هر سفر یک خاطره ماندگار است!
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.6, fontSize: 18, fontWeight: 600 ,  textAlign: "justify"}}
          >
            در شبینجا، ما معتقدیم که هر سفر می‌تواند یک تجربه منحصربه‌فرد و
            فراموش‌نشدنی باشد. هدف ما ایجاد بستری است که در آن مسافران بتوانند
            بدون دغدغه، با اطمینان کامل و در کمترین زمان، بهترین اقامتگاه را
            انتخاب کنند. با ارائه خدمات متنوع، پشتیبانی دائمی و همکاری با بهترین
            میزبانان، در تلاشیم تا هر بار که قصد سفر دارید، شبینجا اولین انتخاب
            شما باشد.
          </Typography>
        </Box> */}
      </Box>
    </Container>
  );
};

export default AboutUs;
