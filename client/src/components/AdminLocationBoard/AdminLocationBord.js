import React, { useState, useContext, useCallback } from "react";
import styles from "./AdminLocationBoard.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import List from "@mui/material/List";
import { AddForm } from "../AddForm/AddForm";
import { Modal } from "../Modal/Modal";
import ListStationItem from "../ListStationItem/ListStationItem";

const AdminLocationBoard = () => {
  const { store } = useContext(Context);
  const [isModal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const onClose = () => {
    setModal(false);
  };

  const toggleModalVisibility = useCallback(() => {
    setModal(!isModal);
  }, [isModal]);

  return (
    <>
      <div className={styles.container}>
        <p>Locations</p>
        <List>
          {store.stations.map((station) => {
            return (
              <ListStationItem
                station={station}
                setEditId={setEditId}
                toggleModalVisibility={toggleModalVisibility}
              />
            );
          })}
        </List>
      </div>
      <Modal
        isVisible={isModal}
        title="Edit station"
        component={<AddForm editId={editId} onClose={onClose} />}
        footer={<button>Cancel</button>}
        onClose={toggleModalVisibility}
      />
    </>
  );
};

export default observer(AdminLocationBoard);
