import React, { useState, useContext } from "react";
import { Context } from "../.././index.js";
import { observer } from "mobx-react-lite";

export const AddForm = ({ editId, onClose }) => {
  const [name, setName] = useState("");
  const { store } = useContext(Context);

  const addStation = (event) => {
    event.preventDefault();
    store.editStation(editId, name).then(() => {
      if (store.isError) {
        alert(store.isError);
      } else {
        alert("Edit");
        onClose();
      }
    });
  };

  return (
    <form onSubmit={addStation}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Edit station</button>
    </form>
  );
};

export default observer(AddForm);
