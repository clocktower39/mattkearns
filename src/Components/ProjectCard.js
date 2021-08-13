import React, { useState } from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Fade,
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
    paddingTop: "69%", // 16:9 == '56.25%'
  },
  cardContent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  cardTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
}));


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  let [active, setActive] = useState(false);

  return (
    <VizSensor
      onChange={(isVisible) => {
        if (isVisible) setActive(true);
      }}>
      <Fade in={active} timeout={1500}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={props.project.img}
            title={props.project.name}
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTypography} gutterBottom variant="h5" component="h2">
              {props.project.name}
            </Typography>
            <Typography className={classes.cardTypography} variant="body1" color="textSecondary" component="p">
              {props.project.desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              onClick={() => (window.location.href = props.project.link)}
            >
              Open
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => window.open("https://www.github.com/clocktower39", "_blank")}
            >
              Source
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </VizSensor>
  );
}
