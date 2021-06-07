import React from "react";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    backgroundColor: "#5927E5",
    color: "#deeaef",
  },
  introTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
  accent: {
    color: "#50fbdf",
  },
  section: {
    height: "100vh",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center" 
        alignItems="center"
        className={classes.section}
      >
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Typography
            display="inline"
              variant="h6"
              className={`${classes.accent} ${classes.introTypography}`}
            >
              Hi, my name is
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography 
            display="inline" variant="h3" className={classes.introTypography}>
              Matt Kearns.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography 
            display="inline" variant="h6" className={`${classes.introTypography}`}>
              I'm a self taught <span className={classes.accent}>full stack developer</span>. passionate hacker and
              tinkerer.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      
      <Typography variant="h3">Projects</Typography>
      <Divider />
      <Typography variant="h3">Movies, Music, Video Games</Typography>
      <Divider />
      <Typography variant="h3">Social Media</Typography>
      <Divider />
    </div>
  );
}
