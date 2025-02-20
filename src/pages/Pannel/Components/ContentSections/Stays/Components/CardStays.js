import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
const CardStays = ({ stay }) => {
  const handleDelete = () => {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={stay.Title}
        height="140"
        image={stay.image}
        sx={{ borderBottom: "1px solid #ddd" }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {stay.id}
          {/* {stay.Title} */}
        </Typography>
        <Typography
          color={stay.statusTourTitle === "تایید" ? "green" : "error"}
          sx={{ fontSize: "1rem", marginTop: 1 }}
        >
          {stay.statusTourTitle}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <Button
          component={Link}
          to={`/new-stay/${stay.guid}`}
          startIcon={<EditIcon />}
          color="primary"
          size="small"
        >
          ویرایش
        </Button>
        <Button
          onClick={() => handleDelete(stay.id)}
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
        >
          حذف
        </Button>
      </Box>
    </Card>
  );
};

export default CardStays;
