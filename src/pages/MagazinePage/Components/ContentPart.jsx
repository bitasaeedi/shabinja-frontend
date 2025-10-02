import React, { useContext } from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ContentCard from "../CardSectins/ContentCard";
import { MagPageContext } from "../MagazinePage";
const list = [
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
  {
    title: "آبشار لونک",
    info: "آبشار لونک یک آبشار دنج و جذاب در حاشیه جاده است که گردشگران حاضر در مسیر سیاهکل به دیلمان حتماً از آن بازدید می‌کنند. این مقاله به معرفی آبشار لونک و همه ویژگی‌های آن می‌پردازد.",
  },
];
export default function ContentPart({ myWidth, isMobile }) {
  const { blogList, blogsLoading } = useContext(MagPageContext);
  return (
    <>
      <Grid
        container
        spacing={isMobile ? 0 : 3}
        sx={{
          width: isMobile ? "100%" : myWidth,
          px: isMobile ? "1rem" : "0rem",
        }}
      >
        {blogsLoading ? (
          Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={`sk-${i}`}>
              <Box sx={{ p: isMobile ? 1 : 0 }}>
                <Skeleton
                  variant="rectangular"
                  height={isMobile ? 180 : 220}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton variant="text" height={28} sx={{ mt: 1.5 }} />
                <Skeleton variant="text" height={20} width="80%" />
              </Box>
            </Grid>
          ))
        ) : blogList.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              margin: " 0 auto",
              textAlign: "center",
              mt: 2,
              border: "1px solid #000",
              p: 2,
              borderRadius: 2,
              height: "65px",
            }}
          >
            مقاله ای یافت نشد
          </Typography>
        ) : (
          blogList.map((item, i) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={i}>
              <ContentCard item={item} index={i} isMobile={isMobile} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
