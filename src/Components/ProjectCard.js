import React from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
      flexGrow: 1,
      alignItems: 'flex-end',
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
    </Card>
  );
}
