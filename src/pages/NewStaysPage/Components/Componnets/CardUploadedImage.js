import {
  Box,
  CardMedia,
  IconButton,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { HostDeleteImageApi } from "../../../../api/toureApis";

const CardUploadedImage = ({ file, removeImageFromUploadedList }) => {
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = async () => {
    setDeleteLoading(true);
    const result = await HostDeleteImageApi(file.guid);
    console.log(result, "result delete", file.id);  
    removeImageFromUploadedList(file.id);
    setDeleteLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
        height: "100%",
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ borderRadius: "10px" }}
        />
      )}
      <CardMedia
        component="img"
        sx={{
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          display: loading ? "none" : "block",
        }}
        image={DownloadImageApi(file?.file?.url)} // Use the randomly selected image
        onLoad={() => setLoading(false)} // Hide skeleton after loading
        alt={file?.file?.fileName || "Uploaded Image"}
      />

      <IconButton
        onClick={handleDelete}
        disabled={deleteLoading}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          "&:disabled": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
        }}
        size="small"
      >
        {deleteLoading ? (
          <CircularProgress size={20} color="error" /> // Show loading spinner
        ) : (
          <DeleteIcon color="error" />
        )}
      </IconButton>
    </Box>
  );
};

export default CardUploadedImage;
