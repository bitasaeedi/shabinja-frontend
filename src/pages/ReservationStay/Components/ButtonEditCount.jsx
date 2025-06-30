import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material"; // Using icons for better UX
import { useContext } from "react";
import { ReservationStayContext } from "../ReservationStay";
import { useEffect } from "react";

const modalStyle = {
  position: "absolute",
  top: { xs: "70%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  width: { xs: "90%", sm: "400px" },
  outline: "none",
};

const ButtonEditCount = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { handleSetParams, paramsValues, infoOfStay } = useContext(
    ReservationStayContext
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  useEffect(() => {
    setCount(parseFloat(paramsValues?.count || 0));
  }, [paramsValues]);
  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ backgroundColor: "grey.100", color: "black" }}
      >
        ویرایش
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              تعداد نفرات
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Counter Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                انتخاب تعداد
              </Typography>
              <Typography
                variant="body2"
                color={count === 0 ? "text.disabled" : "text.primary"}
              >
                {count === 0 ? "مهم نیست" : `${count} نفر`}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                disabled={count >= infoOfStay?.maxCount}
                onClick={increment}
                sx={{
                  border: "1px solid",
                  borderColor: "grey.400",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Add fontSize="small" />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ minWidth: "40px", textAlign: "center" }}
              >
                {count}
              </Typography>
              <IconButton
                onClick={decrement}
                disabled={count <= 1}
                sx={{
                  border: "1px solid",
                  borderColor: count <= 0 ? "action.disabled" : "grey.400",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleClose}
              variant="text"
              color="inherit"
              sx={{ color: "text.secondary" }}
            >
              انصراف
            </Button>
            <Button
              onClick={() => {
                handleSetParams("count", count);
                handleClose();
              }}
              variant="contained"
              color="primary"
              disabled={count < 0}
            >
              تأیید
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ButtonEditCount;
