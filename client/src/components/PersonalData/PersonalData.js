import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Context } from "../../index";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MyTextInput } from "../storyBook/input/input";
import Button from "@mui/material/Button";
import { toJS } from "mobx";

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
  console.log("presonalData", toJS(store.user));
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "60%", marginTop: "50px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <p style={{ marginRight: "5px" }}>Name:</p>
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
            <Item
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <p style={{ marginRight: "5px" }}>Surname:</p>
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
            <Item
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <p style={{ marginRight: "5px" }}>Role:</p>
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
            <Item
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <p style={{ marginRight: "5px" }}>Email:</p>
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
            <Item
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <p style={{ marginRight: "5px" }}>Phone:</p>
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
        onClick={(e) => editProfile(e)}
      >
        Edit
      </Button>
    </>
  );
};

export default observer(PersonalData);
