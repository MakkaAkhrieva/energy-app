import * as React from "react";
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

export const MapInfoMenu = ({
  setIsMenuOpen,
  selectedMarker,
  setIsCalculateRoute,
  setSelectedMarker,
  center,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
