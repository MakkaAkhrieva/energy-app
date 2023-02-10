import Container from "@mui/material/Container";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import React, { useContext, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";

const Header = () => {
  const { store } = useContext(Context);
  return (
    <div className={styles.container}>
      <Container
        maxWidth={false}
        sx={{ width: "90%" }}
        className={styles.header}
      >
        <div className={styles.header_wrapper}>
          <div style={{ display: "flex" }}>
            <EnergySavingsLeafIcon />
            <Link style={{ textDecoration: "none", color: "#0AB28B" }} to={"/"}>
              ENERGY APP
            </Link>
          </div>
          {!store.isAuth ? (
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0AB28B",
                  color: "white",
                }}
              >
                Log in
              </Button>
            </Link>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link style={{ textDecoration: "none" }} to="user/profile">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    boxShadow:
                      "rgb(255 255 255 / 70%) -2px -2px 4px, rgb(208 208 230) 2px 2px 4px",
                    padding: "5px",
                    color: "#0AB28B",
                  }}
                >
                  <AccountBoxIcon />
                  <p
                    style={{
                      marginLeft: "10px",
                      textDecoration: "none",
                      color: "#0AB28B",
                    }}
                  >
                    {store.user.email}
                  </p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <Button
                  style={{ marginLeft: "15px" }}
                  sx={{ backgroundColor: "#0AB28B", color: "white" }}
                  variant="contained"
                  onClick={() => store.logout()}
                >
                  Log out
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default observer(Header);
