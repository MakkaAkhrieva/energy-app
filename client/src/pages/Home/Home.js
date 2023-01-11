import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import LoginForm from "../../components/LoginForm";
import { observer } from "mobx-react-lite";
import UserService from "../../services/UserService";
import Header from "../../components/Header.js";
import Container from "@mui/material/Container";
import React from "react";
import Maps from "../../components/Map/Maps";
import { MODES } from "../../components/Map/Maps";
import { useJsApiLoader } from "@react-google-maps/api";
import styles from "./Home.module.css";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { getBrowserLocation } from "../../utils/geo";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(GOOGLE_API_KEY);

const defaultCenter = {
  lat: 60.9,
  lng: 27.5667,
};

const libraries = ["places"];
const Home = () => {
  const [center, setCenter] = useState(defaultCenter);
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState(MODES.MOVE);
  const [isBtnMarkerSelected, setIsBtnMarkerSelected] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

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

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка.....</div>;
  }
  console.log("center", center);

  if (!store.isAuth) {
    return (
      <div>
        <Header />
        <Container>
          <LoginForm />
          <div className={styles.addressSearchContainer}>
            <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
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
        </Container>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <h1>
          {store.isAuth
            ? `Пользователь авторизован ${store.user.email}`
            : "АВТОРИЗУЙСЯ"}
        </h1>

        <h1>
          {store.user.isActivated
            ? "Акаунт подтвержден по почте"
            : "Подтвердите акаунт"}
        </h1>
        <button onClick={() => store.logout()}>Выйти из акаунта</button>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map((user) => {
          return <div key={user.email}>{user.email}</div>;
        })}
      </Container>
    </>
  );
};

export default observer(Home);
