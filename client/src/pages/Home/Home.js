import { useContext, useState } from "react";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import UserService from "../../services/UserService";
import Header from "../../components/Header.js";
import Container from "@mui/material/Container";
import React from "react";
import styles from "./Home.module.css";
import MapContainer from "../../components/MapContainer/MapContainer";
import AdminLocationBoard from "../../components/AdminLocationBoard/AdminLocationBord";

const Home = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  const isAdmin = store.user.role === "admin";

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

  if (!store.isAuth) {
    return (
      <div>
        <Header />
        <Container maxWidth={false} sx={{ width: "90%", marginTop: "50px" }}>
          <MapContainer />
        </Container>
      </div>
    );
  }

  return (
    <>
      <Header />
      {isAdmin ? (
        <Container
          maxWidth={false}
          minWidth={false}
          sx={{ width: "90%", marginTop: "50px" }}
        >
          <div className={styles.container1}>
            <MapContainer />
            <AdminLocationBoard />
          </div>

          {isAdmin ? (
            <>
              <button onClick={getUsers}>Получить пользователей</button>
              {users.map((user) => {
                return <div key={user.email}>{user.email}</div>;
              })}
            </>
          ) : null}
        </Container>
      ) : (
        <Container maxWidth={false} sx={{ width: "90%", marginTop: "50px" }}>
          <div className={styles.container2}>
            <MapContainer />
          </div>
        </Container>
      )}
    </>
  );
};

export default observer(Home);
