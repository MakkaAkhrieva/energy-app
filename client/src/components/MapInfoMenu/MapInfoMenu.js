import React, { useEffect } from "react";
import { useState, useContext, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./MapInfoMenu.module.css";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { toJS } from "mobx";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MapInfoMenu = ({
  setIsMenuOpen,
  selectedMarker,
  setIsCalculateRoute,
  setSelectedMarker,
  center,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { store } = useContext(Context);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isFavourite = useMemo(() => {
    const station = store.user.favourites.find(
      (station) => station._id === selectedMarker._id
    );
    console.log("data", station);
    return station;
  }, [selectedMarker, store.favouriteStations, store.user.favourites]);

  console.log("isFavourite", isFavourite);

  useEffect(() => {
    console.log("user", toJS(store.user));
    console.log("selected", toJS(selectedMarker));
  });

  const onFavouriteToggle = () => {
    console.log(toJS(selectedMarker));
    const favourite = store.favouriteStations.find(
      (station) => station._id === selectedMarker._id
    );
    console.log("favouriteId", toJS(favourite));
    if (favourite) {
      store.deleteFavouriteStation(favourite._id);
    } else {
      store.addFavouriteStation(selectedMarker);
    }
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

  const makeRoute = () => {
    window.location.href = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${selectedMarker.location.lat},${selectedMarker.location.lng}`;
  };

  return (
    <div className={styles.container}>
      <Card sx={{ maxWidth: "25em", boxShadow: "none" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "#0AB28B", alignContent: "center" }}
              aria-label="Energy App"
            >
              <EnergySavingsLeafIcon />
            </Avatar>
          }
          title={selectedMarker.name}
          subheader={selectedMarker.address}
        />
        <CardMedia
          component="img"
          height="194"
          image="https://www.ic.gc.ca/eic/site/mc-mc.nsf/vwimages/CarStation.PNG/$file/CarStation.PNG"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            ad laboriosam magnam itaque officiis, placeat minus cum eos vitae,
            mollitia nesciunt rem molestiae quidem, eius incidunt eaque nam.
            Eveniet, dolorum?
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onFavouriteToggle}>
            <FavoriteIcon sx={{ color: isFavourite ? "red" : "grey" }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium ad a, necessitatibus in asperiores, est quis ab magni
              soluta provident, sunt porro debitis consectetur eius dicta.
              Deleniti possimus soluta cupiditate?
            </Typography>
          </CardContent>
        </Collapse>
        <Button
          onClick={() => {
            setIsMenuOpen(false);
            setSelectedMarker("");
          }}
        >
          Close
        </Button>
        <Button onClick={() => makeRoute()}>Route</Button>
        <Button onClick={() => setIsCalculateRoute(true)}>
          Calculate Route
        </Button>
      </Card>
    </div>
  );
};

export default observer(MapInfoMenu);
