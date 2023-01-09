import React, { useRef, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styles from "./Map.module.css";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  styles: defaultTheme,
};

const Maps = ({ center }) => {
  const mapRef = useRef(undefined);
  const onLoad = useCallback(function callback(map) {
    mapRef.current = map; //ссылка на саму карту
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);
  return (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <Marker position={center}/>
      </GoogleMap>
    </div>
  );
};

export default Maps;
