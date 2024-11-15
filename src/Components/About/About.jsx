import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import Footer from '../Footer';
import FavoritesList from "./FavoritesList";
import { books, movies, games } from "../../states";

const styles = () => ({
  AboutContainer: {
    minHeight: "100vh",
    backgroundColor: "#303030",
  },
  BackButtonContainer: { textAlign: "center", padding: "5px", },
})

export default function About() {
  const classes = styles();
  return (
    <div style={ classes.AboutContainer } >
      <Container maxWidth="md">
        <div style={ classes.BackButtonContainer }>
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
          A bit more about me: I am originally from a small town north of Chicago, Illinois, and have an identical twin brother. After attending Huntley High School, I moved to Gilbert, Arizona, where I currently reside. In my free time, I enjoy pursuing a variety of interests including building PCs, creating helpful and fun gadgets with Raspberry Pis and Arduinos, web development, weight lifting, longboarding, watching hockey and coaching cheerleading.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Technology
        </Typography>
        <Typography variant="body1" gutterBottom >
        My passion for technology began early on when a friend introduced me to modding video game saves using modding tools and a hex editor. This eventually led me to jailbreaking/rooting phones, which helped me become familiar with Unix and sparked my interest in trying out different Linux distros.
        </Typography>
        <Typography variant="body1" gutterBottom >
          In high school, I took a C++ class and learned the basic concepts of programming. Although I dabbled in Java, I did not pursue either language further at the time.
        </Typography>
        <Typography variant="body1" gutterBottom >
        When I moved to Arizona and started working in call center environments, I saw an opportunity to automate parts of my job and decided to learn web development. I started by creating Firefox extensions using JavaScript, and after spending countless hours on online resources like FreeCodeCamp, YouTube, and LinkedIn Learning, I became very comfortable with the language.{" "}
        </Typography>
        <Typography variant="body1" gutterBottom >As I continued to develop my skills, I realized that I wanted to understand both the front-end and back-end of web development. I began learning PHP because of my Apache hosting service but eventually switched to using Node.js, which allowed me to leverage my knowledge of JavaScript.{" "}
        </Typography>
        <Typography variant="body1" gutterBottom >
        In addition to web development, I enjoy working with Raspberry Pis and creating circuits, writing to GPIO pins, and building tools beyond just web pages and servers. I primarily use Node.js for these projects, but I am also actively learning and using Python and eventually will try to tackle C.
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
      <Footer />
    </div>
  );
}
