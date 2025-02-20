import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

const SkeletonFavoritCitiesCard = () => {
  return (
    <Box
      className="w-auto"
      sx={{
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Card
        sx={{
          width: { xs: 100, sm: 130, md: 140, lg: 170 },
          boxShadow: "none",
          backgroundColor: "transparent",
          overflow: "hidden",
          pb: 0,
        }}
      >
        {/* Skeleton for Image */}
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            height: { xs: 115, sm: 140, md: 200 },
            borderRadius: 3,
          }}
        />

        {/* Skeleton for Card Content */}
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <Skeleton width="100px" height={"20px"} />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SkeletonFavoritCitiesCard;
