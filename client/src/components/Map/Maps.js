import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { GoogleMap, MarkerClusterer, MarkerF } from "@react-google-maps/api";
import styles from "./Map.module.css";
import { Context } from "../../index.js";
import { defaultTheme } from "./Theme";
import MapService from "../../services/MapService";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

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
  const { store } = useContext(Context);
  /* const [stations, setStations] = useState([]); */
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

  /* const addStation = (e) => {
    e.preventDefault();
    store.addStation((name = "name"), location).then(() => {
      if (store.isError) {
        alert(store.isError);
      } else {
        alert("Added");
      }
    });
  }; */

  useEffect(() => {
    store.getStations();
    console.log("store.stations", toJS(store.stations));
  }, []);

  const onClick = useCallback(
    (loc) => {
      //loc объет гугла с координатами
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        console.log({ lat, lng });
        const name = "name";
        store.addStation(name, { lat, lng }).then(() => {
          if (store.isError) {
            alert(store.isError);
          } else {
            alert("Added");
          }
        });
      }
    },
    [mode, onMarkerAdd]
  );

  console.log("storeSTations", toJS(store.stations));
  return (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
      >
        <MarkerF
          onLoad={onLoadMarker}
          position={center}
          icon={{
            url: "/person_pin_circle.svg",
            fillColor: "#0AB28B",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "#C9B8B8",
            strokeWeight: 2,
          }}
        />
        {markers.map((pos) => {
          console.log("pos2", pos);
          return <MarkerF position={pos} />;
        })}
        {store.stations.map((pos) => {
          console.log("pos", toJS(pos));
          return (
            <React.Fragment key={pos._id}>
              <MarkerF position={pos.location} />
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default observer(Maps);
