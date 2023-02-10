import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../components/storyBook/input/input";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import imglogin3 from "./imglogin3.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import styles from "./Login.module.css";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Login = () => {
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (store.isAuth) {
    return <Navigate to={"/"} />;
  }
  const handleSubmit = (values) => {
    store.login(values.email, values.password).then(() => {
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

        <h1 className={styles.h1}>Welcome Back!</h1>
        <p className={styles.text}>
          The all in one ultimate Website to help you manage everything.
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MyTextInput
              label="email"
              name="email"
              type="email"
              placeholder="email"
              variant="outlined"
              style={{ marginTop: "20px" }}
            />
            <MyTextInput
              label="password"
              name="password"
              type="password"
              placeholder="password"
              variant="outlined"
              style={{ marginTop: "20px" }}
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
          </Form>
        </Formik>
        <p className={styles.p}>Don't have an account?</p>
        <Link to="/registration">
          <p className={styles.signup}>SIGN UP</p>
        </Link>
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

export default observer(Login);
