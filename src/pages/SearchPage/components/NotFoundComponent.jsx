import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";
import { RefreshOutlined } from "@mui/icons-material";

const NotFoundComponent = ({ searchQuery = "" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        // boxShadow: theme.shadows[1],
        maxWidth: 600,
        mx: "auto",
        my: 4,
      }}
    >
      <SearchOffIcon
        sx={{
          fontSize: isMobile ? 60 : 80,
          color: theme.palette.text.secondary,
          mb: 2,
        }}
      />

      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        اقامتگاهی پیدا نشد
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 500 }}
      >
        ما نتونستیم اقامتگاهی که با فیلتر های شما مطابقت داشته باشد پیدا کنیم
        لطفابا فیلترهای جدید تلاش کنید
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          برو به صفحه اصلی
        </Button>
        <Button
          // variant="outlined"
          onClick={() => window.location.reload()}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          تازه سازی
          <RefreshOutlined size={16} />
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundComponent;
