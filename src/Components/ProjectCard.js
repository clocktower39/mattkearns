/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Grid,
  Grow,
  makeStyles,
} from "@material-ui/core";
import useOnScreen from '../Hooks/useOnScreen';

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
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-300px");

  return (
      <Grid item xs={6} sm={4} ref={ref} >
        <Grow in={onScreen} timeout={1250}>
          <div>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={props.project.img}
              title={props.project.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.cardTypography}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {props.project.name}
              </Typography>
              <Typography
                className={classes.cardTypography}
                variant="body1"
                color="textSecondary"
                component="p"
              >
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
                onClick={() =>
                  window.open("https://www.github.com/clocktower39", "_blank")
                }
              >
                Source
              </Button>
            </CardActions>
          </Card>
          </div>
        </Grow>
      </Grid>
  );
}

