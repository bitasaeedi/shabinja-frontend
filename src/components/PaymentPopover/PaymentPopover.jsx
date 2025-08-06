import { Box, Popover, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PopoverContent from "./PopoverContent";
import { ReservationStayContext } from "../../pages/ReservationStay/ReservationStay";
import { useContext } from "react";

export default function PaymentPopover({ isOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {handleClosePopover} = useContext(ReservationStayContext);

  return (
    <>
      {isMobile ? (
        // mobile
        <SwipeableDrawer
          anchor="bottom"
          open={isOpen}
          onClose={()=>{handleClosePopover()}}
          onOpen={() => {}} // Optional: Add logic if needed when opening
          PaperProps={{
            sx: {
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px 12px 0 0",
              backgroundColor: "#ffff",
              paddingBottom: ".5rem",
            },
          }}
        >
          {/* Fixed Header */}
          <Box
            sx={{
              padding: "21px 16px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f1f1f1",
                width: "50px",
                height: "8px",
                borderRadius: "20%",
              }}
            ></Box>
          </Box>
          <PopoverContent/>
        </SwipeableDrawer>
      ) : (
        // desktop
        <>
          <Popover
            open={isOpen}
            anchorEl={null}
            onClose={() => {handleClosePopover()}}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                mt: 10,
                zIndex: 2000,
                padding: "10px 20px",
              },
            }}
          >
            <PopoverContent/>
          </Popover>
        </>
      )}
    </>
  );
}
