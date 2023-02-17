import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function MapsInfoWindow({
  name,
  location,
  address,
  setIsMenuOpen,
  center,
}) {
  const makeRoute = () => {
    window.location.href = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${location.lat},${location.lng}`;
  };
  return (
    <Card
      sx={{
        minWidth: "360px",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        boxShadow: "rgb(0 0 0 / 50%) 0px 12px 30px",
        padding: 0,
      }}
    >
      <CardMedia
        component="img"
        image="https://www.ic.gc.ca/eic/site/mc-mc.nsf/vwimages/CarStation.PNG/$file/CarStation.PNG"
        alt="Paella dish"
        style={{ height: "90px" }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Typography>Name:{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <div style={{ dispay: "flex" }}>
          <Button onClick={() => setIsMenuOpen(true)}>More</Button>
          <Button onClick={() => makeRoute()}>Route</Button>
        </div>
      </CardContent>
    </Card>
  );
}
