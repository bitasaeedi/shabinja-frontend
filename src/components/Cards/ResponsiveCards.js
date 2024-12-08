import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  textAlign: "center",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const TitleBackground = styled("div")(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: `${theme.shape.borderRadius * 2}px ${
    theme.shape.borderRadius * 2
  }px 0 0`,
  fontWeight: "bold",
  fontSize: theme.typography.h6.fontSize,
}));


const BackgroundWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
  padding: theme.spacing(4),
}));

const ResponsiveCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardsData = [
    {
      title: "هرجا هستی، خیالت راحت با شبینجا",
      text: "رزرو اقامتگاه امن و راحت با بیمه مسافرتی و پشتیبانی ۲۴ ساعته در شبینجا. با استفاده از خدمات شبینجا، می‌توانید با خیال راحت به سفر بروید. ما برای تمام سفرهای شما بیمه مسافرتی کامل و پشتیبانی ۲۴ ساعته ارائه می‌دهیم تا تجربه‌ای بی‌نظیر و بدون نگرانی داشته باشید. با شبینجا، سفرتان همیشه در آرامش است.",
    },
    {
      title: "دنیایی از انتخاب در شبینجا - هر زمان و هر مکان",
      text: "شبینجا، بهترین پلتفرم برای رزرو اقامتگاه در ایران و جهان. در هر کجای دنیا که هستید، با شبینجا می‌توانید بهترین اقامتگاه‌ها را پیدا و رزرو کنید. از ویلاهای لوکس تا بوم‌گردی‌های خاص، گزینه‌های متنوع برای هر سلیقه‌ای در دسترس شماست. سریع، آسان و مطمئن، هر زمانی که بخواهید با شبینجا سفر خود را برنامه‌ریزی کنید.",
    },
    {
      title: "همراه همیشگی در سفر - هیچ وقت تنها نمی‌مانی",
      text: "با شبینجا، رزرو اقامتگاه، بلیط هواپیما و تور مسافرتی بدون دردسر. ما در شبینجا همراه شما در تمامی مراحل سفر هستیم. از رزرو اقامتگاه تا خرید بلیط هواپیما و تور، همیشه در کنار شما خواهیم بود تا تجربه‌ای راحت و بدون استرس داشته باشید. شبینجا همراه مطمئن شما در هر قدم از سفر.",
    },
  ];

  return (
    <BackgroundWrapper>
      <Grid
        container
        spacing={isMobile ? 3 : 4}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
      >
        {cardsData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CustomCard>
              <TitleBackground>{card.title}</TitleBackground>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "secondary",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    textAlign: "justify",
                    // marginTop: theme.spacing(2),
                  }}
                >
                  {card.text}
                </Typography>
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </BackgroundWrapper>
  );
};

export default ResponsiveCards;
