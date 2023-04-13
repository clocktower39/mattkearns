import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logos from "./Logos";
import headshot from "../../img/avatar.jpg";
import HomepageBackground from "../../img/Homepage_Background.jpg";
import Projects from "./Projects";
import Footer from "../Footer";
import { theme } from "../../theme";
import ParticleBackground from "../ParticleBackground";

const styles = () => ({
  WelcomeBox: {
    backgroundImage: `url(${HomepageBackground})`,
    backgroundPosition: "75%",
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  WelcomeContainer: { minHeight: "100vh" },
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
  GridAreaA: { gridArea: "A" },
  GridAreaB: { gridArea: "B", justifyContent: "center", padding: "15px 0px" },
  GridAreaC: {
    gridArea: "C",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  HeadshotContainer: { width: "80%", overflow: "none" },
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
                      Hi, my name is
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={classes.NameContainer}>
                    <Typography display="inline" variant="h1" sx={classes.Name}>
                      Matt Kearns
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={classes.GridAreaC}>
                  <Typography display="inline" variant="h5">
                    I'm a self taught{" "}
                    <span style={classes.DescriptionSpan}>full stack developer. </span>I have a
                    passion for technology and creating innovative solutions. With experience in
                    building web applications, automating tasks, and developing smart home
                    appliances, I'm dedicated to making a positive impact through technology.
                  </Typography>
                  <Grid item container sm={6} xs={12} sx={classes.ButtonContainer}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={classes.Button}
                      component={Link}
                      to="/about"
                    >
                      About Me
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </ParticleBackground>
      </Box>
      <Projects />
      <Logos />
      <Footer />
    </div>
  );
}
