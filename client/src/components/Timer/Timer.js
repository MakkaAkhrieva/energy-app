import React, { useCallback, useContext, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Context } from "../../index.js";

export const MyStopwatch = () => {
  const { store } = useContext(Context);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(0);

  const end = useCallback(() => {
    pause();
    setTime(+minutes + +(seconds / 60).toFixed(2));
  }, [minutes, seconds]);

  const resetTime = useCallback(() => {
    reset();
    setPrice(0);
  },[setPrice]);

  useEffect(() => {
    setPrice((store.station.power * time * store.station.price).toFixed(2));
  }, [store.station.price, time, store.station.power]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ fontSize: "80px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <div style={{ marginTop: "50px" }}>
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={end}>End</Button>
        <Button onClick={resetTime}>Reset</Button>
      </div>
      {<p>Price:{price} BYN</p>}
      <Button variant="outlined" style={{ marginTop: "20px" }}>
        Save session
      </Button>
    </div>
  );
};
