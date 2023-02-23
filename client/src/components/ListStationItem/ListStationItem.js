import React, { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditLocation from "@mui/icons-material/EditLocation";
import ListItemText from "@mui/material/ListItemText";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";

const ListStationItem = ({ station, setEditId, toggleModalVisibility }) => {
  const { store } = useContext(Context);
  const deleteStation = () => {
    store.removeStation(station._id).then(() => {
      if (store.isError) {
        alert(store.isError);
      } else {
        alert("Deleted");
      }
    });
  };

  const editStation = () => {
    toggleModalVisibility();
    setEditId(station._id);
  };

  return (
    <ListItem>
      <ListItemText
        primary={`${station.name}`}
        secondary={`lat:${station.location.lat} lng:${station.location.lng}`}
      />
      <DeleteOutlineIcon onClick={deleteStation} />
      <EditLocation onClick={editStation} sx={{ color: "#0AB28B" }} />
    </ListItem>
  );
};

export default observer(ListStationItem);
