import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  Collapse,
  Skeleton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GetOtherItemTourList } from "../../../../../api/PublicApis";
import { StayPageContext } from "../../../StayPage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const OtherItems = () => {
  const [otherItemsList, setOtherItemsList] = useState([]);
  const [allEmkanat, setAllEmakant] = useState([]);
  const [expanded, setExpanded] = useState(false); // Controls Collapse
  const [loading, setLoading] = useState(true); // Loading state

  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    handleGetAllItems();
    const textList = stayPageContext.infoOfStay?.otherItemTourIds || "";
    const list = textList.split(",");
    setOtherItemsList(list);
  }, [stayPageContext.infoOfStay]);

  const handleGetAllItems = async () => {
    try {
      const result = await GetOtherItemTourList();
      setAllEmakant(result?.data || []);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Stop loading even in case of error
    }
  };

  // Sort items: Show included ones first
  const sortedItems = [...allEmkanat].sort((a, b) => {
    const aIncluded = otherItemsList.includes(a.title.toString());
    const bIncluded = otherItemsList.includes(b.title.toString());
    return bIncluded - aIncluded;
  });

  return (
    <Box sx={{ width: "100%",  pt: 2 }}>
      {/* Title with a Divider */}
      <Divider sx={{ my: 1, bgcolor: "#ddd" }} />
      <Typography variant="h6" sx={{ fontSize: { xs: 18, md: 20 } }}>
        امکانات
      </Typography>

      {/* Skeleton Loading for List Items */}
      {loading || stayPageContext?.loading ? (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Collapse in={expanded} collapsedSize={350}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {sortedItems.map((item, index) => {
              const isIncluded = otherItemsList.includes(item.title.toString());
              return (
                <Grid item xs={6} md={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      opacity: isIncluded ? 1 : 0.5,
                      color: isIncluded ? "text.primary" : "text.secondary",
                    }}
                  >
                    {isIncluded ? (
                      <CheckCircleIcon
                        sx={{ color: "green", fontSize: { xs: 16, md: 20 } }}
                      />
                    ) : (
                      <RemoveCircleOutlineIcon
                        sx={{ color: "#bbb", fontSize: { xs: 16, md: 20 } }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: 12, md: 16 },
                        textDecoration: isIncluded ? "none" : "line-through",
                      }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Collapse>
      )}

      {/* Toggle Button */}
      {sortedItems.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setExpanded(!expanded)}
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: 2,
              fontSize: 14,
              px: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            className="shadow-sm"
          >
            {expanded ? (
              <>
                بستن <ExpandLessIcon sx={{ ml: 1 }} />
              </>
            ) : (
              <>
                بیشتر <ExpandMoreIcon sx={{ ml: 1 }} />
              </>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OtherItems;
