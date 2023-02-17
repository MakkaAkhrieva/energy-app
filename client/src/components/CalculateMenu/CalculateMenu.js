import React, { useRef, useState } from "react";
import { Box, ButtonGroup, HStack, Input, Text } from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const CalculateMenu = ({
  centerAddress,
  selectedMarker,
  center,
  setDirectionsResponse,
  setIsCalculateRoute,
}) => {
  const destiantionRef = useRef();
  const originRef = useRef();

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const makeRoute = () => {
    window.location.href = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${selectedMarker.location.lat},${selectedMarker.location.lng}`;
  };

  function clearRoute() {
    originRef.current.value = "";
    destiantionRef.current.value = "";
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
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
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        zIndex="1"
        style={{ position: "absolute", width: "600px", top: 0, right: 0 }}
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Origin"
                ref={originRef}
                value={centerAddress}
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
                value={selectedMarker.address}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button type="submit" onClick={calculateRoute}>
              Calculate
            </Button>
            <Button onClick={clearRoute}>CLear</Button>
            <ClearIcon onClick={() => setIsCalculateRoute(false)} />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>{" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Route</p>
            <DirectionsCarIcon
              sx={{ color: "red" }}
              onClick={() => makeRoute()}
            />
          </div>
        </HStack>
      </Box>
    </>
  );
};
