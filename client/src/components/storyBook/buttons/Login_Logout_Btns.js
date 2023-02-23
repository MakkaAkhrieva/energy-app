import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";
import styles from "./styles.module.css";

export const LogInOutButton = ({ name, link, onClick = null }) => {
  return (
    <Link className={styles.link} to={link}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0AB28B",
          color: "white",
        }}
        onClick={onClick}
      >
        {name}
      </Button>
    </Link>
  );
};
