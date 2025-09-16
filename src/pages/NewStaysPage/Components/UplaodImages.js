import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  LinearProgress,
  ImageList,
  ImageListItem,
  CardMedia,
} from "@mui/material";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import {
  HostTourSearchImagesApi,
  HostUploadImageApi,
} from "../../../api/toureApis";
import { ManageStepsContext } from "../ManageSteps";
import UploadProccessImage from "./Componnets/UploadProccessImage";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import CardUploadedImage from "./Componnets/CardUploadedImage";
import ImageIcon from "@mui/icons-material/Image";
import { convertImageToWebP } from "../../../api/PublicApis";



  
  const UploadImages = () => {
    const manageStepsContext = useContext(ManageStepsContext);
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      handleGetImageUploaded();
    }, [images]);
  
    // Function to handle image uploads
    const handleFileDrop = async (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
    
      const convertedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const webpFile = await convertImageToWebP(file);
            return {
              file: webpFile,
              statusUpload: "pending",
            };
          } catch (error) {
            console.error("خطا در تبدیل فایل:", error);
            return {
              file,
              statusUpload: "error",
            };
          }
        })
      );
    
      setImages((prevList) => [...prevList, ...convertedFiles]);
    };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
  
    // تبدیل همزمان همه فایل‌ها به WebP
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const webpFile = await convertImageToWebP(file);
          return {
            file: webpFile,
            statusUpload: "pending",
          };
        } catch (error) {
          console.error("خطا در تبدیل فایل:", error);
          return {
            file, // فایل اصلی رو نگه می‌داریم در صورت خطا
            statusUpload: "error",
          };
        }
      })
    );
  
    setImages((prevList) => [...prevList, ...convertedFiles]);
  };
  

  const callBackUploaded = (index, uploaded) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, statusUpload: uploaded || "uploaded" } : image
      )
    );
  };

  const onSubmit = async () => {
    setLoading(true);
    manageStepsContext?.handleNext();
    setLoading(false);
  };
  const handleGetImageUploaded = async () => {
    const result = await HostTourSearchImagesApi(
      manageStepsContext?.hostInfoUpdating?.id
    );
    setUploadedImages(result?.data || []);
  };

  // خارج کردن عکس از لیست عکسهای اپلود شده.
  const removeImageFromUploadedList = (idImage) => {
    setUploadedImages((prevList) =>
      prevList.filter((img) => img.id !== idImage)
    );
  };
  return (
    <>
      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            ارائه تصاویر زیبا و واقعی از اقامتگاه شما می‌تواند نقش بسیار مهمی در
            جلب نظر میهمانان ایفا نماید. لذا:
          </Typography>
          <Box
            component="ul"
            sx={{ padding: 0, margin: 0, listStyle: "none", mt: 2 }}
          >
            <Box
              component="li"
              sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
            >
              <Box>
                <Typography
                  sx={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "text.primary",
                    borderRadius: "50%",
                    mt: 0.5,
                    mr: 1.5,
                  }}
                ></Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  حداقل 6 عکس با کیفیت از پذیرایی، اتاق خواب‌ها، آشپزخانه، سرویس
                  بهداشتی، حیاط و نمای ساختمان آپلود کنید
                </Typography>
              </Box>
            </Box>

            <Box
              component="li"
              sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
            >
              <Typography
                sx={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "text.primary",
                  borderRadius: "50%",
                  mt: 0.5,
                  mr: 1.5,
                }}
              ></Typography>
              <Typography variant="body2" color="text.secondary">
                ترجیحاً از تصاویر افقی (Landscape) استفاده کنید.
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
            >
              <Typography
                sx={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "text.primary",
                  borderRadius: "50%",
                  mt: 0.5,
                  mr: 1.5,
                }}
              ></Typography>
              <Typography variant="body2" color="text.secondary">
                از آپلود تصاویر "اسکرین‌شات" اجتناب کنید.
              </Typography>
            </Box>

            <Box
              component="li"
              sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
            >
              <Typography
                sx={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "text.primary",
                  borderRadius: "50%",
                  mt: 0.5,
                  mr: 1.5,
                }}
              ></Typography>
              <Typography variant="body2" color="text.secondary">
             از آپلود تصاویر با حجم بالای 600 کیلوبایت، اجتناب کنید.
              </Typography>
            </Box>
          </Box>

          {/* Drag-and-Drop Area */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#fafafa",
              cursor: "pointer",
              minHeight: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onDrop={handleFileDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <Typography variant="body2" color="text.secondary">
              برای آپلود تصاویر، آنها را اینجا بکشید یا از گزینه زیر استفاده
              کنید.
            </Typography>
            <Button variant="text" component="label" sx={{ mt: 2, width: 100 }}>
              انتخاب تصویر
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileSelect}
                accept="image/*"
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
            gap={2}
          >
            {images?.map((file, index) => (
              <UploadProccessImage
                key={index}
                fileObj={file}
                index={index}
                idStay={manageStepsContext?.hostInfoUpdating?.id}
                callBackUploaded={callBackUploaded}
              />
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={0}>
              {uploadedImages.reverse()?.map((file, index) => (
                <Grid key={index} xs={6} md={4} sx={{ p: 1, height: 150 }}>
                  <CardUploadedImage
                    file={file}
                    removeImageFromUploadedList={removeImageFromUploadedList}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16, // Keeps card sticky for larger screens
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  mb: 1,
                }}
                gutterBottom
              >
                <ImageIcon sx={{ mr: 1 }} />
                تصاویر اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
             با بارگذاری تصاویر مناسب و واقعی، اقامتگاه خود را به کاربران معرفی کنید.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={onSubmit}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={uploadedImages?.length < 6}
      />
    </>
  );
};

export default UploadImages;
