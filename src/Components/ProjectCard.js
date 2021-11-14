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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
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
      <Grid item container xs={6} sm={4} ref={ref} >
        <Grow in={onScreen} timeout={1250}>
          <div>
          <Card className={classes.root}>
            <Grow in={onScreen} timeout={1250}>
            <CardMedia
              className={classes.media}
              image={props.project.img}
              title={props.project.name}
            />
            </Grow>
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.cardTypography}
                gutterBottom
                variant="h5"
                component="h2"
                style={{fontFamily: "Odibee Sans, cursive",}}
              >
                {props.project.name}
              </Typography>
              <Typography
                className={classes.cardTypography}
                variant="body1"
                color="textSecondary"
                component="p"
                style={{fontFamily: "Odibee Sans, cursive",}}
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

