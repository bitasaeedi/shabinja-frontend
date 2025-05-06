import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ManageStepsContext } from "../../../ManageSteps";
import CardShowImage from "./CardShowImage";
import UploadProsseing from "./UploadProsseing";

const NationDoc = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // console.log(images, "images HomeDoc");
    setUploadedImages([manageStepsContext?.hostInfoUpdating?.nationallImage]);
  }, [manageStepsContext?.hostInfoUpdating]);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files).map((file) => ({
      file,
      statusUpload: "pending",
    }));
    // console.log(uploadedFiles, "handleFileDrop");
    setImages((prevList) => [...uploadedFiles]);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      file,
      statusUpload: "pending",
    }));
    // console.log(selectedFiles, "selectedFiles");
    setImages((prevList) => [...selectedFiles]);
  };

  const callBackUploaded = (index, uploaded) => {
    // setImages((prevImages) =>
    //   prevImages.map((image, i) =>
    //     i === index ? { ...image, statusUpload: uploaded || "uploaded" } : image
    //   )
    // );
    setImages([]);
  };

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        کارت ملی خود را بارگذاری کنید
      </Typography>
      <Box
        component="ul"
        sx={{ padding: 0, margin: 0, listStyle: "none", mt: 2 }}
      >
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
            فقط یک تصویر میتوانید بارگذاری کنید
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
          برای آپلود تصاویر، آنها را اینجا بکشید یا از گزینه زیر استفاده کنید.
        </Typography>
        <Button variant="text" component="label" sx={{ mt: 2, width: 100 }}>
          انتخاب تصویر
          <input
            type="file"
            hidden
            // multiple
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
          <UploadProsseing
            key={index}
            fileObj={file}
            index={index}
            idStay={manageStepsContext?.hostInfoUpdating?.id}
            callBackUploaded={callBackUploaded}
            typeImage={"nation"}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={0}>
          {uploadedImages.reverse()?.map((file, index) => (
            <Grid key={index} xs={6} md={4} sx={{ p: 1, height: 150 }}>
              <CardShowImage
                file={file}
                // removeImageFromUploadedList={
                //   removeImageFromUploadedList
                // }
                removeImageFromUploadedList={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default NationDoc;
