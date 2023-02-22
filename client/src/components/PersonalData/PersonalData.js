import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Context } from "../../index";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./PersonalData.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(244, 244, 253)",
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow:
    "rgb(255 255 255 / 70%) -2px -2px 4px, rgb(208 208 230) 2px 2px 4px",
  padding: "10px",
  minWidth: "fit-content",
}));

const PersonalData = ({ editProfile }) => {
  const { store } = useContext(Context);
  return (
    <div className={styles.container}>
      <Box sx={{ flexGrow: 1, width: "90%", marginTop: "50px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item className={styles.item}>
              <p className={styles.p}>Name:</p>
              <TextField
                defaultValue={`${store.user.name}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                disabled={true}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item className={styles.item}>
              <p className={styles.p}>Surname:</p>
              <TextField
                defaultValue={`${store.user.surname}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                disabled={true}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item className={styles.item}>
              <p className={styles.p}>Role:</p>
              <TextField
                defaultValue={`${store.user.role}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                disabled={true}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item className={styles.item}>
              <p className={styles.p}>Email:</p>
              <TextField
                defaultValue={`${store.user.email}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                disabled={true}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item className={styles.item}>
              <p className={styles.p}>Phone:</p>
              <TextField
                defaultValue={`${store.user.phone}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                disabled={true}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Button
        variant="outlined"
        style={{ marginTop: "20px" }}
        onClick={(event) => editProfile(event)}
      >
        Edit
      </Button>
    </div>
  );
};

export default observer(PersonalData);
