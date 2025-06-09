import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import React from "react";
import { CircularProgress } from "@mui/material";

const Button1 = styled(Button)(({ theme }) => ({
  backgroundColor: "#287dfa",
  fontSize: "16px",
  margin: "4px 0",
  padding: "8px 0",
  width: "110px",
  "&:hover": {
    backgroundColor: "#287cfacc",
  },
}));

export default function CustomButton({ loading, handleChange }) {
  return (
    <>
      <Button1 variant="contained" onClick={() => handleChange()}>
        {loading ? (
          <>
            <CircularProgress
              size={20}
              sx={{
                color: "white",
                marginRight: "8px",
              }}
            />
          </>
        ) : (
          "ثبت تغییرات"
        )}
      </Button1>
    </>
  );
}
