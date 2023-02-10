import Container from "@mui/material/Container";
import styles from "./ProfileHeader.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import React, { useContext, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

const ProfileHeader = () => {
  const { store } = useContext(Context);

  return (
    <div className={styles.container}>
      <Container
        maxWidth={false}
        sx={{ width: "90%" }}
        className={styles.header}
      >
        <div className={styles.header_wrapper}>
          <div style={{ display: "flex" }} onClick={() => <Link to={"/"} />}>
            <EnergySavingsLeafIcon />
            <Link style={{ textDecoration: "none",color:"#0AB28B" }} to={"/"}>
              ENERGY APP
            </Link>
          </div>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <Button
              style={{ marginLeft: "15px" }}
              sx={{ backgroundColor: "#0AB28B" }}
              variant="contained"
              onClick={() => store.logout()}
            >
              Log out
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default observer(ProfileHeader);
