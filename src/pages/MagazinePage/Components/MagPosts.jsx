import { Box, Typography, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import moment from "moment-jalaali";

export default function MagPosts({ isMobile }) {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [blog, setBlog] = useState();

  const getBlog = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/Mag/Get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response?.data?.data, "get Selected Blog");
      setBlog(response?.data?.data);
    } catch (error) {
      console.log(error, "getSelectedBlog Error");
      return error?.response?.data;
    }
  }, []);

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: isMobile ? "100%" : "90%",
          margin: "2rem auto",
        }}
      >
        {/* image */}
        <Box
          sx={{
            width: isMobile ? "100%" : "78%",
            aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
            borderRadius: isMobile ? 0 : 2,
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Box
            component="img"
            src={DownloadImageApi(blog?.firstImage?.url)}
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
            px: isMobile ? 1 : 2,
            m: isMobile ? ".8rem auto 1.5rem" : "1.5rem auto 2rem",
            borderRadius: 1.5,
            bgcolor: "black",
            display: "flex",
            gap: 1.5,
            justifyContent: "space-between",
            alignItems: "center",
            width: isMobile ? "96%" : "78%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              fontSize: isMobile ? ".8rem" : "unset",
            }}
          >
            <Box>نام نویسنده : {blog?.author} </Box>
            <Box
              sx={{ color: "#aaaaaa", fontSize: isMobile ? ".7rem" : ".8rem" }}
            >
              {moment(blog?.created).format("jYYYY/jMM/jDD")}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 0.5 : 1,
            }}
          >
            {blog?.tags?.map((tag, index) => {
              return (
                <Typography
                  key={index}
                  sx={{
                    bgcolor: "#287dfa",
                    borderRadius: 13,
                    padding: ".22rem .5rem",
                    minWidth: isMobile ? "65px" : "100px",
                    textAlign: "center",
                    fontSize: isMobile ? 10 : 14,
                  }}
                >
                  {tag?.myTagTitle}
                </Typography>
              );
            })}
          </Box>
        </Box>

        {/* content */}

        <Box sx={{ mt: isMobile ? 3 : 5 }}>
          <Typography
            variant="h1"
            textAlign="center"
            sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
          >
            {blog?.title}
          </Typography>

          {blog?.items?.map((content, index) => {
            return (
              <>
                <Box
                  key={index}
                  sx={{ mt: isMobile ? 4 : 6, mx: { xs: 1.5, md: 0 } }}
                >
                  {/* title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: isMobile ? "1.05rem" : "1.2rem",
                    }}
                  >
                    {content?.title}
                  </Typography>

                  {/* text */}
                  <Typography
                    variant="body1"
                    sx={{
                      my: { xs: 1, md: 1.5 },
                      fontSize: isMobile ? ".9rem" : "1rem",
                      textAlign: "justify",
                    }}
                  >
                    {content?.desc}
                  </Typography>

                  {/* images */}
                  {isMobile ? (
                    <>
                      <Swiper
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        spaceBetween={15}
                        slidesPerView={1.2}
                      >
                        <SwiperSlide>
                          <Box
                            sx={{
                              width: "100%",
                              aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              component="img"
                              src={DownloadImageApi(content?.firstImage?.url)}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </SwiperSlide>

                        <SwiperSlide>
                          <Box
                            sx={{
                              width: "100%",
                              aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              component="img"
                              src={DownloadImageApi(content?.secondImage?.url)}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </SwiperSlide>
                      </Swiper>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={DownloadImageApi(content?.firstImage?.url)}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={DownloadImageApi(content?.secondImage?.url)}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  {/* buttons */}

                  <Box
                    display="flex"
                    justifyContent={"center"}
                    sx={{ gap: 2, mt: 2 }}
                  >
                    {content?.firstButtonLink ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(content?.firstButtonLink);
                        }}
                      >
                        {content?.firstButtonTitle}
                      </Button>
                    ) : null}

                    {content?.secondButtonLink ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(content?.secondButtonLink);
                        }}
                      >
                        {content?.secondButtonTitle}
                      </Button>
                    ) : null}
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
