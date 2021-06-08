import React, { useState } from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  makeStyles,
} from "@material-ui/core";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
}));

const AnimatedCard = animated(Card);

export default function RecipeReviewCard(props) {
  const [flip, setFlip] = useState(false);

  const classes = useStyles();
  const springStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200,
    config: {
      frequency: 3
    },
    onRest: () => setFlip(!flip),
  });

  return (
    <AnimatedCard className={classes.root} style={springStyle}>
      <CardMedia
        className={classes.media}
        image={props.project.img}
        title={props.project.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.project.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.project.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => (window.location.href = props.project.link)}
        >
          Open
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => window.open(props.project.link, "_blank")}
        >
          Open in New Tab
        </Button>
      </CardActions>
    </AnimatedCard>
  );
}
