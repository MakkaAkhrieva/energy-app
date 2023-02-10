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
        {/* <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            surname: "",
            phone: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            surname: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
            phone: Yup.string()
              .required("Required")
              .matches(phoneRegExp, "Phone number is not valid"),
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
            <MyTextInput
              label="name"
              name="name"
              type="text"
              placeholder="name"
              variant="outlined"
              style={{ marginTop: "20px" }}
            />
            <MyTextInput
              label="surname"
              name="surname"
              type="text"
              placeholder="surname"
              variant="outlined"
              style={{ marginTop: "20px" }}
            />
            <MyTextInput
              label="phone"
              name="phone"
              type="phone"
              placeholder="phone"
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
                SIGN UP
              </Button>
            )}
          </Form>
        </Formik> */}
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
