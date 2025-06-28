import { Box, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StackedImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "190px",
  height: "180px",
  margin: "10px auto 0",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#e8e8e8",
    transform: "rotate(8deg)",
    zIndex: -2,
  },
  "&::after": {
    transform: "rotate(4deg)",
    zIndex: -1,
  },
}));

export default function StackedImageSkeleton() {
  return (
    <>
      <StackedImageWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            borderRadius: "4px",
            transform: "rotate(0deg)",
            zIndex: 1,
          }}
        />
      </StackedImageWrapper>
  
    </>
  );
}
