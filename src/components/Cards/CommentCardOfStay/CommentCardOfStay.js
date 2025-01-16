import React from "react";
import { Card, Avatar, Typography, Rating } from "@mui/material";
import { Box } from "@mui/system";

const CommentCardOfStay = ({ item, showReplyes, index }) => {
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 0,
        minHeight: 190,
        maxHeight: showReplyes ? "auto" : 190,
        // height: 190,
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
        <Avatar sx={{ width: 45, height: 45, fontSize: 16 }}>ح</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            //   fontWeight="bold"
            sx={{
              fontSize: 14,
            }}
          >
            حسین
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontSize: 12 }}
          >
            اقامت 3 روز پیش
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
            value={index + 1 || 5}
            readOnly
            size="small"
            sx={{ mr: 1, color: index < 5 ? "gold" : "gold", fontSize: 14 }}
          />
          <span>۱ شب اقامت در اقامتگاه</span>
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 13, mt: 2 }}>
          فقط میتونم بگم یه کارت پستال بی نظیر بود. از میزبان بزرگوار بخاطر
          فراهم همچین ویلای بسیار تمیز و بی نظیری تشکر میکنم فقط .سیستم گرمایش
          مناسب نبود و فضا سرد بود سیستم tv مشکل داشت و تمیزی تختخواب قابل پسند
          نبود
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
            <Avatar
              sx={{
                width: 45,
                height: 45,
                fontSize: 16,
                // background: "linear-gradient(135deg, #287dfa, #6a11cb)",
              }}
            >
              ر
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                //   fontWeight="bold"
                sx={{
                  fontSize: 14,
                }}
              >
                رضا
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: 12 }}
              >
                پاسخ میزبان
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: 12, mt: 1 }}>
              خودتون عالی هستید که اقامتگاه خودتون رو انتخاب کردید به امید دیدار
              مجدد شما مهمان عزیز هوا واقعا سرده و ما علاوه بر شوفاژ ساختمان
              بخاری برقی هم تهیه کردیم برای مهمان های عزیز ،رو تختی ها هر روز
              عوض میشه اصلا نگران نباشید
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default CommentCardOfStay;
