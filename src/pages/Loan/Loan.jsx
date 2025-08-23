import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";

const sections = [
  {
    title: "ابتدا ثبت‌نام کنید",
    description:
      "ابتدا ثبت‌نام کنید تا برای شبینجا قابل شناسایی شوید و بتوانید تنظیمات شخصی خودتان را اعمال کنید.‎",
    steps: [
      {
        icon: <PersonIcon />,
        heading: "حساب کاربری حاوی چه مطالبی ست؟",
        details:
          "برای ثبت‌نام کامل، نام خانوادگی و شماره موبایل خود را وارد کنید. سپس از تنظیمات می‌توانید اقامتگاه خود را تعریف کنید.",
      },
      {
        icon: <VisibilityIcon />,
        heading: "چه اطلاعاتی از من قابل مشاهده است؟",
        details:
          "در شرایط عادی، تنها اسم کوچک، تصویر پروفایل، و اقامتگاه‌های ثبت شده نمایش داده می‌شود.",
      },
      {
        icon: <FolderIcon />,
        heading: "چرا باید حساب کاربری خود را تکمیل کنم؟",
        details:
          "تکمیل اطلاعات هویتی مانند کد ملی و آپلود مدارک باعث افزایش امنیت می‌شود.",
      },
    ],
  },
  {
    title: "اقامتگاه خود را ثبت کنید",
    description:
      "حال می‌بایست برای معرفی اقامتگاه خود به گردشگران، یک نمایه (پروفایل) برای اقامتگاه خود ایجاد کنید.",
    steps: [
      {
        icon: <HomeIcon />,
        heading: "نمایه اقامتگاه من حاوی چه مطالبی ست؟",
        details:
          "در نمایه اقامتگاه، شما می‌بایست مشخصات دقیق منزل و امکانات ثبت شده را به نمایش بگذارید.",
      },
      {
        icon: <RoomServiceIcon />,
        heading: "چه کسانی می‌توانند اقامتگاه من را اجاره کنند؟",
        details:
          "شما در ثبت اقامتگاه مواردی همچون تعداد اتاق‌ها، ظرفیت پذیرش، و قوانین اجاره را تعیین می‌کنید.",
      },
      {
        icon: <HeadsetMicIcon />,
        heading: "آیا میزبانی و رزرو اینترنتی سخت است؟",
        details:
          "امکانات تعبیه شده در سایت به شما کمک می‌کند مدیریت بهتر داشته باشید.",
      },
    ],
  },
  {
    title: "برای ورود مهمانان آماده شوید",
    description:
      "هنگامی که یک مهمان اقامتگاه شما را انتخاب نماید، درخواست رزرو خود را ثبت کرده و ارسال می‌کند.",
    steps: [
      {
        icon: <NotificationsActiveIcon />,
        heading: "چگونه از دریافت درخواست رزرو مطلع شوم؟",
        details:
          "برای سرعت بخشیدن به فرآیند رزرو، ثبت درخواست رزرو توسط مهمان با تایید شدن رزرو و بهره‌گیری از سامانه ایمیل یا متن‌های صوتی خودکار اطلاع‌رسانی می‌شود.",
      },
      {
        icon: <EmojiPeopleIcon />,
        heading: "فرایند تحویل اقامتگاه چگونه است؟",
        details:
          "پس از قطعی شدن رزرو، اقامتگاه باید آماده تحویل به مهمان شود. زمان دقیق تحویل و سایر اطلاعات لازم به صورت کامل مشخص می‌شود.",
      },
      {
        icon: <ChatBubbleIcon />,
        heading: "آیا راهی برای ارتباط با مهمانان وجود دارد؟",
        details:
          "در صورت نیاز به ارتباط با مهمان، از صفحه درخواست رزرو امکان ارسال پیام فراهم شده است.",
      },
    ],
  },
  {
    title: "مهمان نواز باشید",
    description:
      "میزبان‌های محبوب به گرمی از مهمانان خود استقبال می‌کنند. برخی ورود مهمان را با جای و لبخند خاطره‌انگیز می‌کنند.",
    steps: [
      {
        icon: <CleaningServicesIcon />,
        heading: "نظافت را رعایت کنید",
        details:
          "در کنار اخلاق خوب، به نظافت اقامتگاه نیز توجه کنید. مرتب بودن محیط به مهمان احساس بهتری می‌دهد.",
      },
      {
        icon: <AttachMoneyIcon />,
        heading: "چگونه اجاره‌های رزرو را دریافت می‌کنم؟",
        details:
          "کلیه مبالغ دریافت و پرداختی شما به صورت شفاف در سایت قابل مشاهده است.",
      },
      {
        icon: <BarChartIcon />,
        heading: "کارمزد شبینجا چگونه محاسبه می‌شود؟",
        details:
          "تنها درصدی از کل مبلغ رزرو شده به عنوان کارمزد کسر می‌شود و بقیه مبلغ به حساب شما واریز خواهد شد.",
      },
    ],
  },
];

const Loan = () => {
  return (
    <Container sx={{ mt: {xs:0,md:10}, mb: 6 }}>
      <Box
        sx={{
          // backgroundColor: "rgba(40, 125, 250, 0.1)",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)", 
        }}
      >
        <Container sx={{ py: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: 25, md: 30 } }}
          >
            چگونه وام دریافت کنیم؟
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 0 }}>
            نکات زیر را مطالعه کنید تا با اطلاعات کافی در شبینجا وام دریافت کنید.
          </Typography>
        </Container>
      </Box>
      {sections.map((section, idx) => (
        <Box
          key={idx}
          sx={{
            backgroundColor: idx % 2 === 0 ? "rgba(40, 125, 250, 0.1)" : "none",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)", // Ensures the background spans the full width
          }}
        >
          <Container sx={{ py: 6 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {`${idx + 1}- ${section.title}`}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ maxWidth: "600px", margin: "0 auto" }}
              >
                {section.description}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {section.steps.map((step, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(40, 125, 250, 0.2)",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 6px 25px rgba(40, 125, 250, 0.3)",
                      },
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "2rem",
                          backgroundColor: "#eef7ff",
                          color: "#287dfa",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        fontSize="1.1rem"
                      >
                        {step.heading}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        textAlign="center"
                      >
                        {step.details}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      ))}

      <Box
        textAlign="center"
        sx={{
          position: "sticky",
          bottom: { xs:95, md: 40 },
         mt:2
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/new-stay/wizard"
          sx={{
            backgroundColor: "#287dfa",
            color: "#fff",
            width: 300,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#1e63c8",
            },
          }}
        >
         {'درخواست وام'}
        </Button>
      </Box>
    </Container>
  );
};

export default Loan;
