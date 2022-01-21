import React from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";
import { list } from "../states";

export default function About() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: "#162341"
      }}
    >
      <Container maxWidth="md">
        <div style={{ textAlign: 'center', padding: '5px'}}><Button variant="outlined" component={Link} to='/'>Back</Button></div>
        <Typography variant="h2" gutterBottom>About Me</Typography>
        <Typography variant="h5" gutterBottom>
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
