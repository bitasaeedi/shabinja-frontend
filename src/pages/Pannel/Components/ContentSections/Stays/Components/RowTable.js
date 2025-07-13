import {
  Avatar,
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import { HostDeleteOneApi } from "../../../../../../api/toureApis";
import { ContainerMainContext } from "../ContainerMain";
import ListIcon from "@mui/icons-material/List";

const RowTable = ({ stay, index }) => {
  const containerMainContext = useContext(ContainerMainContext);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDelete = async () => {
    setLoadingDelete(true);
    const result = await HostDeleteOneApi(stay?.guid);

    await containerMainContext.handleGetMyTour(true);
    setOpenConfirm(false);
    setLoadingDelete(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow
        key={stay.id}
        sx={{
          backgroundColor: index % 2 === 0 ? "#fafafa" : "inherit",
          transition: "background-color 0.3s",
          "& td": {
            border: "none",
          },
        }}
      >
        <TableCell align="left">
          {/* <Avatar
            src={stay.image}
            alt={stay.title}
            sx={{
              width: { xs: 30, sm: 40 },
              height: { xs: 30, sm: 40 },
              border: "1px solid #ddd",
            }}
          /> */}
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              // color: "#9e9e9e",
            }}
          >
            {stay.title}
          </Typography>
        </TableCell>
        <TableCell align="left">
          {/* <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            {stay.title}
          </Typography> */}
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              // color: "#9e9e9e",
            }}
          >
            {` ${stay.id}`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="body2"
              color={stay.statusTourTitle === "تایید" ? "green" : "error"}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                // backgroundColor:
                //   stay.statusTourTitle === "تایید" ? "#e8f5e9" : "#ffebee",
                // color: stay.statusTourTitle === "تایید" ? "#2e7d32" : "#c62828",
                borderRadius: "4px",
                padding: { xs: "2px 0px", sm: "4px 0px" },
                textAlign: "center",
                width: { xs: "70px", sm: "85px" },
              }}
            >
              {stay.statusTourTitle || "نامشخص"}
            </Typography>
          </Box>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "4px", sm: "8px" },
          }}
        >
          {/* Menu Icon */}
          <IconButton onClick={handleClick}>
            <ListIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            sx={{
              // min: 200, // Ensures fixed width
              "& .MuiPaper-root": {
                width: 180, // Ensures menu content follows width
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              component={Link}
              to={`/new-stay/${stay.guid}`}
              onClick={handleClose}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#333",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <EditIcon sx={{ mr: 1, fontSize: "18px", color: "#999" }} />
              ویرایش مشخصات
            </MenuItem>

            <MenuItem
              component={Link}
              to={`/edit-calendar/${stay.id}`}
              onClick={handleClose}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#333",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <EventIcon sx={{ mr: 1, fontSize: "18px", color: "#999" }} />
              تقویم نرخ
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                setOpenConfirm(true);
              }}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "error.main",
                "&:hover": { backgroundColor: "#fef0f0" },
              }}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <CircularProgress size={20} color="error" />
              ) : (
                <DeleteIcon sx={{ mr: 1, fontSize: "18px" }} />
              )}
              حذف اقامتگاه
            </MenuItem>
          </Menu>
        </TableCell>

      </TableRow>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا مطمئن هستید که می‌خواهید این اقامتگاه را حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            انصراف
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={loadingDelete}
          >
            {loadingDelete ? (
              <CircularProgress size={20} color="error" />
            ) : (
              "حذف"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RowTable;
