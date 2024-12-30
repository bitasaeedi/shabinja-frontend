import React, { useContext, useEffect, useRef } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import InfoSection from "./InfoSection/InfoSection";
import { AboutStay } from "./AboutStay/AboutStay";
import MyCalendarsWithprice from "../../../../components/MyCalendars/MyCalendarsWithprice";
import { StayPageContext } from "../../StayPage";

const ScrollableTabs = () => {
  const stayPageContext = useContext(StayPageContext);
  const [activeTab, setActiveTab] = useState(0);
  // Create refs for each section
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
    section5: useRef(null),
    section6: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Entry:', entry.target, entry.isIntersecting);
          if (entry.isIntersecting) {
            const sectionIndex = Object.keys(sectionRefs).findIndex(
              (key) => sectionRefs[key].current === entry.target
            );
            setActiveTab(sectionIndex);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.5,
      }
    );
  
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
  
    return () => observer.disconnect();
  }, [sectionRefs]);
  

  const handleTabClick = (section) => {
    sectionRefs[section].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  
    // Update activeTab manually to ensure UI stays in sync
    const sectionIndex = listSection.findIndex((item) => item.value === section);
    setActiveTab(sectionIndex);
  };
  

  const listSection = [
    { title: "مشخصات", value: "section1" },
    { title: "توضیحات", value: "section2" },
    { title: "امکانات", value: "section3" },
    { title: "تصاویر", value: "section4" },
    { title: "تقویم", value: "section5" },
    { title: "نظرات", value: "section6" },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs"
        sx={{
          position: "sticky",
          top: 65,
          backgroundColor: "#000000",
          color: "white",
          alignItems: "center",
          zIndex: "200 !important",
        }}
        TabIndicatorProps={{
          style: {
            display: "none", // Remove the underline indicator completely
          },
        }}
      >
        {listSection.map((item, index) => (
          <Tab
            disableRipple={true}
            label={item?.title}
            onClick={() => handleTabClick(item?.value)}
            sx={{
             
              minWidth: 0, // Remove extra minimum width
              minHeight: 28, // Remove extra height
              px: 2, // Remove horizontal padding
              py: 0, // Remove vertical padding
              mx: 1,
              fontSize: "0.9rem", // Make the text slightly smaller
              color: "white", // Default text color
              "&.Mui-selected": {
                backgroundColor: "#ffb400", //(theme) => theme.palette.primary.main, //"#fca311",
                borderRadius: "30px", // Rounded corners for active tab
                color: "#000000", // Active text color
                boxShadow: "none", // No shadow
              },
              "&:not(.Mui-selected)": {},
              "&.Mui-selected:before": {},
            }}
          />
        ))}
      </Tabs>

      {/* Content Sections */}
      <Box
      sx={{
        zIndex: "100",
      }}>
        <Box
          ref={sectionRefs.section1}
          sx={{
            minHeight: "20vh",
            // backgroundColor: "lightblue",
            py: 4,
          }}
        >
          <InfoSection />
        </Box>
        {/* توضیحات */}
        <Box
          ref={sectionRefs.section2}
          sx={{
            minHeight: "20vh",
            py: 4,
          }}
        >
          <AboutStay />
        </Box>
        {/* امکانات */}
        <Box
          ref={sectionRefs.section3}
          sx={{
            minHeight: "20vh",
            py: 4,
          }}
        >
          <AboutStay />
        </Box>
        {/* تصاویر */}
        <Box
          ref={sectionRefs.section4}
          sx={{
            py: 4,
          }}
        >
          <AboutStay />
        </Box>
        {/* تقویم */}
        <Box
          ref={sectionRefs.section5}
          sx={{
            py: 4,
          }}
        >
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <MyCalendarsWithprice
              numMonth={2}
              onChange={stayPageContext.handleChangeDate}
              values={stayPageContext.listDateSelected}
            />
          </Box>
          <Box sx={{ display: { lg: "none" } }}>
            <MyCalendarsWithprice
              numMonth={1}
              onChange={stayPageContext.handleChangeDate}
              values={stayPageContext.listDateSelected}
            />
          </Box>
        </Box>

        {/* نظرات */}
        <Box
          ref={sectionRefs.section6}
          sx={{
            py: 4,
          }}
        >
          <AboutStay />
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollableTabs;
