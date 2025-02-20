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
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import { ContainerMainContext } from "../ContainerMain";
import ListIcon from "@mui/icons-material/List";

const RowTable = ({ stay, index }) => {
  const containerMainContext = useContext(ContainerMainContext);

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
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              // color: "#9e9e9e",
            }}
          >
            {stay.title || "برداشت از کیف پول"}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="body2"
              color={stay.statusTourTitle === "تایید" ? "green" : "error"}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                backgroundColor:
                  stay.statusTourTitle === "تایید" ? "#e8f5e9" : "#ffebee",
                color: stay.statusTourTitle === "تایید" ? "#2e7d32" : "#c62828",
                borderRadius: "4px",
                padding: { xs: "2px 0px", sm: "4px 0px" },
                textAlign: "center",
                width: { xs: "70px", sm: "85px" },
              }}
            >
              {stay.statusTourTitle || "ناموفق"}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            12،000 تومان
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            158784991246
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            1403/12/23
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            12:25
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowTable;
