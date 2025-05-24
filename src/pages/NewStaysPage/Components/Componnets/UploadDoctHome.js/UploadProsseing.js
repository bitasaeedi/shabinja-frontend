import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  HostUploadImageApi,
  UploadDocumentsApi,
} from "../../../../../api/toureApis";
import MyAlertMui from "../../../../../components/MyAlertMui/MyAlertMui";
import { ManageStepsContext } from "../../../ManageSteps";

// Circular progress component
function CircularProgressWithLabel({ value, uploadStatus }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        // variant="determinate"
        variant={
          parseFloat(value) === 100 && uploadStatus === "loading"
            ? "indeterminate"
            : "determinate"
        } //indeterminate
        value={value}
        sx={{
          color:
            uploadStatus === "success"
              ? "green"
              : uploadStatus === "error"
              ? "red"
              : "primary.main",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" sx={{ color: "white" }}>
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const UploadProsseing = ({
  fileObj,
  index,
  idStay,
  callBackUploaded,
  typeImage,
}) => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });
  const [isUploading, setIsUploading] = useState(true); // Prevent multiple uploads
  const hasMounted = useRef(false); // Ref to track if component has mounted

  useEffect(() => {
    if (fileObj.file && fileObj?.statusUpload === "pending") {
      uploadToApi(); // Start uploading the file
    }
  }, []);

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  // File upload to API
  const uploadToApi = async () => {
    // if (isUploading) return; // Prevent uploading if already in progress

    try {
      setIsUploading(true);
      setUploadStatus("loading");
      setUploadProgress(0); // Reset progress

      if (!fileObj?.file) {
        console.error("No file selected");
        setUploadStatus("error");
        setIsUploading(false);
        return;
      }

      // Convert the file to a base64 string
      const reader = new FileReader();

      reader.onloadend = async () => {
        const fileData = {
          fileName: fileObj?.file.name,
          extension: `.${fileObj?.file.name.split(".").pop()}`,
          size: fileObj?.file.size,
          data: reader.result, // Get base64 data
        };

        var myData = null;
        if (typeImage == "homDoc") {
          myData = {
            fileHost: fileData,
            // nationallImage: fileData,
            // manageStepsContext?.hostInfoUpdating?.nationallImage,
          };
        } else {
          myData = {
            nationallImage: fileData,
            // fileHost: fileData, //manageStepsContext?.hostInfoUpdating?.fileHost,
          };
        }
        const result = await manageStepsContext?.handleUploadDocumentsApi(
          myData
        );
        setIsUploading(false);
        if (result) {
          //   setUploadStatus("success");
          handleMangeAlert(true, "success", "عملیات با موفقیت انجام  شد");
          setTimeout(() => {
            callBackUploaded(index, "uploaded");
          }, 1000);
        } else {
          handleMangeAlert(true, "error", "عملیات با خطا مواجه شد");
          //   setUploadStatus("error");
          setTimeout(() => {
            callBackUploaded(index, "error");
          }, 1000);
        }

        setIsUploading(false); // End upload
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(fileObj?.file);
    } catch (error) {
      console.error("Error uploading to API:", error);
      setUploadStatus("error");
      setIsUploading(false); // End upload
    }
  };

  return (
    // fileObj?.statusUpload === "pending" ||
    isUploading == true && (
      <Box key={index}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              width: 100,
              height: 100,
              mt: 2,
              borderRadius: "8px",
            }}
          >
            <img
              src={URL.createObjectURL(fileObj?.file)}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <CircularProgress />

              {/* <CircularProgressWithLabel
                value={uploadProgress}
                uploadStatus={uploadStatus}
              /> */}
            </Box>
          </Box>
        </Box>

        {showAlertSetting?.show && (
          <MyAlertMui
            message={showAlertSetting?.message || ""}
            handleClose={() =>
              handleMangeAlert(
                false,
                showAlertSetting?.status,
                showAlertSetting?.message
              )
            }
            status={showAlertSetting?.status}
          />
        )}
      </Box>
    )
  );
};

export default UploadProsseing;
