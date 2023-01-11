import React, { useRef, useCallback, useState } from "react";
import { GoogleMap, MarkerClusterer, MarkerF } from "@react-google-maps/api";
import styles from "./Map.module.css";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  styles: defaultTheme,
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const Maps = ({ center, mode, markers, onMarkerAdd }) => {
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

  const onClick = useCallback(
    (loc) => {
      //loc объет гугла с координатами
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        console.log({ lat, lng });
        onMarkerAdd({ lat, lng });
      }
    },
    [mode, onMarkerAdd]
  );
  return (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
      >
        <MarkerF onLoad={onLoadMarker} position={center} />
        {markers.map((pos) => {
          return <MarkerF position={pos} />;
        })}
      </GoogleMap>
    </div>
  );
};

export default Maps;