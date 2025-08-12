import {
  Box,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ContainerMainContext } from "../ContainerMain";
import moment from "moment-jalaali";

const RowTable = ({ stay, index }) => {
  const containerMainContext = useContext(ContainerMainContext);


  function shamsiDate(date) {
    return  moment(date).locale('fa').format('jYYYY/jMM/jDD');
  }

  function getTime(time) {
    return  moment(time).format('HH:mm');
  }

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
        {/* title */}
        {stay?.typeCostDisplay &&
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              // color: "#9e9e9e",
            }}
          >
            {stay?.typeCostDisplay || ""}
          </Typography>
        </TableCell>}

        {/* status */}
        {/* <TableCell align="center">
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
        </TableCell> */}

        {/* price */}
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            {Math.abs(stay?.price)?.toLocaleString() || ""} تومان
          </Typography>
        </TableCell>

        {/* code */}
        {stay?.code &&
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
          { stay?.code || ""}
          </Typography>
        </TableCell>}

        {/* date */}
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            {shamsiDate(stay?.created) || ""}
          </Typography>
        </TableCell>

        {/* time */}
        <TableCell align="left">
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            {getTime(stay?.created) || ""}
          </Typography>
        </TableCell>

      </TableRow>
    </>
  );
};

export default RowTable;
