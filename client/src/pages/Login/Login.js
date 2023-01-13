import TextField from "@mui/material/TextField";
import styles from "./Login.module.css";
import imglogin3 from "./imglogin3.jpg";
import Button from "@mui/material/Button";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (store.isAuth && store.user.role === "admin") {
    return <Navigate to={"/admin"} />;
  } else if (store.isAuth) {
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
      store.login(email, password).then(() => {
        if (!!store.isError) {
          setOpen(true);
        }
      });
      setOpen(false);
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(!open)}
          >
            <Alert onClose={() => setOpen(!open)} severity="error">
              {store.isError}
            </Alert>
          </Snackbar>

          {store.isLoading ? (
            <LoadingButton
              loading={store.isLoading}
              loadingIndicator="Loading…"
              variant="outlined"
              sx={{
                backgroundColor: "#C9B8B8",
                marginTop: "78px",
                borderRadius: "30px",
                height: "60px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "22px",
              }}
            ></LoadingButton>
          ) : (
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
            >
              LOG IN
            </Button>
          )}
        </form>
        <p className={styles.p}>Don't have an account?</p>
        <Link to="/registration">
          <p className={styles.signup}>SIGN UP</p>
        </Link>
        <button onClick={goBack}>Go back</button>
      </div>
      <div className={styles.card_wrapper}>
        <img src={imglogin3} alt="dsfdgs" className={styles.img} />
      </div>
    </div>
  );
};

export default observer(Login);
