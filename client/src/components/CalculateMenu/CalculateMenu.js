import React, { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const CalculateMenu = ({
  centerAddress,
  selectedMarker,
  center,
  setDirectionsResponse,
  setIsCalculateRoute,
}) => {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [origin, setOrigin] = useState(`${centerAddress}`);
  const [destination, setDestintion] = useState(`${selectedMarker.address}`);

  const makeRoute = () => {
    window.location.href = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${selectedMarker.location.lat},${selectedMarker.location.lng}`;
  };

  useEffect(() => {
    setOrigin(`${centerAddress}`);
    setDestintion(`${selectedMarker.address}`);
  }, [centerAddress, selectedMarker.address]);

  function clearRoute() {
    setOrigin("");
    setDestintion("");

    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  async function calculateRoute() {
    if (origin === "" || destination === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        zIndex="1"
        style={{
          position: "absolute",
          width: "500px",
          top: 0,
          right: 0,
          backgroundColor: "white",
          border: "solid 1px rgb(0 0 0 / 10%)",
          boxShadow: "rgb(0 0 0 / 50%) 0px 12px 30px",
          padding: "7px",
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 2, sm: 2, md: 8 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Autocomplete>
              <TextField
                sx={{ width: "90%" }}
                type="text"
                placeholder="Origin"
                variant="standard"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Autocomplete>
              <TextField
                sx={{ width: "90%" }}
                type="text"
                placeholder="Destination"
                variant="standard"
                onChange={(e) => setDestintion(e.target.value)}
                value={destination}
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <p>Distance: {distance}</p>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <p>Duration: {duration}</p>
          </Grid>
          <Grid item xs={2} sm={4} md={8}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="submit" onClick={calculateRoute}>
                Calculate
              </Button>
              <Button onClick={clearRoute}>CLear</Button>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => makeRoute()}
              >
                <Button>Route</Button>
                <DirectionsCarIcon sx={{ color: "red" }} />
              </div>
              <Button onClick={() => setIsCalculateRoute(false)}>Close</Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
