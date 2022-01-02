import React from "react";
import { Button, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { LinkedIn, GitHub, Instagram } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import ProjectCard from "./ProjectCard";
import Logos from "./Logos";
import headshot from "../img/avatar.jpg";
import HomepageBackground from "../img/Homepage_Background.jpg";
import { projects } from "../states";

export default function Home() {
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
    <div>
      <div
        style={{
          backgroundImage: `url(${HomepageBackground})`,
          backgroundPosition: "65%",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
          <Grid
            container
            direction="column"
            style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
          >
            <Grid container style={{ justifyContent: "center", alignItems: "center" }}>
              <Grid
                container
                item
                xs={12}
                sm={6}
                style={{ justifyContent: "center", padding: "15px 0px" }}
              >
                <div style={{ width: "80%", overflow: "none" }}>
                  <img
                    src={headshot}
                    alt="Avatar"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      border: "3px solid white",
                    }}
                  />
                </div>
              </Grid>

              <Grid container item xs={8} sm={6}>
                <Grid item xs={12}>
                  <Typography display="inline" variant="h3">
                    Hi, my name is
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography display="inline" variant="h1" sx={{textTransform: 'uppercase'}}>
                    Matt Kearns
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography display="inline" variant="h5">
                    I'm a self taught{" "}
                    <span style={{ color: "#79a825", textTransform: "uppercase" }}>
                      full stack developer.
                    </span>{" "}
                    passionate hacker and love to break everything down...even if I end up just
                    plain breaking it.
                  </Typography>
                </Grid>
                <Grid item container xs={12} sx={{ margin: "5px", padding: "5px" }}>
                  <Button variant="contained" sx={{ color: "white" }} component={Link} to="/about">
                    About Me
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div style={{ padding: "50px 0px", backgroundColor: "#162341" }}>
        <Grid container item xs={12} sx={{ paddingBottom: "50px" }}>
          <Grid
            item
            container
            xs={5}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "#4D386D",
              height: "75px",
              borderRadius: "0 50px 50px 0",
              paddingRight: "25px",
            }}
          >
            <Typography variant="h3" style={{ color: "#deeaef", textTransform: 'uppercase',  }}>
              Projects
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </Grid>
        </Container>
      </div>

      <div
        style={{
          padding: "50px 0",
          backgroundColor: "#FAEDD4",
        }}
      >
        <Grid container item xs={12} sx={{ paddingBottom: "50px" }}>
          <Grid
            item
            container
            xs={5}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "#79A825",
              height: "75px",
              borderRadius: "0 50px 50px 0",
              paddingRight: "25px",
            }}
          >
            <Typography variant="h3" style={{ color: "#deeaef", textTransform: 'uppercase',  }}>
              Tools
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Logos />
          </Grid>
        </Container>
      </div>

      <div style={{ backgroundColor: "#4D3E6D", padding: "25px 0px" }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ color: "white", padding: '25px 0px 50px 0px', }}>
            Contact Me
          </Typography>
          <Paper sx={{ backgroundColor: "#FAEDD4" }}>
            <Grid container spacing={1} sx={{ justifyContent: "center", padding: '50px 0px', }}>
              <Grid item xs={10}>
                <TextField fullWidth label="Full Name" required/>
              </Grid>
              <Grid item xs={10}>
                <TextField fullWidth label="Email" required/>
              </Grid>
              <Grid item xs={10}>
                <TextField fullWidth label="Summary" multiline draggable rows={3} required/>
              </Grid>
              <Grid container item xs={12} sx={{ justifyContent: "center" }}>
                <Button variant="contained">Send</Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>

      <div style={{ backgroundColor: "#061528", paddingTop: "25px" }}>
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <IconButton onClick={() => handleSocialLink("github")}>
                <GitHub style={{ fontSize: "35px", color: "white", backgroundColor: '#867CB8', border: '3px solid #867CB8', borderRadius: '50%' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleSocialLink("linkedIn")}>
                <LinkedIn style={{ fontSize: "35px", color: "white", backgroundColor: '#867CB8', border: '3px solid #867CB8', borderRadius: '50%' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleSocialLink("instagram")}>
                <Instagram style={{ fontSize: "35px", color: "white", backgroundColor: '#867CB8', border: '3px solid #867CB8', borderRadius: '50%' }} />
              </IconButton>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Typography variant="body1" style={{ fontSize: "10px", color: '#FFF' }}>
                Copyright © 2022 MattKearns.dev - All Rights Reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
