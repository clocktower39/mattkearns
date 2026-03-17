import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Footer from "../Footer";
import FavoritesList from "./FavoritesList";
import { books, movies, games, tvShows } from "../../states";

const styles = () => ({
  aboutContainer: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(115, 217, 13, 0.16), transparent 28%)," +
      "radial-gradient(circle at 80% 20%, rgba(64, 158, 255, 0.14), transparent 26%)," +
      "linear-gradient(180deg, #11161b 0%, #161f27 45%, #101419 100%)",
    paddingBottom: "56px",
  },
  pageContainer: {
    paddingTop: "20px",
    paddingBottom: "32px",
  },
  backButtonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingBottom: "16px",
  },
  backButton: {
    borderColor: "rgba(255, 255, 255, 0.22)",
    color: "white",
    borderRadius: "999px",
    padding: "8px 18px",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    "&:hover": {
      borderColor: "#73D90D",
      backgroundColor: "rgba(115, 217, 13, 0.08)",
    },
  },
  heroPanel: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "26px",
    padding: { xs: "28px 22px", md: "36px 34px" },
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))," +
      "linear-gradient(135deg, rgba(24, 31, 39, 0.92), rgba(16, 20, 25, 0.96))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 30px 70px rgba(0, 0, 0, 0.32)",
    marginBottom: "26px",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "180px",
      height: "180px",
      right: "-40px",
      top: "-70px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(115,217,13,0.22), transparent 65%)",
    },
  },
  heroEyebrow: {
    display: "inline-block",
    color: "#9FB5C8",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    fontSize: "0.72rem",
    marginBottom: "10px",
  },
  heroTitle: {
    fontFamily: "Arial Black",
    fontSize: { xs: "2rem", md: "2.6rem" },
    lineHeight: 1,
    color: "white",
    marginBottom: "12px",
  },
  heroLead: {
    color: "#D7E0E7",
    fontSize: { xs: "1rem", md: "1.08rem" },
    lineHeight: 1.7,
    maxWidth: "720px",
    marginBottom: "18px",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  heroChip: {
    color: "white",
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
    "& .MuiChip-label": {
      paddingLeft: "14px",
      paddingRight: "14px",
    },
  },
  sectionCard: {
    height: "100%",
    borderRadius: "22px",
    padding: { xs: "22px 18px", md: "24px 24px" },
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 22px 52px rgba(0, 0, 0, 0.22)",
  },
  sectionLabel: {
    display: "inline-flex",
    alignItems: "center",
    color: "#73D90D",
    fontFamily: "Arial Black",
    fontSize: "1.15rem",
    marginBottom: "18px",
  },
  sectionText: {
    color: "#D7E0E7",
    lineHeight: 1.8,
    marginBottom: "14px",
  },
  sideCard: {
    height: "100%",
    borderRadius: "22px",
    padding: "22px 20px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 22px 52px rgba(0, 0, 0, 0.22)",
  },
  sideTitle: {
    color: "white",
    fontFamily: "Arial Black",
    fontSize: "1rem",
    marginBottom: "12px",
  },
  sideList: {
    margin: 0,
    paddingLeft: "18px",
    color: "#D7E0E7",
    lineHeight: 1.9,
  },
  favoritesSection: {
    marginTop: "28px",
    borderRadius: "26px",
    padding: { xs: "24px 18px", md: "28px 24px" },
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 22px 52px rgba(0, 0, 0, 0.22)",
  },
  favoritesTitle: {
    color: "white",
    fontFamily: "Arial Black",
    fontSize: { xs: "1.5rem", md: "1.8rem" },
    marginBottom: "8px",
  },
  favoritesLead: {
    color: "#B7C8D5",
    lineHeight: 1.7,
    marginBottom: "22px",
    maxWidth: "760px",
  },
  favoritesPanel: {
    height: "100%",
    borderRadius: "20px",
    padding: "18px",
    backgroundColor: "rgba(8, 11, 15, 0.28)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  favoritesPanelTitle: {
    color: "#73D90D",
    fontFamily: "Arial Black",
    fontSize: "1rem",
    marginBottom: "14px",
  },
});

