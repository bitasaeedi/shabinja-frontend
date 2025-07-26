import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SkeltonRowTables from "../../../../../../components/SkeletonComponents/SkeltonRowTables";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const baseUrl = API_URL;

const RequestsSkeleton = ({ rows = 2 }) => (
  <>
    {[...Array(rows)].map((_, idx) => (
      <TableRow key={idx}>
        <TableCell>
          <Skeleton variant="text" width={100} />
        </TableCell>
        <TableCell align="center">
          <Skeleton variant="text" width={60} />
        </TableCell>
        <TableCell align="center">
          <Skeleton variant="text" width={80} />
        </TableCell>
        <TableCell align="center">
          <Skeleton variant="text" width={80} />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default function Requests({ isMobile, NoValue }) {
  const navigate = useNavigate();

  // const reqList = [
  //   {
  //     title: "درخواست رزرو اقامتگاه اورامان",
  //     code: "3451202",
  //     time: "9:54 - 1403/02/04",
  //   },
  //   {
  //     title: "درخواست رزرو اقامتگاه محمدی",
  //     code: "3451202",
  //     time: "9:54 - 1403/02/04",
  //   },
  // ];

  const [loading, setLoading] = useState(false);
  const [reqList, setReqList] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/HostTourOrder/DashboardList/0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log("req", response?.data?.data);
      setReqList(response?.data?.data);
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
      <Box
        className="shadow borde rounded"
        sx={{ width: isMobile ? "100%" : "100%", position: "relative" }}
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
                    کد رزرو
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
                {reqList?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <NoValue />
                    </TableCell>
                  </TableRow>
                ) : loading ? (
                  [1, 2].map((_, index) => (
                    <SkeltonRowTables key={index} count={4} />
                  ))
                ) : (
                  reqList?.slice(0, 2).map((req, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "inherit",
                      }}
                    >
                      <TableCell>{req.hostTourTitle}</TableCell>
                      <TableCell align="center">{req.hostTourId}</TableCell>
                      <TableCell align="center">{req.orderNumber}</TableCell>
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
              minWidth: 0,
              width: "35px",
              height: "35px",
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
            <OpenInNewIcon sx={{ fontSize: "1.1rem", color: "white" }} />
          </Button>
        </>
      </Box>
    </>
  );
}
