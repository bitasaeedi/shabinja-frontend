import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogAskQuestion = ({
  handleClose,
  handleConfirm,
  openConfirm,
  title,
  question,
  confirmText,
}) => {
  return (
    <Dialog open={openConfirm} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {question || "آیا اطمینان دارید؟"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          انصراف
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          autoFocus
          // disabled={loadingDelete}
        >
          {confirmText || "تایید"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAskQuestion;
