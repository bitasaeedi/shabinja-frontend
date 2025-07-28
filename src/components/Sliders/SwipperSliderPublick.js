import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeCardSkeleton from "../Cards/HomeCards/HomeCardSkeleton";
import SkeletonFavoritCitiesCard from "../Cards/FavoritCitiesCard/SkeletonFavoritCitiesCard";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import { Tab } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardSkeletonComment from "../Cards/CardComment/CardSkeletonComment";
import { Link } from "react-router-dom";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      "&:hover": {
        backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      },
    }}
    disabled={disabled}
  >
    <ArrowForwardIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const PrevArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      "&:hover": {
        backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const SwipperSliderPublick = ({
  lists,
  children,
  title,
  loading,
  deafultSkeleton,
  slidesPerView = 3,
  breakpoints,
  dontChangeWidth,
  widthSize,
  linkToSeeMore,
  showTimer = false,
  provinces,
  handleChangeProvince,
  selectedCity,
}) => {
  const swiperRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    stringTime: "00:00:00",
    h: "00",
    m: "00",
    s: "00",
  });

  // تابع برای محاسبه زمان باقی‌مانده تا پایان روز
  const calculateTimeRemaining = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // تنظیم زمان پایان روز

    const difference = endOfDay - now; // تفاوت زمان به میلی‌ثانیه

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const stringTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return {
      stringTime: stringTime,
      h: String(hours).padStart(2, "0"),
      m: String(minutes).padStart(2, "0"),
      s: String(seconds).padStart(2, "0"),
    };
  };

  // استفاده از useEffect برای به‌روزرسانی تایمر هر ثانیه
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); // پاک کردن تایمر هنگام unmount
  }, []);

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      setIsPrevDisabled(swiper.isBeginning);
      setIsNextDisabled(swiper.isEnd);
    }
  };

  const TimerCounter = () => {
    return (
      <Box sx={{ mx: { xs: 0, md: 2 }, display: "flex", alignItems: "center" }}>
        {["s", "m", "h"].map((unit, index) => (
          <React.Fragment key={unit}>
            <Box
              sx={{
                backgroundColor: "white",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                fontWeight: "bold",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 16 }}>
                {timeRemaining?.[unit] ?? "00"}
              </Typography>
            </Box>
            {index < 2 && (
              <Typography variant="h6" sx={{ mx: 0.5, fontWeight: "bold" }}>
                :
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: widthSize || { xs: "90%", md: "80%" },
        margin: "auto",
        py: { xs: "10px ", md: "20px" },
      }}
    >
      <Box
        sx={{ position: "relative", px: 0 , 
          marginBottom: { xs: showTimer ? 0 : 3, md: 3 }}}
        className="d-flex justify-content-between align-items-start"
      >
        <Box sx={{ alignItems: "start"}}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: 18, md: 28 },
            }}
          >
            {title}
          </Typography>

          {/* {showTimer && (
            <Box sx={{ display: { md: "none" } }}>
              <TimerCounter />
            </Box>
          )} */}
        </Box>

        <Box sx={{ display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        alignItems: { xs: "end", md: "center" },
        gap: { xs: 1, md: 0 } }}>
          {/* نمایش تایمر معکوس */}
          {showTimer && (
            <Box sx={{ display: "flex"}}>
              <TimerCounter />
            </Box>
          )}

          {linkToSeeMore && (
            <Box>
              <Button
                variant="outlined"
                component={Link}
                to={`${linkToSeeMore}`}
                sx={{
                  backgroundColor: "transparent",
                  border: `1px solid #ccc`,
                  borderRadius: { xs: "5px", md: "10px" },
                  fontSize: { xs: 12, md: 13 },
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                مشاهده همه
              </Button>
            </Box>
          )}
          <Box
            className="mx-1"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <NextArrow onClick={handlePrevClick} disabled={isPrevDisabled} />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <PrevArrow onClick={handleNextClick} disabled={isNextDisabled} />
          </Box>
        </Box>
      </Box>

      {/* city tabs */}

      {showTimer && (
        <Box sx={{ marginBottom: ".5rem" }}>
          <Tabs
            value={selectedCity}
            onChange={(e, value) => {
              handleChangeProvince(value)
            }}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-flexContainer": {
                gap: 0.5, 
              },
            }}
          >
            
            <Tab
              sx={{
                paddingX: 0,
                minWidth: "70px",
              }}
              disableRipple
              label="تمامی شهرها"
              value={"تمامی شهرها"}
            />

            {provinces?.map((item, index) => (
              <Tab
                key={index}
                sx={{
                  paddingX: 0,
                  minWidth: "70px",
                }}
                disableRipple
                label={item?.title}
                value={item?.title}
              />
            ))}

          </Tabs>
        </Box>
      )}

      <Swiper
        ref={swiperRef}
        centeredSlides={false}
        spaceBetween={10}
        loop={false}
        grabCursor={true}
        onSlideChange={handleSlideChange}
        breakpoints={
          breakpoints
            ? breakpoints
            : {
                0: { slidesPerView: 1.05, spaceBetween: 2 },
                350: { slidesPerView: 1.1, spaceBetween: 2 },
                375: { slidesPerView: 1.2, spaceBetween: 2 },
                400: { slidesPerView: 1.1, spaceBetween: 2 },
                430: { slidesPerView: 1.2, spaceBetween: 8 },
                510: { slidesPerView: 1.65, spaceBetween: 8 },
                590: { slidesPerView: 2.05, spaceBetween: 10 },
                680: { slidesPerView: 2.3, spaceBetween: 12 },
                740: { slidesPerView: 2.5, spaceBetween: 12 },
                900: { slidesPerView: 2.4, spaceBetween: 12 },
                1026: { slidesPerView: 2.65, spaceBetween: 10 },
                1120: { slidesPerView: 2.9, spaceBetween: 10 },
                1250: { slidesPerView: 3.15, spaceBetween: 20 },
                1355: { slidesPerView: 3.35, spaceBetween: 20 },
                1440: { slidesPerView: 3.5, spaceBetween: 20 },
                1510: { slidesPerView: 3.6, spaceBetween: 20 },
              }
        }
        // slidesOffsetBefore={deafultSkeleton === "favorit" ? 60 : 80} // adjust px as needed
        style={{
          paddingBottom: "5px",
        }}
      >
        {loading !== false
          ? [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <SwiperSlide key={index} className="d-flex justify-content-start">
                {deafultSkeleton === "favorit" ? (
                  <SkeletonFavoritCitiesCard />
                ) : deafultSkeleton === "comment" ? (
                  <CardSkeletonComment />
                ) : (
                  <HomeCardSkeleton />
                )}
              </SwiperSlide>
            ))
          : lists?.map((item, index) => (
              <SwiperSlide key={index} className="d-flex justify-content-start">
                {React.Children?.map(children, (child) =>
                  React.cloneElement(child, {
                    myData: item,
                  })
                )}
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default SwipperSliderPublick;
