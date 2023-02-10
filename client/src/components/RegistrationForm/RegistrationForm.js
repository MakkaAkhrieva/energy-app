import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../components/storyBook/input/input";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";

const RegistrationForm = ({
  handleSubmit,
  open = false,
  setOpen = false,
  isEdit = false,
}) => {
  const { store } = useContext(Context);
  const phoneRegExp =
    /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5})/;
  return (
    <Formik
      initialValues={
        isEdit
          ? {
              email: isEdit ? `${store.user.email}` : "",
              name: isEdit ? `${store.user.name}` : "",
              surname: isEdit ? `${store.user.surname}` : "",
              phone: isEdit ? `${store.user.phone}` : "",
            }
          : {
              email: isEdit ? `${store.user.email}` : "",
              password: "",
              name: isEdit ? `${store.user.name}` : "",
              surname: isEdit ? `${store.user.surname}` : "",
              phone: isEdit ? `${store.user.phone}` : "",
            }
      }
      validationSchema={
        isEdit
          ? Yup.object({
              name: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              surname: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              phone: Yup.string()
                .required("Required")
                .matches(phoneRegExp, "Phone number is not valid"),
            })
          : Yup.object({
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
                .matches(
                  /[a-zA-Z]/,
                  "Password can only contain Latin letters."
                ),
              phone: Yup.string()
                .required("Required")
                .matches(phoneRegExp, "Phone number is not valid"),
            })
      }
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        console.log("qwert");
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
        {!isEdit && (
          <MyTextInput
            label="password"
            name="password"
            type="password"
            placeholder="password"
            variant="outlined"
            style={{ marginTop: "20px" }}
          />
        )}
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
            {isEdit ? "EDIT" : "SIGN UP"}
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default observer(RegistrationForm);
