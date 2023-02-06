import Container from "@mui/material/Container";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
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
            <p>ENERGY APP</p>
          </div>
          {!store.isAuth ? (
            <Link to="/login">
              <Button variant="contained" sx={{ backgroundColor: "#0b5a04cd" }}>
                Log in
              </Button>
            </Link>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="user/profile">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid white",
                    padding: "5px",
                    color: "white",
                  }}
                >
                  <AccountBoxIcon />
                  <p style={{ marginLeft: "10px", textDecoration: "none" }}>
                    {store.user.email}
                  </p>
                </div>
              </Link>
              <Link to={"/"}>
                <Button
                  style={{ marginLeft: "15px" }}
                  sx={{ backgroundColor: "#0b5a04cd" }}
                  variant="contained"
                  onClick={() => store.logout()}
                >
                  Log out
                </Button>
              </Link>
            </div>
          )}
          {/* <Link to="/login">
            <Button variant="contained" sx={{ backgroundColor: "#0b5a04cd" }}>
              Log in
            </Button>
          </Link> */}
        </div>
      </Container>
    </div>
  );
};

export default observer(Header);
