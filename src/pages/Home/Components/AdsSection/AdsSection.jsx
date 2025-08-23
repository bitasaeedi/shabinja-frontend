import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import BankMellat from "./image/nody-آرم-بانک-ملت-png-1677068111-removebg-preview.png";
import BankSaderat from "./image/همراه-بانک-صادرات-ایران-آیفون-removebg-preview.png";
import BankSaman from "./image/لوگو-بانک-سامان-removebg-preview.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import gif from "./k044xd4s.gif";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
const baseUrl = API_URL;
// const adsList = [
//   {
//     id: 1,
//     title: "بانک صادرات",
//     image: BankSaderat,
//     tag: "از سراسر وب",
//     percent: "52%",
//   },
//   {
//     id: 2,
//     title: "بانک ملت",
//     image: BankMellat,
//     tag: "مطالب پیشنهادی",
//     percent: "56%",
//   },
//   {
//     id: 3,
//     title: "بانک سامان",
//     image: BankSaman,
//     tag: "پیشنهاد ویژه",
//     percent: "40%",
//   },
// ];

export default function AdsSection() {

  const [bannerData, setBannerData] = useState([]);

  const fetchBanner = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/LoanData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBannerData(response?.data?.data?.image?.url);
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);


  return (
    <>
      {/* desctop */}
      <Box
        sx={{
          width: "75%",
          margin: "0 auto",
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        {[1, 2, 3].map((item, index) => (
          <Box
            key={index}
            component="img"
            width="330px"
            height="150px"
            src={DownloadImageApi(bannerData)}
            className="rounded border shadow"
          />
        ))}
      </Box>

      {/*  mobile */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          width: "100%",
          p: 1,
        }}
      >
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1.2}
        >
          {[1, 2, 3].map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={DownloadImageApi(bannerData)}
                sx={{
                  width: "100%",
                  height: "150px",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
