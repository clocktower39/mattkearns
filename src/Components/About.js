import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";
import { list } from "../states";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#162341",
      }}
    >
      <Container maxWidth="md">
        <div style={{ textAlign: "center", padding: "5px" }}>
          <Button variant="outlined" component={Link} to="/">
            Back
          </Button>
        </div>
        <Typography variant="h2" gutterBottom>
          About Me
        </Typography>
        <Typography variant="h3" gutterBottom>
          Personal
        </Typography>
        <Typography variant="body1">
          A little more about me, I have an identical twin brother and I am from a small town north
          of Chicago IL.  I was in cheerleading for 5 years and I went to Huntley High School.  After a couple years, I moved to Arizona and now live in Gilbert AZ.  In my free time I enjoy playing video games on my PC, web development, weight lifting, longboarding, watching hockey, and coaching cheerleading.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Technology
        </Typography>
        <Typography variant="body1">
          I've always had a passion for technology. My friend really got me started by showing me
          how to mod video game saves using modding tools and a hex editor, then to
          jailbreaking/rooting phones, which helped me get familiar with Unix and led me to try a
          couple Linux distos.
        </Typography>
        <Typography variant="body1">
          In high school I took a C++ class and loved it and learned the basic concepts of
          programming.
        </Typography>
        <Typography variant="body1">
          When I moved to Arizona and started to work in call center environments. I knew parts of
          my job could be automated and decided to learn web development so I could create Firefox
          extensions to do just that.{" "}
        </Typography>
        <Typography variant="body1">
          After a lot of time on FreeCodeCamp, YouTube, LinkedIn Learning and other online sources I
          was able to create the tools I needed. I counldn't stop at just the front-end, I felt I
          needed to understand both the front and back-end, so I started learning PHP due to my
          Apache hosting service but then started using Node.js and didn't look back.{" "}
        </Typography>
        <Typography variant="body1">
          Something that really helped my break my Imposter Syndrome was when I bought a Raspberry
          Pi. I could finally build something more than just displayed on a screen and that felt
          great.
        </Typography>
        <Typography variant="h3" gutterBottom>
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
  );
}
