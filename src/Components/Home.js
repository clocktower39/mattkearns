import React from "react";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ProjectCard from "./ProjectCard";
import headshot from "../img/IMG_1290.jpg";
import scheduleGeneratorImg from "../img/schedule-generator-img.jpg";
import exerciseAppImg from "../img/exerciseAppImg.jpg";
import makeupImg from "../img/makeupImg.jpg";
import socialPhotoAppImg from "../img/socialPhotoAppImg.jpg";
import bonfireImg from "../img/bonfireImg.jpg";

const projects = [
  {
    name: "Bonfire",
    link: "https://mattkearns.dev/message",
    img: bonfireImg,
    desc: "Message app using socket.io for real time updates, JWT for authentication, mongoDB for storage",
  },
  {
    name: "Schedule Generator",
    link: "https://mattkearns.dev/random-schedule-generator",
    img: scheduleGeneratorImg,
    desc: "Creates a daily schedule based on a weighted system and availablility",
  },
  {
    name: "Fitness Exercises App",
    link: "https://mattkearns.dev/fitness-exercises",
    img: exerciseAppImg,
    desc: "Lists fitness exercises by muscle group and provides a description",
  },
  {
    name: "Social Picture App",
    link: "https://mattkearns.dev/social-picture-app/",
    img: socialPhotoAppImg,
    desc: "Instagram mock application",
  },
  {
    name: "Makeup Site",
    link: "https://madeupbymaria.com",
    img: makeupImg,
    desc: "Client makeup site portfolio and contact",
  },
];

const useStyles = makeStyles({
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
  },
  accent: {
    color: "#50fbdf",
  },
  section: {
    height: "100vh",
  },
  sectionTitle: {
    color: "#5927E5",
    fontFamily: "Odibee Sans, cursive",
    padding: '50px',
  }
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.section}>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid container justify="center" alignItems="center">
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
                  passionate hacker and love to break everything down...even if I end up just plain breaking it.
                </Typography>
              </Grid>
            </Grid>
            <Grid justify="center" container item xs={12} sm={4}>
              <Avatar alt="pic" src={headshot} className={classes.headshot} />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md">
      <Typography variant="h3" className={classes.sectionTitle} >Projects</Typography>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider />
      <Typography variant="h3">Movies, Music, Video Games, Books</Typography>
      <Divider />
      <Typography variant="h3">Social Media</Typography>
      <Divider />
    </div>
  );
}
