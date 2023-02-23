import Container from "@mui/material/Container";
import styles from "./ProfileHeader.module.css";
import React, { useContext } from "react";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import { LogInOutButton } from "../storyBook/buttons/Login_Logout_Btns";
import { Logo } from "../storyBook/logo/Logo";

const ProfileHeader = () => {
  const { store } = useContext(Context);

  const logOut = () => {
    store.logout();
  };

  return (
    <div className={styles.container}>
      <Container
        maxWidth={false}
        sx={{ width: "90%" }}
        className={styles.header}
      >
        <div className={styles.header_wrapper}>
          <Logo />
          <LogInOutButton name={"Log out"} link={"/"} onClick={logOut} />
        </div>
      </Container>
    </div>
  );
};

export default observer(ProfileHeader);
