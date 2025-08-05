import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, Typography, Grid } from "@mui/material";

// bank images
import BankMellat from "./BankImages/nody-آرم-بانک-ملت-png-1677068111-removebg-preview.png";
import BankSaderat from "./BankImages/همراه-بانک-صادرات-ایران-آیفون-removebg-preview.png";
import BankSaman from "./BankImages/لوگو-بانک-سامان-removebg-preview.png";

const BankList = [
  {
    name: "بانک ملت",
    image: BankMellat,
  },
  {
    name: "بانک صادرات",
    image: BankSaderat,
  },
  {
    name: "بانک سامان",
    image: BankSaman,
  },
];
export default function DirectPayment() {
  return (
    <>
      <Box>
        <Grid container spacing={2} sx={{ width: "250px", margin: "0 auto" }}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ fontSize: "14px" }} variant="body1">
              درگاه بانکی مورد نظر خود را انتخاب کنید
            </Typography>
          </Grid>
          {BankList.map((bank, index) => (
            <Grid item xs={6} md={6} key={index}>
              <Box
                sx={{
                  width: "90px",
                  height: "100%",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                  padding: "10px 15px",
                  cursor: "pointer",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={bank.image}
                  alt={bank.name}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
