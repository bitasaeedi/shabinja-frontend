import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const CardComment = () => {
  return (
    <Box className="d-flex justify-content-center w-auto pb-0 mb-0 mx-1">
      <Card
        sx={{
          maxWidth: 340,
          // margin: "20px auto",
          borderRadius: "10px",
          // boxShadow: "none",
          // backgroundColor: "#f9f9f9",
          // padding: 2,
          pb: 2,
          // border: "1px solid #f7f7f7",
          // borderColor: "primary.main", // Use the primary color from the theme
        }}
      >
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 2,
            borderRadius: "8px",
          }}
        >
          <Avatar
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            sx={{
              width: 60,
              height: 60,
              border: "2px solid #287dfa",
              // boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <Box sx={{ textAlign: "left", mx: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: 1,
                fontSize: "20px",
              }}
            >
              محمد
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: "12px" }}
            >
              تهران
            </Typography>
          </Box>
        </Box>

        {/* Comment Section */}
        <Paper
          elevation={0}
          sx={{
            // marginTop: 2,
            px: 3,
            borderRadius: "8px",
            textAlign: "left",
            // backgroundColor: "#f9f9f9",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              fontSize: { xs: ".7rem", md: "1rem" },
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            من امسال یک مسافرت به شمال رفتم و از سایت شما استفاده کردم. همه
            همراهام راضی بودند. من مشتاقم باز هم با شبینجا سفر کنم.
          </Typography>
        </Paper>
      </Card>
    </Box>
  );
};

export default CardComment;
