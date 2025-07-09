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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SkeltonRowTables from "../../../../../../components/SkeletonComponents/SkeltonRowTables";
import { useEffect } from "react";
import API_URL from "../../../../../../config/apiConfig";
import axios from "axios";
import moment from "moment-jalaali";
const baseUrl = API_URL;

// const stayList = [
//   {
//     stay: "اقامتگاه اورامان",
//     code: "3451202",
//     guest: "محمد محمدی",
//     info: "سلام، ساعت ورود ...",
//     startDate: "1404/01/01",
//     endDate: "1404/01/05",
//   },
//   {
//     stay: "اقامتگاه اورامان",
//     code: "3451202",
//     guest: "محمد محمدی",
//     info: "سلام، ساعت ورود ...",
//     startDate: "1404/01/01",
//     endDate: "1404/01/05",
//   },
// ];

export default function FutureBooking({ isMobile, NoValue }) {
  const [loading, setLoading] = useState(false);
  const [stayList, setStayList] = useState();
  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/HostTourOrder/DashboardList/3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      console.log("req", response?.data?.data);
      setStayList(response?.data?.data);
    } catch (error) {
      console.error(error?.response);

      return error?.response;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontSize: "16px",
          mb: 1,
          textAlign: isMobile ? "left" : "center",
        }}
      >
        رزرو های آینده
      </Typography>
      <Box
        className="shadow borde rounded"
        sx={{ width: "100%", position: "relative" }}
      >
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
                  اقامتگاه
                </TableCell>
                <TableCell
                  sx={{
                    color: "#90a4ae",
                  }}
                  align="center"
                >
                  کد رزرو
                </TableCell>
                <TableCell
                  sx={{
                    color: "#90a4ae",
                  }}
                  align="center"
                >
                  مهمان
                </TableCell>
                <TableCell
                  sx={{
                    color: "#90a4ae",
                  }}
                  align="center"
                >
                  توضیحات رزرو
                </TableCell>
                <TableCell
                  sx={{
                    color: "#90a4ae",
                  }}
                  align="center"
                >
                  تاریخ ورود
                </TableCell>
                <TableCell
                  sx={{
                    color: "#90a4ae",
                  }}
                  align="center"
                >
                  تاریخ خروج
                </TableCell>
              </TableRow>
            </TableHead>

            {/* body */}

            <TableBody>
              {loading ? (
                [1, 2, ].map((_, index) => (
                  <SkeltonRowTables key={index} count={6} />
                ))
              ) : stayList?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <NoValue />
                  </TableCell>
                </TableRow>
              ) : (
                stayList?.slice(0,2).map((stay, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "inherit",
                    }}
                  >
                    <TableCell>{stay.hostTourTitle}</TableCell>
                    <TableCell align="center">{stay.orderNumber}</TableCell>
                    <TableCell align="center">
                      {stay.fullName ? stay.fullName : stay.userFullName}
                    </TableCell>
                    <TableCell align="center">{stay.info}</TableCell>
                    <TableCell align="center">{moment(stay.start).format("jYYYY/jMM/jDD")}</TableCell>
                    <TableCell align="center">{moment(stay.end).format("jYYYY/jMM/jDD")}</TableCell>
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
        >
          +
        </Button>
      </Box>
    </>
  );
}
