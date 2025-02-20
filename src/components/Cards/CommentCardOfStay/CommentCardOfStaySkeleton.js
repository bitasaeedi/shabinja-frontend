import React from "react";
import { Card, Avatar, Typography, Rating, Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const CommentCardOfStaySkeleton = ({ showReplyes }) => {
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 0,
        minHeight: 190,
        maxHeight: showReplyes ? "auto" : 190,
      }}
      className="border"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          justifyContent: "start",
        }}
      >
        <Avatar sx={{ width: 45, height: 45 }}>
          <Skeleton variant="circular" width={45} height={45} />
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: 14,
            }}
          >
            <Skeleton variant="text" width={100} />
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontSize: 12 }}
          >
            <Skeleton variant="text" width={70} />
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            fontSize: 12,
            mt: 0,
          }}
        >
          <Rating
            name="read-only"
            value={3}
            readOnly
            size="small"
            sx={{ mr: 1, color: "gold", fontSize: 14 }}
          />
          <Skeleton variant="text" width={120} />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 13, mt: 2 }}>
          <Skeleton variant="text" width="100%" />
        </Typography>
      </Box>

      {showReplyes && (
        <Box
          sx={{
            mt: 2,
            p: 1,
            backgroundColor: "#ccc",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              justifyContent: "start",
            }}
          >
            <Avatar sx={{ width: 45, height: 45 }}>
              <Skeleton variant="circular" width={45} height={45} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 14,
                }}
              >
                <Skeleton variant="text" width={50} />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: 12 }}
              >
                <Skeleton variant="text" width={100} />
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: 12, mt: 1 }}>
              <Skeleton variant="text" width="80%" />
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default CommentCardOfStaySkeleton;
