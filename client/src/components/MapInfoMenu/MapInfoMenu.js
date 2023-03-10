import React, { useCallback } from "react";
import { useState, useContext, useMemo, useEffect } from "react";
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
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const ExpandMore = styled((props) => {
  const { ...other } = props;
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

  useEffect(() => {
    localStorage.setItem("stationid", selectedMarker.id);
  }, [selectedMarker, setSelectedMarker]);

  const isFavourite = useMemo(
    () =>
      store.user.favourites.find(
        (station) => station._id === selectedMarker._id,
      ),
    [selectedMarker._id, store.user.favourites],
  );

  const FavoriteIconColor = isFavourite ? "red" : "grey";

  const onFavouriteToggle = useCallback(() => {
    const favourite = store.favouriteStations.find(
      (station) => station._id === selectedMarker._id,
    );
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
  }, [store.favouriteStations, selectedMarker._id, store.user.id]);

  const makeRoute = () => {
    window.location.href = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${selectedMarker.location.lat},${selectedMarker.location.lng}`;
  };

  const calculateRouteHandler = () => {
    setIsCalculateRoute(true);
  };

  const onClose = () => {
    setIsMenuOpen(false);
    setSelectedMarker("");
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
          <Typography variant="body2" color="text.primary">
            Working hours:24h daily
          </Typography>
          <Typography variant="body2" color="text.primary">
            Power:{selectedMarker.power} kw
          </Typography>
          <Typography variant="body2" color="text.primary">
            Plug type:{selectedMarker.plugType}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Price:{selectedMarker.price} BYN for 1 kWh
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onFavouriteToggle}>
            <FavoriteIcon sx={{ color: FavoriteIconColor }} />
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
        <div>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={makeRoute}>Route</Button>
          <Button onClick={calculateRouteHandler}>Calculate Route</Button>
          <Link to={`/user/charging/${selectedMarker._id}`}>
            <Button>Start charging</Button>
          </Link>
          <Button
            className={styles.support}
            sx={{ color: "#0AB28B" }}
            endIcon={<HeadsetMicIcon />}
          >
            <a
              style={{ textDecoration: "none", color: "#0AB28B" }}
              href={`/stationclient/${selectedMarker._id}`}
            >
              Support service
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default observer(MapInfoMenu);
