import React, { useContext, useState } from "react";

import { Context } from "../../index";
import { observer } from "mobx-react-lite";

import { Navigate } from "react-router-dom";
import imglogin3 from "./imglogin3.jpg";

import styles from "./Registration.module.css";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.js";

const Registration = () => {
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  if (store.isAuth) {
    return <Navigate to={"/"} />;
  }
  const handleSubmit = (values) => {
    store
      .registration(
        values.email,
        values.password,
        values.name,
        values.surname,
        values.phone
      )
      .then(() => {
        if (store.isError) {
          setOpen(true);
        }
      });
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.input_wrapper}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EnergySavingsLeafIcon sx={{ color: "#0AB28B" }} />
          <p className={styles.logo}>ENERGY APP</p>
        </div>
        <RegistrationForm
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
        />
        <div
          onClick={goBack}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginTop: "30px",
          }}
        >
          <KeyboardBackspaceIcon />
          <p>Go back</p>
        </div>
      </div>

      <div className={styles.card_wrapper}>
        <img src={imglogin3} alt={imglogin3} className={styles.img} />
      </div>
    </div>
  );
};

export default observer(Registration);
