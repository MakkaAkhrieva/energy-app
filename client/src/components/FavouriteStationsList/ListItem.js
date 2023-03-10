import React from "react";
import ListItem from "@mui/material/ListItem";
import { useContext } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EvStationIcon from "@mui/icons-material/EvStation";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

const FavouriteListItem = ({ station }) => {
  const { store } = useContext(Context);

  const onDelete = () => {
    store.deleteFavouriteStation(station._id);
    store
      .editUserFavourites(store.user.id, store.favouriteStations)
      .then(() => {
        if (store.isError) {
          alert(store.isError);
        } else {
          alert("Edit");
        }
      });
  };

  return (
    <ListItem
      key={station._id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ color: "#0AB28B" }}
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <EvStationIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={station.name} secondary={station.address} />
    </ListItem>
  );
};

export default observer(FavouriteListItem);
