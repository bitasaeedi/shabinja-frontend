import { Box, Typography } from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';

export default function MagPosts() {
  return (
    <>
      <Box sx={{ width: "100%", mr: "5rem" }}>
        <Typography variant="body2" sx={{ mb: "2rem" , color:"#666666" , display:"flex" , gap:".2rem"}}>
        <HomeIcon sx={{ fontSize: 16 }} />
         <span> خانه /</span>
         <span>گیلان /</span>
         <span>آبشار لونک</span>
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: "1rem" }}>
          آبشار لونک؛ حس طراوت و تازگی در ارتفاعات گیلان |‌جاباما{" "}
        </Typography>
        <Box
          component="img"
          src={require("../../../assest/images/sidebar/2.webp")}
          alt="post-img"
          sx={{ width: "100%", height: "350px" }}
        />
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", fontWeight: "bold", mt: "2rem", mb: "1rem" }}
        >
          آبشار لونک آبشاری زیبا و چشم‌نواز در استان گیلان است که در مسیر
          مه‌آلود و پرپیچ‌وخم شهر سیاهکل به شهر ییلاقی دیلمان قرار دارد. همسایگی
          این آبشار با جاده اصلی، باعث شده تا تماشای منظره زیبا و چشم‌نواز آن
          برای همه گردشگران مهیا باشد؛ حتی اگر نخواهید برای دیدن آبشار توقف
          کنید! آبشار لونک در میانه جاده سیاهکل به دیلمان واقع شده و بهانه خوبی
          برای استراحتی کوتاه در این مسیر، تماشای آبشار و لذت بردن از طراوت و
          زیبایی طبیعت اطراف آن است. البته طبیعت‌گردان زیادی با هدف بازدید از
          آبشار لونک، گشت‌وگذار در جنگل‌های اطراف آن و حتی کمپینگ در بالای آبشار
          به این بخش از گیلان سفر می‌کنند. درهرصورت، لونک قلب تپنده ارتفاعات
          لاهیجان است؛ جایی که صدای طبیعت در آن به‌وضوح به گوش می‌رسد و آرامش
          واقعی را روانه جسم و جان گردشگران خواهد کرد. این مقاله به معرفی آبشار
          لونک و همه ویژگی‌های آن می‌پردازد تا راهنمای شما در این سفر
          به‌یادماندنی باشد.
        </Typography>
      </Box>
    </>
  );
}
