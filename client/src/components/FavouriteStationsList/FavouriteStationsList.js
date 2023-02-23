import React from "react";
import { useContext } from "react";
import List from "@mui/material/List";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import FavouriteListItem from "./ListItem";

const FavouriteStationsList = () => {
  const { store } = useContext(Context);

  return (
    <List>
      {store.user.favourites.map((station) => {
        return <FavouriteListItem station={station} />;
      })}
    </List>
  );
};

export default observer(FavouriteStationsList);
