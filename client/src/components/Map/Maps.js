import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import styles from "./Map.module.css";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import MapsInfoWindow from "../MapsInfoWindow/MapsInfoWindow";
import MapInfoMenu from "../MapInfoMenu/MapInfoMenu";
import Geocode from "react-geocode";
import { CalculateMenu } from "../CalculateMenu/CalculateMenu";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const Maps = ({ center, mode, centerAddress, setCenterAddress }) => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("rus");
  const { store } = useContext(Context);
  const isAdmin = store.user.role === "admin";

  const [selectedMarker, setSelectedMarker] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculateRoute, setIsCalculateRoute] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map; //ссылка на саму карту
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);
  const onLoadMarker = (marker) => {
    console.log("marker: ", marker);
  };

  useEffect(() => {
    store.getStations();
  }, []);

  const onClick = useCallback(
    async (loc) => {
      //loc объет гугла с координатами
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        const name = "name";
        const convertFromCoodinatesToAddress = await Geocode.fromLatLng(
          lat,
          lng
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            return address;
          },
          (error) => {
            console.error(error);
          }
        );
        store
          .addStation(name, { lat, lng }, convertFromCoodinatesToAddress)
          .then(() => {
            if (store.isError) {
              alert(store.isError);
            } else {
              alert("Added");
            }
          });
      }
    },
    [mode]
  );

  return (
    <div className={isAdmin ? styles.container1 : styles.container2}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        <Marker
          onLoad={onLoadMarker}
          position={center}
          icon={{
            url: "/person_pin_circle.svg",
            fillColor: "#0AB28B",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "#0AB28B",
            strokeWeight: 2,
          }}
        />
        {store.stations.map((pos) => {
          return (
            <React.Fragment key={pos._id}>
              {
                <Marker
                  icon={
                    selectedMarker.address === pos.address
                      ? {
                          url: "/pin.svg",
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: "#C9B8B8",
                          strokeWeight: 2,
                        }
                      : null
                  }
                  position={pos.location}
                  onClick={() => {
                    setSelectedMarker(pos);
                  }}
                />
              }
            </React.Fragment>
          );
        })}
        {selectedMarker && !isMenuOpen && (
          <InfoWindow
            position={selectedMarker.location}
            onCloseClick={() => {
              setSelectedMarker("");
            }}
          >
            <MapsInfoWindow
              name={selectedMarker.name}
              location={selectedMarker.location}
              address={selectedMarker.address}
              setIsMenuOpen={setIsMenuOpen}
              center={center}
            />
          </InfoWindow>
        )}

        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      {isMenuOpen && (
        <MapInfoMenu
          setIsMenuOpen={setIsMenuOpen}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          center={center}
          setIsCalculateRoute={setIsCalculateRoute}
        />
      )}

      {isCalculateRoute && (
        <CalculateMenu
          centerAddress={centerAddress}
          selectedMarker={selectedMarker}
          center={center}
          setIsCalculateRoute={setIsCalculateRoute}
          setDirectionsResponse={setDirectionsResponse}
          setCenterAddress={setCenterAddress}
        />
      )}
    </div>
  );
};

export default observer(Maps);
