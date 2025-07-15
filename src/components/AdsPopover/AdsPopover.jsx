import React, { useEffect, useState } from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import adImage from "../../assest/images/adsbg.png";

const AdsPopover = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const anchorEl = null; // TODO: add anchorEl

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000); // 10 ثانیه (10000 میلی‌ثانیه)

    return () => clearTimeout(timer); // پاک کردن تایمر در صورت unmount شدن
  }, []);

  return (
    <>
      <Popover
        open={Boolean(open)}
        // anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            mt: { xs: "0", sm: "20" },
            zIndex: 2000,
            position:{xs:"unset", sm:"absolute"},
            maxHeight:"100%",
            maxWidth:"100%"
          },
        }}
        
      >
        <Box
          sx={{
            width: { xs: "100vw", sm: "700px" },
            height: { xs: "100vh", sm: "300px" },
            backgroundImage: `url(${adImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* close icon */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <CloseIcon
              onClick={() => {
                setOpen(false);
              }}
              sx={{
                color: "white",
                position: "absolute",
                top: { xs: 20, sm: 10 },
                right: { xs: 20, sm: 10 },
                cursor: "pointer",
                width: { xs: "30px", sm: "20px" },
                height: { xs: "30px", sm: "20px" },
                zIndex: 4000,
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
              padding: { xs: "60px 0 20px", sm: "0 25px" },
            }}
          >
            {/* text */}
            <Box
              sx={{
                width: { xs: "100%", sm: "60%" },
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: 7, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                fontSize={{ xs: 26, sm: 30 }}
                fontWeight={700}
              >
                رایگان میزبان شو!
              </Typography>
              <Typography
                variant="body1"
                fontSize={{ xs: 15, sm: 17 }}
                fontWeight={500}
                mt={{ xs: 2, sm: 3 }}
              >
                "در "شبینجا"، میزبان بودن یعنی راحتی، امنیت و درآمد بیشتر!"
              </Typography>
              <Button
                variant="contained"
                color="black"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  mt: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  padding: { xs: "8px 40px", sm: "10px 60px" },
                  fontSize: { xs: 14, sm: 16 },
                  fontWeight: 800,
                }}
              >
                بیشتر بدانید
              </Button>
            </Box>

            {/* image */}
            <Box
              component="img"
              src={require("../../assest/images/ad.png")}
              alt="ads"
              sx={{
                width: { xs: "250px", sm: "235px" },
                height: { xs: "250px", sm: "235px" },
              }}
            />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default AdsPopover;
