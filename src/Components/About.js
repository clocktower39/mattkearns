import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";
import { list } from "../states";

export default function About() {
  return (
    <div
      style={{
        padding: "100px 0",
        backgroundColor: "#162341"
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" >
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
