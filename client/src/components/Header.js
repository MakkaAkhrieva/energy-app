import Container from "@mui/material/Container";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import React, { useContext } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import { LogInOutButton } from "./storyBook/buttons/Login_Logout_Btns";
import { Logo } from "./storyBook/logo/Logo";

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
          <Logo />
          {!store.isAuth ? (
            <LogInOutButton name={"Log in"} link={"/login"} />
          ) : (
            <div className={styles.sm_container}>
              <Link className={styles.link} to="user/profile">
                <div className={styles.profile_wrapper}>
                  <AccountBoxIcon />
                  <p className={styles.profile}>{store.user.email}</p>
                </div>
              </Link>
              <LogInOutButton
                name={"Log out"}
                link={"/"}
                onClick={() => store.logout()}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default observer(Header);
