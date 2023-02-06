import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Header from "../Header";
import car from "./car.png";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";

const Profile = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Загрузка.....</div>;
  }
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        minWidth={false}
        sx={{ width: "90%", marginTop: "50px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>{`Hi,${store.user.name + " " + store.user.surname}`}</p>
          <img src={car} alt="car" style={{ height: "15rem" }} />
        </div>
      </Container>
    </>
  );
};

export default observer(Profile);
