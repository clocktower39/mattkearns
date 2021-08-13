import React from "react";
import {
  Avatar,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ProjectCard from "./ProjectCard";
import GameList from "./GameList";
import headshot from "../img/IMG_1290.jpg";
import { projects, games } from "../states";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: "#5927E5",
    color: "#deeaef",
  },
  introTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
  headshot: {
    height: "175px",
    width: "175px",
    border: "3px solid white",
  },
  accent: {
    color: "#50fbdf",
  },
  section: {
    height: "100vh",
  },
  sectionTitle: {
    // color: "#5927E5",
    fontFamily: "Odibee Sans, cursive",
    padding: "50px",
  },
  ExpandMore: {
    animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(-150%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.section}>
        <Grid container alignItems="" style={{ height: "100%" }}>
          <Grid container justify="center" alignItems="center">
            <Grid item container justify="center" xs={12}></Grid>
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
                  display="inline"
                  variant="h3"
                  className={classes.introTypography}
                >
                  Matt Kearns.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  display="inline"
                  variant="h6"
                  className={`${classes.introTypography}`}
                >
                  I'm a self taught{" "}
                  <span className={classes.accent}>full stack developer</span>.
                  passionate hacker and love to break everything down...even if
                  I end up just plain breaking it.
                </Typography>
              </Grid>
            </Grid>
            <Grid justify="center" container item xs={12} sm={4}>
              <Avatar alt="pic" src={headshot} className={classes.headshot} />
            </Grid>
            <Grid item container justify="center" xs={12}>
              <ExpandMore className={classes.ExpandMore} style={{ fontSize: '115px' }} />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <div style={{ backgroundColor: "#008B74", }}>
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.sectionTitle}>
            Projects
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={6} sm={4}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <div style={{ background: "linear-gradient(#008B74, #5927E5)", paddingTop: '100px', }}>
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.sectionTitle}>
            Movies, Music, Video Games, Books
          </Typography>
          <Grid container spacing={3}>
            {games.map(game => (
              <Grid item md={3} xs={4}>
                <GameList game={game} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <Container maxWidth="md">
        <Typography variant="h3" className={classes.sectionTitle}>
          Social Media
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
