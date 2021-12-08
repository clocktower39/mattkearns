import React, { useEffect, useRef } from "react";
import { Avatar, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ExpandMore, LinkedIn, GitHub, Instagram } from "@mui/icons-material";
import ProjectCard from "./ProjectCard";
import FavoritesList from "./FavoritesList";
import Logos from "./Logos";
import headshot from "../img/IMG_1290.jpg";
import abstract from "../img/petals.svg";
import fingerprint from "../img/wavey-fingerprint.svg";
import { projects, list } from "../states";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: "#000",
    color: "#deeaef",
    backgroundImage: `url(${abstract})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  introTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
  headshotContainer: {
    justifyContent: "center",
  },
  headshot: {
    border: "3px solid white",
  },
  accent: {
    color: "#50fbdf",
  },
  section: {
    height: "100%",
  },
  sectionTitle: {
    // color: "#5927E5",
    fontFamily: "Odibee Sans, cursive",
    padding: "50px",
  },
  ExpandMore: {
    animation: `$myEffect 3000ms cubic-bezier(0.4, 0, 0.2, 1)`,
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(-150%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const textContainerRef = useRef(null);
  const textPathRef = useRef(null);

  const handleSocialLink = (type) => {
    switch (type) {
      case "github":
        window.location.href = "https://github.com/clocktower39";
        break;
      case "linkedIn":
        window.location.href = "https://www.linkedin.com/in/matthew-kearns-6b8865117/";
        break;
      case "instagram":
        window.location.href = "https://www.instagram.com/kearns39/";
        break;
      default:
        break;
    }
  };

  const updateTextPathOffset = (offset) => {
    textPathRef.current.setAttribute("startOffset", offset);
  };

  const onScrollText = (path, pathLength) => {
    const rect = textContainerRef.current.getBoundingClientRect();
    const scrollPercent = rect.y / window.innerHeight;
    updateTextPathOffset(scrollPercent * 2 * pathLength);
  };

  useEffect(() => {
    const path = document.querySelector(textPathRef.current.getAttribute("href"));
    const pathLength = path.getTotalLength();

    updateTextPathOffset(pathLength);

    window.addEventListener("scroll", () => onScrollText(path, pathLength));

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.section}>
        <Grid container style={{ height: "100%", alignContent: "center", }} >
          <Grid container style={{ justifyContent: "space-around", alignItems: "center" }}>
            <Grid className={classes.headshotContainer} container item xs={12} sm={4}>
              <Avatar
                alt="pic"
                src={headshot}
                className={classes.headshot}
                sx={{ width: 175, height: 175 }}
              />
            </Grid>
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
                <Typography display="inline" variant="h3" className={classes.introTypography}>
                  Matt Kearns.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography display="inline" variant="h6" className={classes.introTypography}>
                  I'm a self taught <span className={classes.accent}>full stack developer</span>.
                  passionate hacker and love to break everything down...even if I end up just plain
                  breaking it.
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ justifyContent: "center" }} xs={12}>
              <ExpandMore
                className={classes.ExpandMore}
                style={{ fontSize: "115px", color: "#FFF", paddingTop: "125px" }}
              />
            </Grid>

            <Grid item container style={{ justifyContent: "center", alignItems: 'flex-start' }} xs={12}>
              <svg
                id="text-container"
                ref={textContainerRef}
                xmlns="http://ww.w3.org/2000/svg"
              >
                <path
                  id="text-curve"
                  d="m0 100s269.931 86.612 520 0c250.069-86.612 480 0 480 0"
                  fill="none"
                />
                <text y="40" fill="#FFF" fontSize="56px" fontFamily="Odibee Sans, cursive">
                  <textPath href="#text-curve" id="text-path" ref={textPathRef}>
                    Lets code!
                  </textPath>
                </text>
              </svg>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <div style={{backgroundImage: `url(${fingerprint})`, paddingTop: '125px', }} >
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.sectionTitle} style={{ color: "#deeaef", }}>
            Projects
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </Grid>
        </Container>
      </div>

      <div
        style={{
          padding: "100px 0",
          backgroundImage: `url(${fingerprint})`,
        }}
      >
        <Container maxWidth="md">
          <Paper>
            <Grid container spacing={2}>
              <Logos />
            </Grid>
          </Paper>
        </Container>
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.sectionTitle}>
            Favorite Books, Movies, & Video Games
          </Typography>
          <Grid container spacing={2}>
            {list.map((item) => (
              <Grid item xs={3} key={item.title}>
                <FavoritesList item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <div style={{ backgroundColor: "#000" }}>
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.sectionTitle}>
            Social Media
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <IconButton onClick={() => handleSocialLink("github")}>
                <GitHub style={{ fontSize: "35px", color: "white" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleSocialLink("linkedIn")}>
                <LinkedIn style={{ fontSize: "35px", color: "white" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleSocialLink("instagram")}>
                <Instagram style={{ fontSize: "35px", color: "white" }} />
              </IconButton>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Typography variant="body1" style={{ fontSize: "10px" }}>
                Copyright © 2021 MattKearns.dev - All Rights Reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
