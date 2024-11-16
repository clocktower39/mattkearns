import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logos from "./Logos";
import headshot from "../../img/avatar2.jpg";
// import Projects from "./Projects";
import TerminalController from "../TerminalController";
import Footer from "../Footer";
import { theme } from "../../theme";
import ParticleBackground from "../ParticleBackground";

const styles = () => ({
  WelcomeBox: {
    backgroundPosition: "75%",
    minHeight: "100vh",
  },
  WelcomeContainer: { minHeight: "100vh", },
  WelcomeGridContainer: { justifyContent: "center", alignItems: "center", minHeight: "100vh" },
  CssGridBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "grid",
    gridTemplateAreas: `
    'A'
    'B'
    'C'
    `,
    [theme.breakpoints.up("sm")]: {
      gridTemplateAreas: `
      'B A'
      'B C'
      `,
    },
  },
  GridAreaA: { gridArea: "A", userSelect: "none" },
  GridAreaB: { gridArea: "B", justifyContent: "center", padding: "15px 0px", userSelect: "none" },
  GridAreaC: {
    gridArea: "C",
    userSelect: "none",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  HeadshotContainer: { width: "85%", overflow: "none" },
  Headshot: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%",
    border: "3px solid white",
  },
  SalutationContainer: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  NameContainer: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  Name: { textTransform: "uppercase", lineHeight: "85%" },
  DescriptionSpan: { color: "#73D90D", textTransform: "uppercase" },
  ButtonContainer: { margin: "5px", padding: "5px 0px" },
  Button: { color: "white", borderRadius: "25px" },
});

export default function Home() {
  const classes = styles();

  return (
    <div>
      <Box sx={classes.WelcomeBox}>
        <ParticleBackground>
          <Container maxWidth="md" sx={classes.WelcomeContainer}>
            <Grid container sx={classes.WelcomeGridContainer}>
              <Box sx={classes.CssGridBox}>
                <Grid container item xs={12} sx={classes.GridAreaB}>
                  <div style={classes.HeadshotContainer}>
                    <img src={headshot} alt="Avatar" style={classes.Headshot} />
                  </div>
                </Grid>

                <Grid container item xs={12} sx={classes.GridAreaA}>
                  <Grid item xs={12} sx={classes.SalutationContainer}>
                    <Typography display="inline" variant="h3">
                      Hey, I'm
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={classes.NameContainer}>
                    <Typography display="inline" variant="h1" sx={classes.Name}>
                      Matt Kearns
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={classes.GridAreaC}>
                  <Typography variant="h5">
                    I'm a self taught <span style={classes.DescriptionSpan}>Web Developer.</span>
                  </Typography>
                  <br />
                  <Typography variant="h5">
                    I specialize in building modern web apps using the MERN stack and have hands-on
                    experience managing servers, including Apache, NGINX, and WordPress.
                  </Typography>
                  <br />
                  <Typography variant="h5">
                    My workflow includes everything from coding and debugging to deployment on
                    platforms like AWS and other hosting services.
                  </Typography>
                  <br />
                  <Typography variant="h5">
                    I am passionate about smart home technology, using Home Assistant
                    to create integrated and automated setups. Whether it’s building websites,
                    optimizing workflows, or solving unique challenges, I focus on making ideas
                    functional and impactful.
                  </Typography>

                  <Grid item container sm={6} xs={12} sx={classes.ButtonContainer}>
                    {/* <Button
                      fullWidth
                      variant="contained"
                      sx={classes.Button}
                      component={Link}
                      to="/about"
                    >
                      About Me
                    </Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </ParticleBackground>
      </Box>
      {/* <Projects /> */}
      <TerminalController />
      <Logos />
      <Footer />
    </div>
  );
}
