import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import SkeltonRowTables from "../../../../../../components/SkeletonComponents/SkeltonRowTables";
import { useNavigate } from "react-router-dom";

export default function Requests({ isMobile, NoValue }) {
  const navigate = useNavigate();

  const reqList = [
    {
      title: "درخواست رزرو اقامتگاه اورامان",
      code: "3451202",
      time: "9:54 - 1403/02/04",
    },
    {
      title: "درخواست رزرو اقامتگاه محمدی",
      code: "3451202",
      time: "9:54 - 1403/02/04",
    },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box
        className="shadow borde rounded"
        sx={{ width: isMobile ? "100%" : "550px", position: "relative" }}
      >
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              // border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflowX: "auto",
              mt: 0,
            }}
          >
            <Table>
              {/* header */}
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#90a4ae",
                    }}
                    align="left"
                  >
                    نوع درخواست
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#90a4ae",
                    }}
                    align="center"
                  >
                    کد اقامتگاه
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#90a4ae",
                    }}
                    align="center"
                  >
                    زمان درخواست
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* body */}

              <TableBody>
                {reqList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <NoValue />
                    </TableCell>
                  </TableRow>
                ) : loading ? (
                  [1, 2, 3].map((_, index) => (
                    <SkeltonRowTables key={index} count={3} />
                  ))
                ) : (
                  reqList.map((req, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "inherit",
                      }}
                    >
                      <TableCell>{req.title}</TableCell>
                      <TableCell align="center">{req.code}</TableCell>
                      <TableCell align="center">{req.time}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              padding: "0rem .8rem",
              minWidth: 0,
              fontSize: "1.2rem",
              position: "absolute",
              bottom: "-1.2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
            onClick={() => {
              navigate("/pannel/requests");
            }}
          >
            +
          </Button>
        </>
      </Box>
    </>
  );
}
