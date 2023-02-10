import Container from "@mui/material/Container";
import Maps from "../Map/Maps";
import { getBrowserLocation } from "../../utils/geo";
import { useCallback, useContext, useEffect, useState } from "react";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { MODES } from "../../components/Map/Maps";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "../../pages/Home/Home.module.css";
import { useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(GOOGLE_API_KEY);

const defaultCenter = {
  lat: 60.9,
  lng: 27.5667,
};

const libraries = ["places"];

const MapContainer = () => {
  const [center, setCenter] = useState(defaultCenter);
  const { store } = useContext(Context);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState(MODES.MOVE);
  const [isBtnMarkerSelected, setIsBtnMarkerSelected] = useState(false);

  const isAdmin = store.user.role === "admin";

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        setIsBtnMarkerSelected(true);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        setIsBtnMarkerSelected(false);
        break;
      default:
        setMode(MODES.MOVE);
        setIsBtnMarkerSelected(false);
    }
    console.log(mode);
  }, [mode]);

  const clear = useCallback(() => {
    setMarkers([]);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates]);
  };
  console.log("Markers", markers);
/*   useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []); */

  useEffect(() => {
    getBrowserLocation()
      .then((currentLocation) => {
        console.log("getCurrentLocation", currentLocation);
        setCenter(currentLocation);
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <>
      <div >
        <div className={styles.addressSearchContainer}>
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
          {isAdmin ? (
            <>
              <button
                className={
                  isBtnMarkerSelected ? styles.selected : styles.modeToggle
                }
                onClick={toggleMode}
              >
                Set markers
              </button>
              <button className={styles.modeToggle} onClick={clear}>
                Clear markers
              </button>
            </>
          ) : null}
        </div>
        {isLoaded ? (
          <Maps
            center={center}
            mode={mode}
            markers={markers}
            onMarkerAdd={onMarkerAdd}
          />
        ) : (
          <p>Loading map</p>
        )}
      </div>
    </>
  );
};

export default observer(MapContainer);
