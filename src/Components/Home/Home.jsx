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
  HeadshotContainer: { width: "80%", overflow: "none" },
  Headshot: {
    borderRadius: "50%",
    objectFit: "cover",
    height: "100%",
    width: "100%",
    border: "3px solid white",
  },
  SalutationContainer: {
    padding: '7.5px 0px',
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  NameContainer: {
    padding: '7.5px 0px',
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
    },
  },
  Name: { textTransform: "uppercase", lineHeight: "85%" },
  DescriptionSpan: { color: "#73D90D", textTransform: "uppercase" },
  ButtonContainer: { margin: "5px", padding: "5px 0px" },
  Button: { color: "white", borderRadius: "25px" },
  IntroContainer: {
    maxWidth: "560px",
    margin: "0 auto",
  },
  HeroCard: {
    position: "relative",
    zIndex: 2,
    padding: "18px 18px",
    borderRadius: "18px",
    background: "rgba(0,0,0,0.35)", // dark glass
    backdropFilter: "blur(2px)",
    border: "1px solid rgba(115, 217, 13, 0.18)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  IntroLead: {
    opacity: 0.95,
    marginBottom: "0.9rem",
    letterSpacing: "0.02em",
    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
  },
  IntroParagraph: {
    opacity: 0.88,
    lineHeight: 1.75,
    marginBottom: "1rem",
    textShadow: "0 2px 10px rgba(0,0,0,0.55)",
  },
  SubtleAccent: {
    color: "#73D90D",
    fontWeight: 500,
  },

});

export default function Home() {
  const classes = styles();

  return (
    <div>
      <Box sx={classes.WelcomeBox}>
        <ParticleBackground>
          <Container maxWidth="md" sx={classes.WelcomeContainer}>
            <Grid container sx={classes.WelcomeGridContainer}>
              <Box sx={{ ...classes.CssGridBox, ...classes.HeroCard, }}>
                <Grid container size={12} sx={classes.GridAreaB}>
                  <div style={classes.HeadshotContainer}>
                    <img src={headshot} alt="Avatar" style={classes.Headshot} />
                  </div>
                </Grid>

                <Grid container size={12} sx={classes.GridAreaA}>
                  <Grid size={12} sx={classes.SalutationContainer}>
                    <Typography display="inline" variant="h3">
                      Hey, I'm
                    </Typography>
                  </Grid>
                  <Grid size={12} sx={classes.NameContainer}>
                    <Typography display="inline" variant="h1" sx={classes.Name}>
                      Matt Kearns
                    </Typography>
                  </Grid>
                </Grid>

                <Grid size={12} sx={classes.GridAreaC}>
                  <Box sx={classes.IntroContainer}>
                    <Typography variant="subtitle1" sx={classes.IntroLead}>
                      <span style={classes.SubtleAccent}>I like figuring things out.</span>
                    </Typography>

                    <Typography variant="body1" sx={classes.IntroParagraph}>
                      Most of my time is spent building, breaking, fixing, and rebuilding things, usually with code,
                      hardware, or systems that weren’t quite working the way they should.
                    </Typography>

                    <Typography variant="body1" sx={classes.IntroParagraph}>
                      I care about why something exists, how it fits into real life, and
                      whether it actually does what it’s supposed to do.
                    </Typography>

                    <Typography variant="body1" sx={classes.IntroParagraph}>
                      Whether it's web development, automation, or self-hosted tech what really drives me is problem-solving.
                      If something feels inefficient or fragile, I’ll probably take it apart just to understand it and then put it back together.
                    </Typography>

                    <Typography variant="body1" sx={{ ...classes.IntroParagraph, marginBottom: 0 }}>
                      Outside of tech, I coach cheer and tumbling, experiment with 3D printing, and constantly tinker
                      with smart-home setups. When I’m not doing that, I’m usually lifting or gaming.
                    </Typography>
                  </Box>
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
