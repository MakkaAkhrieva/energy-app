import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import car from "./car.png";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
import ProfileHeader from "../ProfileHeader/ProfileHeader.js";
import Button from "@mui/material/Button";
import PersonalData from "../PersonalData/PersonalData";
import { Modal } from "../Modal/Modal";
import RegistrationForm from "../RegistrationForm/RegistrationForm.js";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Navigate, Link } from "react-router-dom";
import styles from "./Profile.module.css";
import FavouriteStationsList from "../FavouriteStationsList/FavouriteStationsList";

const Profile = () => {
  const { store } = useContext(Context);
  const [isPersonalData, setIsPersonalData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  if (store.isLoading) {
    return <div>Загрузка.....</div>;
  }
  /* debugger; */
  const editProfile = (event, id) => {
    event.preventDefault();
    setIsEdit(true);
    setModal(true);
  };

  const handleSubmit = (values) => {
    store
      .editUser(
        store.user.id,
        values.name,
        values.surname,
        values.email,
        values.phone
      )
      .then(() => {
        if (store.isError) {
          alert(store.isError);
          setOpen(true);
        } else {
          alert("Edit");
          setModal(false);
        }
      });
    setOpen(false);
  };

  const dataHandler = () => {
    setIsPersonalData(!isPersonalData);
    setIsFavourite(false);
  };

  const favouriteHandler = () => {
    setIsFavourite(!isFavourite);
    setIsPersonalData(false);
  };
  return (
    <>
      <ProfileHeader />
      <Container
        maxWidth={false}
        minWidth={false}
        sx={{ width: "90%", marginTop: "50px" }}
      >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Button variant="outlined" onClick={dataHandler}>
              Personal Data
            </Button>
            <Button variant="outlined">Statistics</Button>
            <Button variant="outlined" onClick={favouriteHandler}>
              Favourite
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>{`Hi,${store.user.name + " " + store.user.surname}`}</p>
              <p>
                {store.user.isActivated
                  ? "Акаунт подтвержден по почте"
                  : "Подтвердите акаунт"}
              </p>
              <img src={car} alt="car" className={styles.image} />
              <p>Car:{store.user.car ? store.user.car : " No information"}</p>
            </div>
            <div>
              {isPersonalData && <PersonalData editProfile={editProfile} />}
              {isFavourite && <FavouriteStationsList />}
            </div>
          </div>
        </div>
        <Link className={styles.link} to={"/"}>
          <div className={styles.gohome}>
            <KeyboardBackspaceIcon />
            <p>Go Home</p>
          </div>
        </Link>
      </Container>

      <Modal
        isVisible={isModal}
        title="Edit PersonalData"
        component={
          <RegistrationForm
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            isEdit={isEdit}
          />
        }
        footer={<button>Cancel</button>}
        onClose={() => {
          setModal(false);
          setIsEdit(false);
        }}
      />
    </>
  );
};

export default observer(Profile);
