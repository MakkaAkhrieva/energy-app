import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import styles from "./AdminLocationBoard.module.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Context } from "../../index.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import EditLocation from "@mui/icons-material/EditLocation";
import { AddForm } from "../AddForm/AddForm";
import { Modal } from "../Modal/Modal";

const AdminLocationBoard = () => {
  const { store } = useContext(Context);
  const [isModal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  console.log("admin", toJS(store.stations));

  const deleteStation = (e, id) => {
    e.preventDefault();
    store.removeStation(id).then(() => {
      if (store.isError) {
        alert(store.isError);
      } else {
        alert("Deleted");
      }
    });
  };

  const editStation = (e, id) => {
    e.preventDefault();
    setModal(true);
    setEditId(id);
  };

  return (
    <>
      <div className={styles.container}>
        <p>locations</p>
        <List>
          {store.stations.map((station) => {
            return (
              <ListItem>
                <ListItemText
                  primary={`${station.name}`}
                  secondary={`lat:${station.location.lat} lng:${station.location.lng}`}
                />
                <DeleteOutlineIcon
                  onClick={(e) => deleteStation(e, station._id)}
                />
                <EditLocation
                  onClick={(e) => editStation(e, station._id)}
                  sx={{ color: "#0AB28B" }}
                />
              </ListItem>
            );
          })}
        </List>
        {/* <AddForm /> */}
      </div>
      <Modal
        isVisible={isModal}
        title="Edit station"
        component={<AddForm editId={editId} onClose={() => setModal(false)}  />}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </>
  );
};

export default observer(AdminLocationBoard);
