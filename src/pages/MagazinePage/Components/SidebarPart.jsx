import React, { useContext, useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import SideBarCard from "../CardSectins/SideBarCard";
import { Grid } from "swiper/modules";
import { MagPageContext } from "../MagazinePage";

const sideItems = [
  { title: "جنوبگردی", count: 10 },
  { title: "گردشگرانه", count: 14 },
  { title: "شمال‌گردی", count: 20 },
  { title: "ایرانگردی", count: 19 },
  { title: "مزه‌گردی", count: 5 },
  { title: "راه‌بلد", count: 22 },
  { title: "کویرنوردی", count: 7 },
  { title: "جنگلنوردی", count: 18 },
  { title: "کوه‌نوردی", count: 12 },
  { title: "دریاگردی", count: 9 },
];
export default function SidebarPart({ myWidth, isMobile }) {
  const [showAll, setShowAll] = useState(false);

  const {categoryList , handleCategoryFilter}=useContext(MagPageContext);

  // حداکثر 9 تا (3 ردیف × 3 ستون)
  const visibleItems = showAll ? sideItems : sideItems.slice(0, 9);

  return (
    <>
      {isMobile ? (
        <Box
          sx={{
            width: isMobile ? "100%" : myWidth,
            minWidth: "310px",
            px: isMobile ? "1rem" : "0rem",
          }}
        >
          {/* sidebar title */}
          <Typography
            variant="h6"
            sx={{
              bgcolor: "black",
              color: "white",
              textAlign: "center",
              padding: ".3rem",
              fontSize: isMobile ? "1rem" : "1.1rem",
              mb: 1.5,
            }}
          >
            دسته بندی ها
          </Typography>

          {/* tags */}
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // سه تا در هر ردیف
                gap: .6,
                mx:.3
              }}
            >
              {categoryList.map((item, index) => (
                <Chip
                  key={index}
                  label={`${item.title} (${item.count})`}
                  variant="outlined"
                  sx={{  bgcolor: "#287dfa",
                    cursor:"pointer",
                    color:"white",
                    borderRadius: 13,
                    padding: isMobile ? ".15rem .2rem" : ".2rem .5rem",
                    minWidth:isMobile ? "85px" : "100px" ,
                    textAlign:"center",
                    fontSize: isMobile ? ".9rem" : "1rem",}}
                    onClick={()=>{handleCategoryFilter(item?.id)}}
                />
              ))}
            </Box>

            {!showAll && sideItems.length > 9 && (
              <Box textAlign="center" mt={2}>
                <Button variant="outlined" onClick={() => setShowAll(true)}>
                  مشاهده بیشتر
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: isMobile ? "100%" : myWidth,
            minWidth: "310px",
            px: isMobile ? "1rem" : "0rem",
          }}
        >
          {/* sidebar title */}
          <Typography
            variant="h6"
            sx={{
              bgcolor: "black",
              color: "white",
              textAlign: "center",
              padding: ".3rem",
              fontSize: isMobile ? "1rem" : "1.1rem",
            }}
          >
            دسته بندی ها
          </Typography>

          {/* items */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mx: isMobile ? 1 : 2,
              mt: 2,
            }}
          >
            {categoryList.map((item, index) => (
              <SideBarCard
                key={index}
                title={item?.title}
                count={item?.count}
                isMobile={isMobile}
                id={item?.id}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
