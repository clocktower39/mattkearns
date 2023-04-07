import React from "react";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import { LinkedIn, GitHub, Instagram } from "@mui/icons-material";

const styles = () => ({
  FooterContainer: { backgroundColor: "#000", paddingTop: "25px", },
  Icon: {
    fontSize: "35px",
    color: "white",
    backgroundColor: "#8a2be2",
    border: "3px solid #8a2be2",
    borderRadius: "50%",
  },
  FooterText: { fontSize: "10px", },
  JustifyContentCenter: { justifyContent: "center", },
});

export default function Footer() {
  const classes = styles();

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

  return (
    <div style={classes.FooterContainer}>
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ ...classes.JustifyContentCenter }}>
          <Grid item>
            <IconButton onClick={() => handleSocialLink("github")}>
              <GitHub sx={classes.Icon} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleSocialLink("linkedIn")}>
              <LinkedIn sx={classes.Icon} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleSocialLink("instagram")}>
              <Instagram sx={classes.Icon} />
            </IconButton>
          </Grid>
          <Grid container item xs={12} sx={{ ...classes.JustifyContentCenter }}>
            <Typography variant="body1" sx={classes.FooterText}>
              Copyright © 2022 MattKearns.dev - All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
