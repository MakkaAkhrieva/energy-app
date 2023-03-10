import Maps from "../Map/Maps";
import { getBrowserLocation } from "../../utils/geo";
import { useCallback, useContext, useEffect, useState } from "react";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { MODES } from "../../components/Map/Maps";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "../../pages/Home/Home.module.css";
import { useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useHttp } from "../hooks/http.hook";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const defaultCenter = {
  lat: 60.9,
  lng: 27.5667,
};

const libraries = ["places"];

const MapContainer = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [centerAddress, setCenterAddress] = useState("");
  const { store } = useContext(Context);
  const [mode, setMode] = useState(MODES.MOVE);
  const [isBtnMarkerSelected, setIsBtnMarkerSelected] = useState(false);
  const { request } = useHttp();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("rus");

  const isAdmin = store.user.role === "admin";

  const isPut = localStorage.getItem("put");

  const _transformStations = (station) => {
    return {
      name: station.name,
      location: { lat: station.latitude, lng: station.longitude },
      address: `ул. ${station.street} ${station.house}, ${station.city} , Беларусь`,
      plugType: station.connectors[0].connectorName,
    };
  };

  useEffect(() => {
    store.getStations();
    async function fetchData() {
      const res = await request(
        `https://apigateway.malankabn.by/central-system/api/v1/locations/map/points?userId=768940c7-49e3-44fa-9959-bd2210e471e4&connectorMaxPower=350&",
          )`,
      );
      const data = res.map(_transformStations);
      data.map((station) => {
        const lat = station.location.lat;
        const lng = station.location.lng;
        store.addStation(station.name, { lat, lng }, station.address);
      });
    }
    !isPut && fetchData();

    localStorage.setItem("put", true);

  }, []);

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
  }, [mode]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  useEffect(() => {
    getBrowserLocation()
      .then((currentLocation) => {
        setCenter(currentLocation);
        Geocode.fromLatLng(currentLocation.lat, currentLocation.lng)
          .then(
            (response) => {
              const address = response.results[0].formatted_address;
              return address;
            },
            (error) => {
              console.error("error", error);
            },
          )
          .then((response) => {
            setCenterAddress(response);
          });
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <>
      <div>
        <div
          className={
            isAdmin
              ? styles.addressSearchContainer1
              : styles.addressSearchContainer2
          }
        >
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
            </>
          ) : null}
        </div>
        {isLoaded ? (
          <Maps
            center={center}
            mode={mode}
            centerAddress={centerAddress}
            setCenterAddress={setCenterAddress}
          />
        ) : (
          <p>Loading map</p>
        )}
      </div>
    </>
  );
};

export default observer(MapContainer);
