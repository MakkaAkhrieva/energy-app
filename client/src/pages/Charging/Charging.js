import React, { useEffect, useContext, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Container from "@mui/material/Container";
import { MyStopwatch } from "../../components/Timer/Timer";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./Charging.module.css";
import { Invoice } from "../../components/Invoice/Invoice";

const Charging = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const [time, setTime] = useState(0);
  const [carPower, setCarPower] = useState(100);

  useEffect(() => {
    store.getStation(id);
  }, []);

  const calculateTime = useCallback(() => {
    setTime((carPower / store.station.power).toFixed(2));
  }, [store.station.power, carPower]);

  const reset = () => {
    setTime(null);
    setCarPower(100);
  };

  const onChangeHandler = (e) => {
    setCarPower(e.target.value);
  };

  return (
    <>
      <ProfileHeader />
      <Container
        maxWidth={false}
        minWidth={false}
        sx={{ width: "90%", marginTop: "50px" }}
        className={styles.wrapper}
      >
        <div className={styles.contain}>
          <div className={styles.container}>
            <div className={styles.car_power}>
              <p>Car power:</p>
              <TextField
                type={"number"}
                variant="standard"
                value={carPower}
                sx={{ padding: "0 10px", width: "70px" }}
                onChange={onChangeHandler}
              />
              <p>кВт*ч</p>
            </div>
            <hr className={styles.hr} />
            <p>Station power:{store.station.power}кВт</p>
            <hr className={styles.hr} />
            <p>Time:{time ? time : "-"}ч</p>
            <hr className={styles.hr} />
            <Button onClick={calculateTime}>charging time</Button>
            <Button onClick={reset}>Reset</Button>
          </div>
          <MyStopwatch carPower={carPower} />
        </div>

        <Invoice />
      </Container>
    </>
  );
};

export default observer(Charging);
