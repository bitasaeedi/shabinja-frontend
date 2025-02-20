import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CardActionArea,
  CardContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "سلام چطور می‌تونم کمکتون کنم؟", sender: "support" },
  ]);
  const messagesEndRef = useRef(null); // Ref برای اسکرول به آخرین پیام

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  // اسکرول به آخرین پیام هنگام تغییر در پیام‌ها
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "500px" },
        height: "500px",
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: { xs: 0, md: 3 },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          py: 2,
          bgcolor: "transparent",
          fontWeight: "bold",
          display: { xs: "none", md: "block" },
          // borderBottom: "1px solid #000",
        }}
        className="border-bottom"
      >
        ارسال پیام به پشتیبانی
      </Typography>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 0, md: 2 },
          py: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column", // نمایش پیام‌ها از پایین به بالا
          height: "calc(100% - 120px)", // ارتفاع ثابت برای بخش پیام‌ها
        }}
      >
        {/* Ref برای اسکرول به آخرین پیام */}

        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-start" : "flex-end",
              bgcolor: msg.sender === "user" ? "#e3f2fd" : "#ffeb3b",
              color: "black",
              p: 1.5,
              my: 0.5,
              borderRadius: 2,
              maxWidth: "75%",
              wordBreak: "break-word", // Ensures text wraps properly
              overflowWrap: "break-word", // Additional wrapping support
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Field */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          p: 1.5,
          // bgcolor: "#f5f5f5",
          borderTop: "1px solid #ddd",
          height: "auto", // Makes height flexible
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="متن پیام..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents new line
              sendMessage();
            }
          }}
          // focused
          // autoFocus
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              px: 1, // Adds inner spacing
              borderColor: "primary.main", // Ensure this is applied here
              "& fieldset": {
                borderColor: "primary.main", // Applies border color
              },
              "&:hover fieldset": {
                borderColor: "primary.dark", // Darker border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.dark", // Darker border when focused
              },
            },
            "& .MuiInputBase-root": {
              fontSize: "1rem",
            },
          }}
          multiline
          maxRows={4} // Allows more flexibility
        />
        <IconButton
          sx={{
            // bgcolor: "#ffeb3b",
            ml: 1,
            p: 1.2, // Slightly larger for better UX
            // "&:hover": { bgcolor: "#fbc02d" },
            transition: "background 0.3s ease",
          }}
          onClick={sendMessage}
        >
          <SendIcon
            sx={{ color: "primary.main", transform: "rotate(180deg)" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatComponent;
