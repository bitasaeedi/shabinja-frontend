import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

const CustomModal = ({
  open,
  handleClose,
  title,
  children,
  size,
  scrollType,
}) => {
  return (
    <Dialog
      fullWidth={true} // Make it take the full width
      maxWidth={size || "lg"}
      scroll={scrollType || "body"} //paper
      open={open}
      onClose={handleClose}
      // style={{ zIndex: 2000 }}
    >
      {/* {title && <DialogTitle className="bg-info">{title}</DialogTitle>} */}
      {title && (
        <DialogTitle className="bg-info">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose} // Call the onClose function passed as a prop
            aria-label="close"
            style={{ position: "absolute", left: 10 }} // Positioning the button
          >
            <CloseIcon />
          </IconButton>
          {title}
        </DialogTitle>
      )}
      <div className=" mt-0 pt-0">
        <DialogContent className="m-0 p-0 w-100">{children}</DialogContent>
      </div>
    </Dialog>
  );
};

export default CustomModal;