export default function About() {
  const classes = styles();

  return (
    <Box sx={classes.aboutContainer}>
      <Container maxWidth="lg" sx={classes.pageContainer}>
        <Box sx={classes.backButtonContainer}>
          <Button variant="outlined" component={Link} to="/" sx={classes.backButton}>
            Back
          </Button>
        </Box>

        <Box sx={classes.heroPanel}>
          <Typography component="span" sx={classes.heroEyebrow}>
            Beyond Work
          </Typography>
          <Typography component="h1" sx={classes.heroTitle}>
            Builder, coach, and systems-minded engineer.
          </Typography>
          <Typography sx={classes.heroLead}>
            The same curiosity that pushed me into programming still shows up everywhere else:
            coaching, lifting, tinkering with hardware, and chasing ideas far enough to understand
            how they actually work.
          </Typography>
          <Box sx={classes.chipRow}>
            {["Gilbert, AZ", "Identical Twin", "Coach", "Builder", "Always Learning"].map(
              (label) => (
                <Chip key={label} label={label} variant="outlined" sx={classes.heroChip} />
              )
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={classes.sectionCard}>
              <Typography sx={classes.sectionLabel}>Personal</Typography>
              <Typography sx={classes.sectionText}>
                Grew up in a small town north of Chicago and later moved to Gilbert, Arizona,
                where I still live. I have an identical twin brother.
              </Typography>
              <Typography sx={{ ...classes.sectionText, marginBottom: 0 }}>
                I spend most of my time outside of work the same way I approach everything else:
                staying active, learning, and tinkering. That usually looks like coaching cheer
                and tumbling, lifting, gaming, or building things just because they seem
                interesting.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={classes.sideCard}>
              <Typography sx={classes.sideTitle}>Off the clock</Typography>
              <Box component="ul" sx={classes.sideList}>
                <li>Coaching cheer and tumbling</li>
                <li>Lifting and staying active</li>
                <li>Gaming and media setups</li>
                <li>Hardware side projects</li>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={classes.sectionCard}>
              <Typography sx={classes.sectionLabel}>Technology</Typography>
              <Typography sx={classes.sectionText}>
                Interest in technology started early with modding video game saves using tools and
                a hex editor. That curiosity quickly turned into jailbreaking and rooting phones,
                which led to learning Unix and experimenting with different Linux distributions.
              </Typography>
              <Typography sx={classes.sectionText}>
                Programming started with C++ in high school, but it did not really click until
                later. While working in call centers, repetitive tasks started to stand out as
                problems worth solving, which led to learning JavaScript and building small tools
                and browser extensions.
              </Typography>
              <Typography sx={classes.sectionText}>
                From there, things expanded naturally. Web development became a way to build
                complete systems, not just interfaces, starting with PHP and later moving to
                Node.js to stay within a single language across the stack.
              </Typography>
              <Typography sx={{ ...classes.sectionText, marginBottom: 0 }}>
                That same curiosity extends beyond web development into Raspberry Pis, circuits,
                and building tools that interact with the physical world. Most of that is still
                done in Node.js, while I continue exploring Python and lower-level concepts over
                time.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={classes.sideCard}>
              <Typography sx={classes.sideTitle}>What I gravitate toward</Typography>
              <Box component="ul" sx={classes.sideList}>
                <li>Systems that feel cohesive end to end</li>
                <li>Automation that removes repetitive work</li>
                <li>Tools that cross software and hardware</li>
                <li>Learning by building real things</li>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={classes.favoritesSection}>
          <Typography sx={classes.favoritesTitle}>
            Favorite Books, Movies, and Games
          </Typography>
          <Typography sx={classes.favoritesLead}>
            A few things I keep coming back to. This section is more personal than professional,
            but it gives a better read on the kind of worlds, systems, and stories I tend to like.
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={classes.favoritesPanel}>
                <Typography sx={classes.favoritesPanelTitle}>Books</Typography>
                <FavoritesList list={books} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={classes.favoritesPanel}>
                <Typography sx={classes.favoritesPanelTitle}>Movies</Typography>
                <FavoritesList list={movies} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={classes.favoritesPanel}>
                <Typography sx={classes.favoritesPanelTitle}>Games</Typography>
                <FavoritesList list={games} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={classes.favoritesPanel}>
                <Typography sx={classes.favoritesPanelTitle}>TV Shows</Typography>
                <FavoritesList list={tvShows} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
