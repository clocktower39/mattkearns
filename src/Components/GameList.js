import React, { useState } from "react";
import {
  CardMedia,
  Card,
  Grow,
  makeStyles,
} from "@material-ui/core";
import VizSensor from 'react-visibility-sensor';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "",
  },
  media: {
    height: 0,
    paddingTop: "150%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  cardTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
}));


export default function GameList(props) {
  const classes = useStyles();
  let [active, setActive] = useState(false);

  return (
    <VizSensor
      onChange={(isVisible) => {
        if(isVisible)setActive(true);
      }}>
      <Grow in={active} timeout={1500}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={props.game.poster}
            title={props.game.title}
          />
        </Card>
      </Grow>
    </VizSensor>
  );
}
