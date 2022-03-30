import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";
import { books, movies, games } from "../states";

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
        <Typography variant="body1" gutterBottom >
          A little more about me, I have an identical twin brother and I am from a small town north
          of Chicago IL.  I was in cheerleading for 5 years and I went to Huntley High School.  After a couple years, I moved to Arizona and now live in Gilbert AZ.  In my free time I enjoy playing video games on my PC, web development, weight lifting, longboarding, watching hockey, and coaching cheerleading.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Technology
        </Typography>
        <Typography variant="body1" gutterBottom >
          I've always had a passion for technology. My friend really got me started by showing me
          how to mod video game saves using modding tools and a hex editor, then to
          jailbreaking/rooting phones, which helped me get familiar with Unix and led me to try a
          couple Linux distos.
        </Typography>
        <Typography variant="body1" gutterBottom >
          In high school I took a C++ class, learned the basic concepts of
          programming. After I learned a little Java but did not pursure either language further.
        </Typography>
        <Typography variant="body1" gutterBottom >
          When I moved to Arizona and started to work in call center environments. I knew parts of
          my job could be automated and decided to learn web development so I could create Firefox
          extensions to do just that.{" "}
        </Typography>
        <Typography variant="body1" gutterBottom >
          After a lot of time on FreeCodeCamp, YouTube, LinkedIn Learning and other online sources I
          became very comfortable with JavaScript and was able to create the tools I needed. I counldn't stop at just the front-end, I felt I
          needed to understand both the front and back-end, so I started learning PHP due to my
          Apache hosting service but then started using Node.js and found that was nice to use becuase I could still use JavaScript.{" "}
        </Typography>
        <Typography variant="body1" gutterBottom >
          I enjoy working with Raspberry Pis and learning how to set up circuits, write to GPIO pins, and create helpful tools other than just web pages and servers. I usually use Node.js and find helpful libraries from npm or github but recently have been trying to learn and use Python.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Favorite Books, Movies, & Video Games
        </Typography>
        <Grid container spacing={2}>
            <Grid container item xs={12} >
              <FavoritesList list={books} />
            </Grid>
            <Grid container item xs={12} >
              <FavoritesList list={movies} />
            </Grid>
            <Grid container item xs={12} >
              <FavoritesList list={games} />
            </Grid>
        </Grid>
      </Container>
    </div>
  );
}
