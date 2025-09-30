import { Box, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

export default function MagPosts() {
  let contents = [
    {
      title: "معرفی آبشار لونک",
      text: `آبشار لونک یکی از جذاب‌‌ترین جاهای دیدنی گیلان است که در ۲۵ کیلومتری سیاهکل قرار دارد. این آبشار بخشی از محدوده جنگلی و زیبای جاده دیلمان است که تصویری باطراوت و شاداب از مناظر جنگلی گیلان را پیش چشم گردشگران قرار می‌دهد.

ارتفاع آبشار لونک کمتر از ده متر است و آبی بسیار خنک و گوارا دارد. نکته جالب در مورد این آبشار این است که در فصل‌های پربارش و پس از بارندگی‌های مداوم، آب آبشار یکپارچه است و حدود ۲۰ متر عرض دارد؛ اما در فصل‌های کم‌بارش، عرض آبشار به علت جریانِ کمِ آب، دو بخش شده و تبدیل به آبشاری دوقلو می‌شود. آب آبشار پس از بارش‌ها به حدی زیاد است که در عرض جاده جاری شده و شما برای عبور از جاده باید از امتداد آب جاری شده بر آسفالت بگذرید.`,
      src: "../../../assest/images/sidebar/0.webp",
    },
    {
      title: "معرفی آبشار لونک",
      text: `آبشار لونک یکی از جذاب‌‌ترین جاهای دیدنی گیلان است که در ۲۵ کیلومتری سیاهکل قرار دارد. این آبشار بخشی از محدوده جنگلی و زیبای جاده دیلمان است که تصویری باطراوت و شاداب از مناظر جنگلی گیلان را پیش چشم گردشگران قرار می‌دهد.

ارتفاع آبشار لونک کمتر از ده متر است و آبی بسیار خنک و گوارا دارد. نکته جالب در مورد این آبشار این است که در فصل‌های پربارش و پس از بارندگی‌های مداوم، آب آبشار یکپارچه است و حدود ۲۰ متر عرض دارد؛ اما در فصل‌های کم‌بارش، عرض آبشار به علت جریانِ کمِ آب، دو بخش شده و تبدیل به آبشاری دوقلو می‌شود. آب آبشار پس از بارش‌ها به حدی زیاد است که در عرض جاده جاری شده و شما برای عبور از جاده باید از امتداد آب جاری شده بر آسفالت بگذرید.`,
      src: "../../../assest/images/sidebar/1.webp",
    },
    {
      title: "معرفی آبشار لونک",
      text: `آبشار لونک یکی از جذاب‌‌ترین جاهای دیدنی گیلان است که در ۲۵ کیلومتری سیاهکل قرار دارد. این آبشار بخشی از محدوده جنگلی و زیبای جاده دیلمان است که تصویری باطراوت و شاداب از مناظر جنگلی گیلان را پیش چشم گردشگران قرار می‌دهد.

ارتفاع آبشار لونک کمتر از ده متر است و آبی بسیار خنک و گوارا دارد. نکته جالب در مورد این آبشار این است که در فصل‌های پربارش و پس از بارندگی‌های مداوم، آب آبشار یکپارچه است و حدود ۲۰ متر عرض دارد؛ اما در فصل‌های کم‌بارش، عرض آبشار به علت جریانِ کمِ آب، دو بخش شده و تبدیل به آبشاری دوقلو می‌شود. آب آبشار پس از بارش‌ها به حدی زیاد است که در عرض جاده جاری شده و شما برای عبور از جاده باید از امتداد آب جاری شده بر آسفالت بگذرید.`,
      src: "../../../assest/images/sidebar/1.webp",
    },
  ];
  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "2rem auto",
        }}
      >
        {/* image */}
        <Box
          sx={{
            width: "78%",
            aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
            borderRadius: 2,
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Box
            component="img"
            src={require("../../../assest/images/sidebar/4.jpg")}
            alt="img"
            sx={{
              width: "100%",
            }}
          />
        </Box>

        {/* title */}
        <Box
          sx={{
            color: "white",
            textAlign: "center",
            py: 1.5,
            px: 2,
            m: "1.5rem auto 2rem",
            borderRadius: 1.5,
            bgcolor: "black",
            display: "flex",
            gap: 1.5,
            justifyContent: "space-between",
            alignItems: "center",
            width: "78%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems:"center"
            }}
          >
            <Box>نام نویسنده : بیتا سعیدی</Box>
            <Box sx={{ color: "#aaaaaa", fontSize: ".8rem" }}>1404/10/8</Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                bgcolor: "#287dfa",
                borderRadius: 13,
                padding: ".2rem .5rem",
                minWidth: "100px",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              جنگل
            </Typography>
            <Typography
              sx={{
                bgcolor: "#287dfa",
                borderRadius: 13,
                padding: ".2rem .5rem",
                minWidth: "100px",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              شمال گردی
            </Typography>
          </Box>
        </Box>

        {/* content */}

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" textAlign="center">
            آبشار لونک
          </Typography>

          {contents?.map((content, index) => {
            return (
              <>
                <Box key={index} sx={{ mt: 6 }}>
                  {/* title */}
                  <Typography variant="h6">{content?.title}</Typography>

                  {/* text */}
                  <Typography variant="body1" sx={{ my: 2 }}>
                    {content?.text}
                  </Typography>

                  {/* images */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mx: 4,
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        borderRadius: 5,
                      }}
                      src={require("../../../assest/images/sidebar/5.jpg")}
                    />
                    <Box
                      component="img"
                      sx={{
                        borderRadius: 5,
                      }}
                      src={require("../../../assest/images/sidebar/4.jpg")}
                    />
                  </Box>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
