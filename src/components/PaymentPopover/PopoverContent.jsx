import { Box, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import DirectPayment from "./DirectPayment";
import WalletPayment from "./WalletPayment";

export default function PopoverContent() {
  const [type, setType] = useState("wallet");
  return (
    <>
      <Box
        sx={{
          width: "450px",
          minHeight: "300px",
          padding: "2rem 3rem ",
          display: "flex",
          flexDirection: "column",
          gap:"1.5rem"
        }}
      >
        {/* buttons */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "fit-content",
            borderRadius: "30px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            minWidth: "280px",
            margin:"0 auto"
          }}
        >
          <Button
            sx={{
              width: "50%",
              padding: "10px 20px",
              borderRadius: "0",
              color: type === "wallet" ? "white" : "black",
              backgroundColor: type === "wallet" ? "primary.main" : "white",
            }}
            onClick={() => setType("wallet")}
          >
            پرداخت با کیف پول
          </Button>

         <Divider orientation="vertical" flexItem />

          <Button
            sx={{
              width: "50%",
              padding: "10px 20px",
              borderRadius: "0",
              color: type === "direct" ? "white" : "black",
              backgroundColor: type === "direct" ? "primary.main" : "white",
            }}
            onClick={() => setType("direct")}
          >
            پرداخت مستقیم
          </Button>
        </Box>

        <Box sx={{mt:1}}>
          {type === "wallet" && <WalletPayment />}
          {type === "direct" && <DirectPayment />}
        </Box>
      </Box>
    </>
  );
}
