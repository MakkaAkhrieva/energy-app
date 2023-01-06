import TextField from "@mui/material/TextField";
import styles from "./Login.module.css";
import imglogin3 from "./imglogin3.jpg";
import Button from "@mui/material/Button";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { Link, Navigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { store } = useContext(Context);

  if (store.isAuth) {
    return <Navigate to={"/"} />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (email && password) {
      store.login(email, password);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.input_wrapper}>
        <div style={{ display: "flex" }}>
          <EnergySavingsLeafIcon sx={{ color: "#0AB28B" }} />
          <p className={styles.logo}>ENERGY APP</p>
        </div>
        <h1 className={styles.h1}>Welcome Back!</h1>
        <p className={styles.text}>
          The all in one ultimate Website to help you manage everything.
        </p>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="big"
            sx={{
              marginBottom: "20px",
            }}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={emailError}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={passwordError}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0AB28B",
              marginTop: "78px",
              borderRadius: "30px",
              height: "60px",
              color: "white",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "22px",
            }}
            type="submit"
            /* onClick={() => store.login(email, password)} */
          >
            Log in
          </Button>
        </form>
        <p className={styles.p}>Don't have an account?</p>
        <Link to="/registration">
          <p className={styles.signup}>SIGN UP</p>
        </Link>
      </div>
      <div className={styles.card_wrapper}>
        <img src={imglogin3} alt="dsfdgs" className={styles.img} />
      </div>
    </div>
  );
};

export default observer(Login);
